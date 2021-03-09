import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import {
  fetchQuestions as fetchQuestionsThunk,
  scoreGlobal as scoreGlobalAction,
  scoreGlobal2 as scoreGlobal2Action,
  buttonChangeQuestion as buttonChangeQuestionAction,
  lastQuestion as lastQuestionAction,
  willPlay as willPlayAction,
} from '../../actions';
import '../../App.css';

class GameQuestions extends Component {
  constructor() {
    super();
    this.state = {
      timerCounter: 0,
      greenBorder: '',
      redBorder: '',
    };

    this.renderQuestionInfo = this.renderQuestionInfo.bind(this);
    this.createTimer = this.createTimer.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleNextQuestionClick = this.handleNextQuestionClick.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions, token } = this.props;
    fetchQuestions(token);
    this.createTimer();
    this.setLocalStorage();
  }

  setLocalStorage(score = 0) {
    const { name, email } = this.props;
    const state = {
      player: {
        name,
        assertions: '',
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  tick() {
    const { timerCounter } = this.state;
    const { scoreGlobal2, score } = this.props;
    if (timerCounter === 0) {
      this.setState({
        greenBorder: 'greenBorder',
        redBorder: 'redBorder',
      });
      scoreGlobal2(score);
      clearInterval(this.timer);
      return;
    }
    this.setState((state) => ({
      timerCounter: state.timerCounter - 1,
    }));
  }

  createTimer() {
    const ONE_SECOND = 1000;
    const TRINTA = 30;
    this.setState({
      timerCounter: TRINTA,
    });
    this.timer = setInterval(this.tick, ONE_SECOND);
  }

  handleNextQuestionClick(data) {
    const { rightAnswers, name, score, url } = this.props;
    clearInterval(this.timer);
    this.setState({
      greenBorder: '',
      redBorder: '',
    });
    const { buttonChangeQuestion, lastQuestion, questions } = this.props;
    if (data > questions.length - 2) {
      const state = JSON.parse(localStorage.getItem('state'));
      state.player.assertions = rightAnswers;
      localStorage.setItem('state', JSON.stringify(state));
      let ranking = JSON.parse(localStorage.getItem('ranking'));
      const objPlayer = { name, score, picture: url };
      if (ranking === null) ranking = [];
      ranking.push(objPlayer);
      localStorage.setItem('ranking', JSON.stringify(ranking));
      lastQuestion();
    } else {
      buttonChangeQuestion();
      this.createTimer();
    }
  }

  handleClick(key = 0) {
    const { timerCounter } = this.state;
    const { scoreGlobal, score, scoreGlobal2 } = this.props;
    const difficulty = { hard: 3, medium: 2, easy: 1 };
    const POINTS = 10;
    let scoreTotal = 0;
    if (key !== 0) {
      scoreTotal = score + POINTS + (timerCounter * difficulty[key]);
    }
    if (scoreTotal > 0) {
      scoreGlobal(scoreTotal);
    } else {
      scoreTotal = score;
      scoreGlobal2(scoreTotal);
    }
    clearInterval(this.timer);
    this.setLocalStorage(scoreTotal);
    this.setState({
      greenBorder: 'greenBorder',
      redBorder: 'redBorder',
    });
  }

  renderQuestionInfo() {
    const { shufledAnswers, questionNumber, questions, isButtonVisible } = this.props;
    const { category, question, difficulty,
      correct_answer: correctAnswer } = questions[questionNumber];
    const { greenBorder, redBorder } = this.state;
    return (
      <section>
        <h1 data-testid="question-category">
          {category}
        </h1>
        <h2 data-testid="question-text">
          {question}
        </h2>
        <div>
          { shufledAnswers[questionNumber] // https://developer.mozilla.org/pt-BR/docs/Glossary/Falsy e https://developer.mozilla.org/pt-BR/docs/Glossary/Truthy
            && shufledAnswers[questionNumber].map((answer) => {
              if (answer === correctAnswer) {
                return (
                  <button
                    key={ answer }
                    data-testid="correct-answer"
                    type="button"
                    className={ greenBorder }
                    disabled={ !isButtonVisible }
                    onClick={ () => this.handleClick(difficulty) }
                  >
                    {answer}
                  </button>
                );
              }
              return (
                <button
                  key={ answer }
                  data-testid={ `wrong-answer-${questionNumber}` }
                  className={ redBorder }
                  type="button"
                  disabled={ !isButtonVisible }
                  onClick={ () => this.handleClick() }
                >
                  {answer}
                </button>
              );
            })}
        </div>
        <div>
          { !isButtonVisible
            && (
              <button
                type="button"
                disabled={ isButtonVisible }
                data-testid="btn-next"
                onClick={ () => this.handleNextQuestionClick(questionNumber) }
              >
                NEXT
              </button>)}
        </div>
      </section>
    );
  }

  render() {
    const { timerCounter } = this.state;
    const { shouldRedirect, isPlaying } = this.props;
    if (shouldRedirect) return <Redirect to="/feedback" />;
    if (!isPlaying) return <Redirect to="/" />;

    return (
      <main>
        <div>
          <section>
            <h2>{timerCounter}</h2>
          </section>
          {this.renderQuestionInfo()}
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.reducerToken.id,
  name: state.reducerUser.name,
  score: state.reducerUser.score,
  email: state.reducerUser.email,
  rightAnswers: state.reducerUser.rightAnswers,
  shouldRedirect: state.reducerUser.shouldRedirect,
  isButtonVisible: state.reducerUser.isButtonVisible,
  questions: state.reducerQuestions.questions,
  shufledAnswers: state.reducerQuestions.shufledAnswers,
  questionNumber: state.reducerQuestions.questionNumber,
  isPlaying: state.reducerUser.isPlaying,
  url: state.reducerUser.urlGravatar,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (token) => dispatch(fetchQuestionsThunk(token)),
  scoreGlobal: (score) => dispatch(scoreGlobalAction(score)),
  scoreGlobal2: (score) => dispatch(scoreGlobal2Action(score)),
  buttonChangeQuestion: () => dispatch(buttonChangeQuestionAction()),
  lastQuestion: () => dispatch(lastQuestionAction()),
  willPlay: () => dispatch(willPlayAction()),
});

GameQuestions.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.objectOf(String).isRequired,
  shufledAnswers: PropTypes.arrayOf(PropTypes.array).isRequired,
  questionNumber: PropTypes.number.isRequired,
  scoreGlobal: PropTypes.func.isRequired,
  scoreGlobal2: PropTypes.func.isRequired,
  buttonChangeQuestion: PropTypes.func.isRequired,
  lastQuestion: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  isButtonVisible: PropTypes.bool.isRequired,
  shouldRedirect: PropTypes.bool.isRequired,
  rightAnswers: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
