import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';

import {
  getScore as getScoreAction,
  handleUpdateCorrectAnswers as handleUpdateCorrectAnswersAction,
} from '../actions';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      correctColor: '',
      incorrectColor: '',
      buttonNext: false,
      questionIndex: 0,
      time: 30,
      disabled: false,
      score: 0,
    };

    this.changeColors = this.changeColors.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    // const { fetchQuestions } = this.props;
    // fetchQuestions();
    const token = localStorage.getItem('token');
    console.log(token);
    this.timeFunction();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  timeFunction() {
    const oneSecond = 1000;
    this.intervalId = setInterval(this.timer, oneSecond);
  }

  timer() {
    const { time } = this.state;
    const updateTime = time - 1;
    this.setState({
      time: updateTime,
    });
    if (updateTime === 0) {
      this.changeColors();
      // clearInterval(this.intervalId);
    }
  }

  nextButton() {
    const { buttonNext } = this.state;
    if (buttonNext) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => this.nextPage }
        >
          Próxima pergunta
        </button>
      );
    }
  }

  nextPage() {
    const { questionIndex } = this.state;
    const { history } = this.props;
    const number = 4;

    this.timeFunction();
    this.setState({
      correctColor: '',
      incorrectColor: '',
      buttonNext: false,
      disabled: false,
      questionIndex: questionIndex + 1,
      time: 30,
    });

    if (questionIndex === number) {
      return history.push('/feedback');
    }
  }

  changeColors() {
    this.setState({
      correctColor: 'rgb(6, 240, 15)',
      incorrectColor: 'rgb(255, 0, 0)',
      buttonNext: true,
      disabled: true,
    });
    this.nextButton();
    clearInterval(this.intervalId);
  }

  handleCalculateScore() {
    const { questions, score, getScore } = this.props;
    const { questionIndex, time } = this.state;

    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;
    const BASE = 10;

    const level = questions[questionIndex].difficulty;

    let difficulty = 0;
    if (level === 'easy') difficulty = EASY;
    if (level === 'medium') difficulty = MEDIUM;
    if (level === 'hard') difficulty = HARD;

    const finalScore = score + (BASE + time * difficulty);

    getScore(finalScore);
  }

  render() {
    const { questions, loading, handleUpdateCorrectAnswers } = this.props;
    const {
      correctColor,
      incorrectColor,
      questionIndex,
      buttonNext,
      disabled,
      time,
      score,
    } = this.state;

    if (loading) return <p>loading</p>;

    return (
      <>
        <Header score={ score } />
        <form>
          <p>{time}</p>
          <p data-testid="question-category">
            Categoria:
            {questions[questionIndex].category}
          </p>
          <p data-testid="question-text">
            Pergunta:
            {questions[questionIndex].question}
          </p>

          {
            questions[questionIndex].incorrect_answers.map((key, index = 0) => (
              <button
                type="button"
                key={ key }
                disabled={ disabled }
                data-testid={ `wrong-answer-${index}` }
                style={ { border: `3px solid ${incorrectColor}` } }
                onClick={ this.changeColors }
              >
                {key}
              </button>
            ))
          }

          <button
            type="button"
            disabled={ disabled }
            data-testid="correct-answer"
            className="correct"
            style={ { border: `3px solid ${correctColor}` } }
            onClick={ () => {
              this.changeColors();
              this.handleCalculateScore();
              handleUpdateCorrectAnswers();
            } }
          >
            {questions[questionIndex].correct_answer}
          </button>
        </form>
        <div>
          { buttonNext && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ () => {
                this.nextPage();
              } }
            >
              Próxima pergunta
            </button>
          ) }
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ questions: { questions, loading }, score: { score } }) => ({
  questions,
  loading,
  score,
});

const mapDispatchToProps = (dispatch) => ({
  getScore: (score) => dispatch(
    getScoreAction(score),
  ),
  handleUpdateCorrectAnswers: () => dispatch(
    handleUpdateCorrectAnswersAction(),
  ),
});

Game.propTypes = {
  loading: PropTypes.bool.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  score: PropTypes.number.isRequired,
  getScore: PropTypes.func.isRequired,
  handleUpdateCorrectAnswers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
