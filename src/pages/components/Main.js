import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import requestQuestion from '../../actions/getQuestions';
import stopTimerAction from '../../actions/stopTimerAction';
import { updateScore } from '../../actions/scoreAction';
import createPlayerAction from '../../actions/createPlayerAction';
import '../../styles/Main.css';
import Timer from './Timer';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      indexOfQuestion: 0,
      isFetching: true,
      assertions: 0,
      renderNextBtn: false,
    };

    this.randomOptions = this.randomOptions.bind(this);
    this.renderOptions = this.renderOptions.bind(this);
    this.clickAnwser = this.clickAnwser.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.renderNextBtnFunc = this.renderNextBtnFunc.bind(this);
    this.renderBtn = this.renderBtn.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.resetStyleBtn = this.resetStyleBtn.bind(this);
    this.reset = this.reset.bind(this);
    this.saveLocalStorage = this.saveLocalStorage.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    const { token, requestQuestionAction } = this.props;
    await requestQuestionAction(token);
    this.randomOptions();
  }

  randomOptions() {
    const { questions } = this.props;
    const { indexOfQuestion } = this.state;
    const quest = questions.results[indexOfQuestion];

    const PROBABILITY = 0.5;
    const answers = [quest.correct_answer, ...quest.incorrect_answers];
    const sortedAnswers = answers.sort(() => Math.random() - PROBABILITY);

    this.setState({
      category: quest.category,
      question: quest.question,
      answers: sortedAnswers,
      isFetching: false,
      renderNextBtn: false,
    });
  }

  clickAnwser() {
    const { stopTimer } = this.props;
    const btns = document.querySelectorAll('.answer');
    btns.forEach((btn) => {
      if (btn.name === 'correct') {
        btn.classList.add('correct');
        btn.disabled = true;
      } else {
        btn.classList.add('incorrect');
        btn.disabled = true;
      }
    });
    stopTimer();
    this.renderNextBtnFunc();
  }

  updateScore() {
    this.clickAnwser();

    this.setState((previous) => ({
      assertions: previous.assertions + 1,
    }), () => {
      let score = 0;

      const { questions, email, name, attScore, globalScore, createPlayer } = this.props;
      const { indexOfQuestion, assertions } = this.state;

      const dificuldade = questions.results[indexOfQuestion].difficulty;
      const timeToAnswer = document.getElementById('time').innerHTML;

      const TEN_POINTS = 10;
      if (dificuldade === 'hard') {
        const HARD = 3;
        score = TEN_POINTS + (Number(timeToAnswer) * HARD);
      }
      if (dificuldade === 'medium') {
        const MEDIUM = 2;
        score = TEN_POINTS + (Number(timeToAnswer) * MEDIUM);
      }
      if (dificuldade === 'easy') {
        const EASY = 1;
        score = TEN_POINTS + (Number(timeToAnswer) * EASY);
      }
      attScore(score);
      const player = {
        player: {
          name,
          assertions,
          score: globalScore + score,
          gravatarEmail: email,
        },
      };
      createPlayer(player);
      this.saveLocalStorage(player);
    });
  }

  saveLocalStorage(player) {
    localStorage.setItem('state', JSON.stringify(player));
    const test = JSON.parse(localStorage.getItem('state'));
    console.log(test.player.score);
  }

  resetStyleBtn() {
    const btns = document.querySelectorAll('.answer');
    btns.forEach((btn) => {
      btn.className = 'answer';
      btn.disabled = false;
    });
  }

  reset() {
    console.log('ok');
  }

  nextQuestion() {
    const QUATRO = 4;
    const { history } = this.props;
    const { indexOfQuestion } = this.state;
    if (indexOfQuestion < QUATRO) {
      this.setState((previous) => ({
        indexOfQuestion: previous.indexOfQuestion + 1,
      }), () => {
        this.randomOptions();
        this.resetStyleBtn();
      });
    } else {
      history.push('/feedback');
    }
    this.reset();
  }

  renderNextBtnFunc() {
    this.setState({ renderNextBtn: true });
  }

  renderBtn() {
    return (
      <button data-testid="btn-next" type="button" onClick={ this.nextQuestion }>
        Próxima
      </button>
    );
  }

  renderOptions() {
    const { answers, indexOfQuestion } = this.state;
    const { questions } = this.props;
    const rightAnswer = questions.results[indexOfQuestion].correct_answer;

    const MENOS_UM = -1;
    let initialIndex = MENOS_UM;
    const result = answers.map((e, index) => {
      if (e === rightAnswer) {
        return (
          <button
            name="correct"
            className="answer"
            type="button"
            key={ index }
            data-testid="correct-answer"
            onClick={ this.updateScore }
          >
            {e}
          </button>);
      }
      initialIndex += 1;
      return (
        <button
          name="incorrect"
          className="answer"
          type="button"
          key={ index }
          data-testid={ `wrong-answer-${initialIndex}` }
          onClick={ this.clickAnwser }
        >
          {e}
        </button>);
    });
    return result;
  }

  render() {
    const { isFetching, category, question, renderNextBtn } = this.state;
    // console.log(JSON.parse(localStorage.getItem('state')).player);
    return (
      <main className="main-body">
        <div className="main-content">
          <div className="timer-container">
            {!isFetching && <Timer
              resetTime={ this.reset }
              disableBtn={ this.clickAnwser }
            />}
          </div>
          <p>
            categoria:
            <span data-testid="question-category">{category}</span>
          </p>
          <p className="question" data-testid="question-text">{question}</p>
          <div className="button-container">
            {!isFetching && this.renderOptions()}
          </div>
          <div className="next-button">
            {renderNextBtn && this.renderBtn()}
          </div>
        </div>
      </main>
    );
  }
}

Main.propTypes = {
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.any).isRequired,
  requestQuestionAction: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  attScore: PropTypes.func.isRequired,
  globalScore: PropTypes.number.isRequired,
  createPlayer: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestQuestionAction: (value) => dispatch(requestQuestion(value)),
  stopTimer: () => dispatch(stopTimerAction()),
  attScore: (value) => dispatch(updateScore(value)),
  createPlayer: (value) => dispatch(createPlayerAction(value)),
});

const mapStateToProps = (state) => ({
  token: state.getTokenReducer.token,
  questions: state.getQuestions.questions,
  email: state.setUser.email,
  name: state.setUser.name,
  globalScore: state.score.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
