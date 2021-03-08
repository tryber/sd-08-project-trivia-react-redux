import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Coutdown from '../coutdown/Coutdown';
import { fetchAPITrivia } from '../../../store/actions/index';
import NextQuestionButton from './buttons/NextQuestionButton';
import RedirectButton from './buttons/RedirectButton';
import { currentTimer, restartCoutdown, stopTime } from '../../../store/actions/coutdown';
import { saveScore, updateScore } from '../../../services/localStorage';

class GameQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questIndex: 0,
      selectedOption: false,
      difficulty: '',
    };

    this.setdifficulty = this.setdifficulty.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.selectOption = this.selectOption.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { fetchAPI } = this.props;
    await fetchAPI(token);
    this.setdifficulty();
  }

  setdifficulty() {
    const { questIndex } = this.state;
    const { questions } = this.props;
    this.setState({ difficulty: questions[questIndex].difficulty });
  }

  selectStyle(option, correctOption) {
    const { selectedOption } = this.state;
    if (selectedOption) {
      if (option === correctOption) {
        return { border: '3px solid rgb(6, 240, 15)' };
      }
      if (option !== correctOption) {
        return { border: '3px solid rgb(255, 0, 0)' };
      }
    }
    return { border: 'null' };
  }

  selectOption(option, correctOption) {
    const { difficulty } = this.state;
    const { setReduxTimer, setStop, time } = this.props;
    const TEN = 10;
    const THREE_WEIGHT = 3;
    const TWO_WEIGHT = 2;
    const ONE_WEIGHT = 1;
    let questionWeight = 0;
    setReduxTimer(time);
    this.setState({ selectedOption: true });
    if (option === correctOption) {
      if (difficulty === 'hard') {
        questionWeight = THREE_WEIGHT;
      }
      if (difficulty === 'medium') {
        questionWeight = TWO_WEIGHT;
      }
      if (difficulty === 'easy') {
        questionWeight = ONE_WEIGHT;
      }
      const state = JSON.parse(localStorage.getItem('state'));
      // const ranking = JSON.parse(localStorage.getItem('ranking'));
      const addScore = (state.player.score) + TEN + (time * questionWeight);
      const addAssertions = (state.player.assertions) + 1;
      const player = {
        player: {
          ...state.player,
          score: addScore,
          assertions: addAssertions,
        },
      };
      // const updateFeedbackRanking = { ...ranking, score: addScore };
      updateScore(state.player.email, addScore);
      // localStorage.setItem('ranking', JSON.stringify(updateFeedbackRanking));
      localStorage.setItem('state', JSON.stringify(player));
    }
    setStop(true);
  }

  randomizeArray(array) {
    const HALF = 0.5;
    array.sort(() => HALF - Math.random());
  }

  nextQuestion() {
    const { questIndex } = this.state;
    const { restartTimer } = this.props;
    this.setState({
      selectedOption: false,
    }, () => this.setState({
      questIndex: questIndex + 1,
    }));
    restartTimer();
  }

  decodeURL(string) {
    return decodeURIComponent(string.replace(/\+/g, ' '));
  }

  renderButton(option, dataTestid, key, correctOption) {
    const { selectedOption } = this.state;
    const { time } = this.props;
    return (
      <button
        key={ key }
        type="button"
        data-testid={ dataTestid }
        onClick={ () => this.selectOption(option, correctOption) }
        style={ this.selectStyle(option, correctOption) }
        disabled={ time === 0 || selectedOption }
      >
        { option }
      </button>
    );
  }

  render() {
    const { questIndex, selectedOption } = this.state;
    const { questions } = this.props;
    const LAST_QUESTION = 4;
    if (!questions.length) return <div> Carregando... </div>;
    const { category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswers } = questions[questIndex];
    const allAnswers = [correctAnswer, ...wrongAnswers]; // Cria um array com todas as possiveis respostas
    const array = [];
    allAnswers.map(
      (option, index) => (option === correctAnswer
        ? array.push(this.renderButton(
          this.decodeURL(option), 'correct-answer', index, this.decodeURL(correctAnswer),
        ))
        : array.push(this.renderButton(
          this.decodeURL(option), `wrong-answer-${index - 1}`,
          index, this.decodeURL(correctAnswer),
        ))),
    );
    return (
      <section>
        <Coutdown />
        <span data-testid="question-category">
          {this.decodeURL(category)}
        </span>
        <p data-testid="question-text">
          {this.decodeURL(question)}
        </p>
        { !selectedOption && this.randomizeArray(array) /* randomiza o array */ }
        { array.map((reactElement, index) => (
          <div key={ index }>
            { reactElement }
          </div>
        ))}
        {(selectedOption && questIndex < LAST_QUESTION)
        && <NextQuestionButton callback={ this.nextQuestion } />}

        {(selectedOption && questIndex === LAST_QUESTION)
        && <RedirectButton
          text="Finalizar"
          path="/feedback"
          testId="btn-next"
          callback={ saveScore }
        />}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.data,
  isFetching: state.question.isFetching,
  time: state.coutdown.time,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (token) => dispatch(fetchAPITrivia(token)),
  setReduxTimer: (time) => dispatch(currentTimer(time)),
  setStop: (bool) => dispatch(stopTime(bool)),
  restartTimer: () => dispatch(restartCoutdown()),
});

GameQuestion.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  setReduxTimer: PropTypes.func.isRequired,
  setStop: PropTypes.func.isRequired,
  restartTimer: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  time: PropTypes.number.isRequired,
  // isFetching: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
