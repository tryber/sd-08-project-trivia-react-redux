import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getGameQuestions from '../services/getGameQuestions';
import {
  optionsAnswers,
  scoreCalculate,
  setLocalStorage,
  setRanking,
} from '../services/utils';
import '../styles/gamePage.css';
import { saveScore, saveCorrectAnswers } from '../redux/actions';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      time: 30,
      questions: [],
      nextButton: false,
      questionIndex: 0,
      answers: [],
      color: false,
      score: 0,
      assertions: 0,
      loading: true,
    };
    this.saveQuestions = this.saveQuestions.bind(this);
    this.chooseOption = this.chooseOption.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  async componentDidMount() {
    const { questionIndex } = this.state;
    const { results } = await getGameQuestions();
    await this.saveQuestions(results, questionIndex);
    this.startTimer();
  }

  componentWillUnmount() {
    const { name, email } = this.props;
    const { score } = this.state;
    setRanking(name, score, email);
  }

  startTimer() {
    const ONE_SECOND = 1000;
    this.interval = setInterval(() => {
      const { time } = this.state;
      if (time > 0) {
        this.setState({ time: time - 1 });
      } else {
        clearInterval(this.interval);
      }
    }, ONE_SECOND);
  }

  async chooseOption({ target }) {
    const { questions, time } = this.state;
    clearInterval(this.interval);
    const { name, email, savePlayerCorrects, saveScorePlayer } = this.props;
    this.setState({ color: true, nextButton: true });
    if (target.id === 'correct-answer') {
      await this.setState((stateCurrent) => ({
        ...stateCurrent,
        score:
          stateCurrent.score + scoreCalculate(time, questions[0].difficulty),
        assertions: stateCurrent.assertions + 1,
      }));
      const { score, assertions } = this.state;
      await setLocalStorage(name, score, email, assertions);
      await saveScorePlayer(score);
      await savePlayerCorrects(assertions);
    }
  }

  async saveQuestions(results, questionIndex) {
    await this.setState({
      answers: optionsAnswers(
        results[questionIndex].correct_answer,
        results[questionIndex].incorrect_answers,
      ),
      questions: results,
      loading: false,
    });
  }

  async nextQuestion() {
    const { questions, questionIndex } = this.state;
    const totalQuestions = 4;
    if (questionIndex >= totalQuestions) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.startTimer();
    this.setState((stateCurrent) => ({
      ...stateCurrent,
      questionIndex: stateCurrent.questionIndex + 1,
      color: false,
      time: 30,
    }));
    this.saveQuestions(questions, questionIndex);
  }

  render() {
    const {
      questions,
      answers,
      color,
      loading,
      questionIndex,
      nextButton,
      time,
    } = this.state;
    return (
      <div>
        <Header />
        {!loading && (
          <div>
            <h2 data-testid="question-category">
              {questions[questionIndex].category}
            </h2>
            <div data-testid="question-text">
              {questions[questionIndex].question}
            </div>
            {answers.map((answer, index) => (answer.isCorrect ? (
              <button
                className={ color && 'answer-correct' }
                type="button"
                id="correct-answer"
                key={ index }
                data-testid="correct-answer"
                onClick={ this.chooseOption }
                disabled={ time === 0 && true }
              >
                {answer.correctAnswer}
              </button>
            ) : (
              <button
                className={ color && 'answer-incorrect' }
                type="button"
                id="wrong-answer"
                key={ index }
                data-testid={ `wrong-answer-${answer.index}` }
                onClick={ this.chooseOption }
                disabled={ time === 0 && true }
              >
                {answer.answer}
              </button>
            )))}
          </div>
        )}
        <div>{time}</div>
        {nextButton && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Próxima
          </button>
        )}
      </div>
    );
  }
}
GamePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  saveScorePlayer: PropTypes.func.isRequired,
  savePlayerCorrects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.player.player.name,
  email: state.player.player.gravatarEmail,
});
const mapDispatchToProps = (dispatch) => ({
  saveScorePlayer: (score) => dispatch(saveScore(score)),
  savePlayerCorrects: (correctAnswers) => dispatch(saveCorrectAnswers(correctAnswers)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GamePage);
