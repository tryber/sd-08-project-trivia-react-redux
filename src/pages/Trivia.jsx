import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../components/Header';
import { saveShuffledArray, storeScore, willShuffle } from '../_redux/action';
import redirect from '../services/redirect';

import '../styles/Trivia.css';
import answersArray from '../services/answersArray';
import decodeHtml from '../services/decodeHTML';
import rightArrow from '../images/right-arrow-icon.png';

const EASY = 1;
const MEDIUM = 2;
const HARD = 3;
const MIN_POINTS = 10;
const TIMER = 30;
const ONE_SECOND = 1000;

class Trivia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdownTimer: null,
      disabled: false,
      index: 0,
      questionTime: TIMER,
      toggle: false,
    };

    this.decresingTime = this.decresingTime.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.shuffleArray = this.shuffleArray.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    const { countdownTimer } = this.state;
    clearInterval(countdownTimer);
  }

  decresingTime() {
    const { questionTime, countdownTimer } = this.state;

    if (questionTime === 1) {
      clearInterval(countdownTimer);
      this.setState({
        disabled: true,
        questionTime: 0,
        toggle: true,
      });
    } else {
      this.setState((prevState) => ({
        questionTime: prevState.questionTime - 1,
      }));
    }
  }

  startTimer() {
    const countdownTimer = setInterval(this.decresingTime, ONE_SECOND);
    this.setState({
      countdownTimer,
    });
  }

  handleClick() {
    const { updateIfShuffle } = this.props;
    this.startTimer();
    this.setState((prevState) => ({
      disabled: false,
      index: prevState.index + 1,
      questionTime: TIMER,
      toggle: false,
    }));
    updateIfShuffle(true);
  }

  countPoints(difficulty, timer) {
    const { updateScore } = this.props;
    const { player } = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = player;
    let multiplier = 0;
    switch (difficulty) {
    case 'easy':
      multiplier = EASY;
      break;
    case 'medium':
      multiplier = MEDIUM;
      break;
    case 'hard':
      multiplier = HARD;
      break;
    default:
      return multiplier;
    }
    const newScore = score + (MIN_POINTS + multiplier * timer);
    const state = {
      player: {
        ...player,
        assertions: assertions + 1,
        score: newScore,
      },
    };
    updateScore(newScore);
    localStorage.setItem('state', JSON.stringify(state));
  }

  selectAnswer(difficulty, testId) {
    const { countdownTimer, questionTime } = this.state;
    clearInterval(countdownTimer);
    if (testId === 'correct-answer') {
      this.countPoints(difficulty, questionTime);
    }
    this.setState({
      toggle: true,
      disabled: true,
    });
  }

  // Função adquirida no link abaixo
  // https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
  shuffleArray(array) {
    const { updateShuffledArray, updateIfShuffle } = this.props;
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    updateShuffledArray(newArray);
    updateIfShuffle(false);
  }

  render() {
    const { questions, history, shuffle, shuffledArray } = this.props;
    if (!questions.length) return <p>Loading</p>;
    const { index, toggle, disabled, questionTime } = this.state;
    const questionArray = questions[index];
    const { category, question, difficulty } = questionArray;
    const questionsUnited = answersArray(questionArray) || [];
    let id = 0;

    if (shuffle) {
      this.shuffleArray(questionsUnited);
    }

    return (
      <main className="container-trivia">
        <div className="box-trivia">
          <Header />
          <div className="flex-column-center">
            <div
              data-testid="question-category"
              className="padding-10 margin-10 special-font font-18"
            >
              {`Categoria: ${decodeHtml(category)}`}
            </div>
            <div
              data-testid="question-text"
              className="padding-10 margin-10 roboto-font question-box"
            >
              {decodeHtml(question)}
            </div>
            <div
              className="flex-row-center padding-10 margin-10 box-shadow border-radius"
            >
              <p>Tempo</p>
              <div className="timer">{questionTime}</div>
              <p>{questionTime > 1 ? 'segundos' : 'segundo'}</p>
            </div>
            <div className="flex-column-center">
              {shuffledArray.map((answer, num) => {
                const testId = answer.assert ? 'correct-answer' : `wrong-answer-${id}`;
                id = answer.assert ? id : (id += 1);
                return (
                  <button
                    className={ toggle ? `button ${testId}` : 'answer-button' }
                    type="button"
                    data-testid={ testId }
                    key={ num }
                    disabled={ disabled }
                    onClick={ () => this.selectAnswer(difficulty, testId) }
                  >
                    {decodeHtml(answer.answer)}
                  </button>
                );
              })}
            </div>
          </div>
          {index === questions.length - 1 ? (
            <div>
              <button
                type="button"
                data-testid="btn-next"
                className={ !toggle ? 'button btn-next' : 'button' }
                onClick={ () => redirect(history, '/feedback') }
              >
                Finalizar
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-testid="btn-next"
              className={ !toggle ? 'button btn-next' : 'button' }
              onClick={ this.handleClick }
            >
              Próxima
              <img
                className="right-arrow"
                src={ rightArrow }
                alt="icone seta proxima pergunta"
              />
            </button>
          )}
        </div>
      </main>
    );
  }
}

const mapStateToProp = (state) => ({
  email: state.login.email,
  questions: state.trivia.questions,
  score: state.trivia.score,
  shuffle: state.trivia.shuffle,
  shuffledArray: state.trivia.shuffledArray,
  userName: state.login.name,
});

const mapDispatchToProps = (dispatch) => ({
  updateIfShuffle: (boolean) => dispatch(willShuffle(boolean)),
  updateScore: (score) => dispatch(storeScore(score)),
  updateShuffledArray: (array) => dispatch(saveShuffledArray(array)),
});

export default connect(mapStateToProp, mapDispatchToProps)(Trivia);

Trivia.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  shuffle: PropTypes.bool.isRequired,
  shuffledArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateScore: PropTypes.func.isRequired,
  updateShuffledArray: PropTypes.func.isRequired,
  updateIfShuffle: PropTypes.func.isRequired,
};
