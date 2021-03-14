import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import NextButton from '../components/NextButton';
import {
  actionLoadedQuestions,
  actionNewScore,
  actionNewAssertion,
} from '../actions/triviaActions';

import './Questions.css';

const THIRTY_SECONDS = 30000;
const FIVE_SECONDS = 5000;
const HALF_SECOND = 500;
const TRANSFORM_MILIS_TO_SECONDS = 1000;

class Questions extends Component {
  constructor() {
    super();

    this.state = {
      token: localStorage.getItem('token'),
      currentQuestion: 0,
      goToFeedback: false,
      startTimer: 0,
      isTimeout: false,
      correctAnswer: '',
      incorrectAnswer: '',
      secondsTimer: 0,
      btnNext: false,
      count: 0,
    };

    this.clickAnswer = this.clickAnswer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.showTime = this.showTime.bind(this);
    // this.sumScore = this.sumScore.bind(this);
  }

  componentDidMount() {
    const { loadedQuestions } = this.props;
    const { token } = this.state;
    loadedQuestions(token);
    this.stopAnswering = setTimeout(() => {
      this.setState({ isTimeout: true, btnNext: true });
      console.log('Trava as questões');
      this.showAnswers = window.setTimeout(() => {
        console.log('Mostra as respostas');
      }, FIVE_SECONDS);
    }, THIRTY_SECONDS);
    this.startTimer();
    this.cronometer = window.setInterval(() => {
      this.showTime();
    },
    HALF_SECOND);
  }

  componentWillUnmount() {
    clearInterval(this.showAnswers);
    clearInterval(this.stopAnswering);
    clearInterval(this.cronometer);
  }

  handleClick() {
    const { currentQuestion } = this.state;
    const { resultQuestions = [] } = this.props;
    const amountAnswers = resultQuestions.length - 1;
    this.startTimer();
    this.setState({ isTimeout: false });
    if (currentQuestion < amountAnswers) {
      this.setState({ currentQuestion: currentQuestion + 1 });
    } else {
      this.setState({ goToFeedback: true });
    }
    this.setState({ correctAnswer: '', incorrectAnswer: '' });
    this.startTimer();
    console.log('Cronometro resetado');
    // clearInterval(this.showAnswers);
    clearInterval(this.showAnswers);
    clearInterval(this.stopAnswering);
    this.stopAnswering = setTimeout(() => {
      this.setState({ isTimeout: true, btnNext: true });
      console.log('Trava as questões');
      this.showAnswers = window.setTimeout(() => {
        console.log('Mostra as respostas');
      }, FIVE_SECONDS);
    }, THIRTY_SECONDS);
  }

  decode(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  clickAnswer({ target }) {
    const { count } = this.state;
    const answer = target.value;
    this.setState({
      correctAnswer: 'correctAnswer',
      incorrectAnswer: 'incorrectAnswer',
      btnNext: true,
      count: count + 1,
    });
    if (answer === 'correct_answer') this.sumScore();
  }

  sumScore() {
    const TOTAL_SECONDS = 30;
    const { secondsTimer } = this.state;
    const { newAssertion, newScore, assertions, score } = this.props;
    const one = 1;
    const ten = 10;
    const point = score + (one * (TOTAL_SECONDS - secondsTimer) + ten);
    console.log(assertions);
    newAssertion(assertions + one);
    newScore(point);
  }

  startTimer() {
    const now = Date.now();
    this.setState({ startTimer: now });
  }

  showTime() {
    const { startTimer } = this.state;
    const now = Date.now();
    const secondsTimer = ((now - startTimer) / TRANSFORM_MILIS_TO_SECONDS).toFixed(0);
    // console.log(`${secondsTimer} = ${now} - ${startTimer}`);
    this.setState({ secondsTimer });
    return now - startTimer;
  }

  render() {
    const { resultQuestions = [] } = this.props;
    const five = 5;
    const {
      currentQuestion,
      goToFeedback,
      isTimeout,
      correctAnswer,
      incorrectAnswer,
      btnNext,
      count,
      secondsTimer,
    } = this.state;
    if (!resultQuestions.length) {
      return <div>carregando...</div>;
    }
    if (goToFeedback) { return <Redirect to="/feedback" />; }
    return (
      <div>
        <Header />
        <div>
          <h1
            data-testid="question-category"
          >
            {this.decode(resultQuestions[currentQuestion].category)}
          </h1>
          <h1
            data-testid="question-text"
          >
            {this.decode(resultQuestions[currentQuestion].question)}
          </h1>
          <h2>
            {secondsTimer}
          </h2>
          <button
            type="button"
            data-testid="correct-answer"
            className={ correctAnswer }
            disabled={ isTimeout }
            value="correct_answer"
            onClick={ this.clickAnswer }
          >
            {this.decode(resultQuestions[currentQuestion].correct_answer)}
            {count > five && (<Redirect to="/feedback" />) }
            {/* não entendi de hugo */}
          </button>
          {resultQuestions[currentQuestion].incorrect_answers.map((e, i) => {
            const datatestid = `wrong-answer-${i}`;
            return (
              <button
                key={ i }
                type="button"
                data-testid={ datatestid }
                className={ incorrectAnswer }
                disabled={ isTimeout }
                value={ e[i] }
                onClick={ this.clickAnswer }
              >
                {e}
              </button>
            );
          })}
        </div>
        {btnNext && (<NextButton onClick={ this.handleClick } />)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultQuestions: state.player.questions,
  assertions: state.player.assertions,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  loadedQuestions: (token) => dispatch(actionLoadedQuestions(token)),
  newAssertion: (assertions) => dispatch(actionNewAssertion(assertions)),
  newScore: (score) => dispatch(actionNewScore(score)),
});

Questions.propTypes = {
  resultQuestions: PropTypes.arrayOf.isRequired,
  loadedQuestions: PropTypes.func.isRequired,
  newAssertion: PropTypes.func.isRequired,
  newScore: PropTypes.func.isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
