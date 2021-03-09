import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
// import md5 from 'crypto-js/md5';
import TriviaHeader from './TriviaHeader';
import { fetchTriviaAPI as fetchTriviaAPIAction } from '../Redux/actions';
import './Trivia.css';
import { updateSpecific, getObj } from '../helpers';

const NUMBER_FIVE = 5;
const ONE_SECOND = 1000;
const TEN_POINTS = 10;
const DIFFICULTY3 = 3;

const INITIAL_STATE = {
  btnTrue: '',
  btnFalse: '',
  disabled: false,
  nextQuestion: false,
};

class Trivia extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      question: [],
      btnTrue: '',
      btnFalse: '',
      disabled: false,
      number: 0,
      nextQuestion: false,
      correctAnswers: 0,
      questionsToAnswer: NUMBER_FIVE,
      remainingSeconds: 30,
      score: 0,
    };
    this.renderQuestions = this.renderQuestions.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
    this.verifyRedirect = this.verifyRedirect.bind(this);
    this.renderButtonNext = this.renderButtonNext.bind(this);
  }

  async componentDidMount() {
    const { fetchTriviaAPI } = this.props;
    const token = localStorage.getItem('token');
    await fetchTriviaAPI(token);
    await this.loadingData();
    this.timerQuestion();
  }

  timerQuestion() {
    this.timer = setInterval(() => {
      const { remainingSeconds } = this.state;
      if (remainingSeconds > 0) {
        this.setState((state) => ({
          remainingSeconds: state.remainingSeconds - 1,
        }));
      }
      if (remainingSeconds === 0) {
        clearInterval(this.timer);
        this.setState({
          btnTrue: 'button-true',
          btnFalse: 'button-false',
          disabled: true,
          nextQuestion: true,
        });
      }
    }, ONE_SECOND);
  }

  handleClick({ target }) {
    // const { correctAnswers } = this.state;
    const rankingArr = getObj('ranking');
    const index = rankingArr.length - 1;
    this.setState({
      btnTrue: 'button-true',
      btnFalse: 'button-false',
      disabled: true,
      nextQuestion: true,
    });
    clearInterval(this.timer);
    this.handleScore(target);
    if (target.id === 'correct-answer') {
      this.setState((prevState) => ({
        ...prevState, correctAnswers: prevState.correctAnswers + 1,
      }),
      () => {
        const { correctAnswers, score } = this.state;
        updateSpecific('state', 'player', 'score', score);
        updateSpecific('state', 'player', 'assertions', correctAnswers);
        updateSpecific('ranking', index, 'score', score);
      });
    }
    this.setState((prevState) => ({
      ...prevState, questionsToAnswer: prevState.questionsToAnswer - 1,
    }));
    // updateSpecific('state', 'player', 'assertions', correctAnswers);
    // updateSpecific('ranking', index, 'score', score);
  }

  handleNextQuestion() {
    const { number } = this.state;
    this.setState({
      ...INITIAL_STATE,
      number: number + 1,
      remainingSeconds: 30,
    });
    this.timerQuestion();
  }

  async loadingData() {
    const { data } = this.props;
    if (data !== undefined) {
      this.setState({
        loading: false,
        question: data,
      });
    }
  }

  verifyRedirect() {
    const { questionsToAnswer, number, correctAnswers } = this.state;
    updateSpecific('state', 'player', 'assertions', correctAnswers);
    // const stateInfo = getObj('state');
    // const rankingArr = getObj('ranking');
    // console.log(rankingArr[1].score);
    if (questionsToAnswer === 0 && number === NUMBER_FIVE) {
      // updateSpecific('state', 'player', 'assertions', score);
      // rankingArr.push(
      //   { name: stateInfo.player.name,
      //     score: stateInfo.player.score,
      //     picture: stateInfo.player.gravatarEmail },
      //   updateLocalStorage('ranking', [...rankingArr]),);

      return <Redirect to="/feedBackPage" />;
    }
    // console.log(rankingArr, stateInfo.player.name);
  }

  handleScore(target) {
    const { remainingSeconds, question, number } = this.state;
    if (target.textContent === question[number].correct_answer) {
      const difficulty = () => {
        switch (question[number].difficulty) {
        case 'easy':
          return 1;
        case 'medium':
          return 2;
        case 'hard':
          return DIFFICULTY3;
        default:
        }
      };
      const addScore = TEN_POINTS + (remainingSeconds * difficulty());
      this.setState((prevState) => ({
        ...prevState, score: prevState.score + addScore,
      }));
    }
  }

  renderButtonNext() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ this.handleNextQuestion }
      >
        Próxima
      </button>
    );
  }

  renderQuestions() {
    const {
      question,
      btnTrue,
      btnFalse,
      disabled,
      number,
      nextQuestion,
      remainingSeconds,
    } = this.state;
    if (number < NUMBER_FIVE) {
      return (
        <>
          <h3
            data-testid="question-category"
          >
            {question[number].category}
          </h3>
          <span
            data-testid="question-text"
          >
            {question[number].question}
          </span>
          <div>
            <button
              type="button"
              className={ btnTrue }
              data-testid="correct-answer"
              id="correct-answer"
              onClick={ this.handleClick }
              disabled={ disabled }
            >
              {question[number].correct_answer}
            </button>
            {question[number].incorrect_answers.map((answer, index) => (
              <button
                key={ index }
                type="button"
                data-testid={ `wrong-answer-${index}` }
                onClick={ this.handleClick }
                className={ btnFalse }
                disabled={ disabled }
              >
                {answer}
              </button>
            ))}
            {nextQuestion && this.renderButtonNext() }
          </div>
          <p>{ remainingSeconds }</p>
        </>
      );
    }
    return <div />;
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        <TriviaHeader />
        {loading ? <p>Loading...</p> : this.renderQuestions()}
        {this.verifyRedirect()}
      </div>
    );
  }
}

Trivia.propTypes = {
  fetchTriviaAPI: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  data: state.fetchAPI.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaAPI: (token) => dispatch(fetchTriviaAPIAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);
