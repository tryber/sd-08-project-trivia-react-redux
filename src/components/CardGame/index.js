import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { connect } from 'react-redux';
import { actionScore, actionAssertions } from '../../redux/actions/score';
import Question from './Question';

const ONE_SECOND = 1000;
const DIFFICULTY = { hard: 3, medium: 2, easy: 1 };
const TEN = 10;

class CardGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'correct-answer': '',
      'wrong-answer-': '',
      timer: 30,
      disabledButtonsAnswers: false,
      showButtonNext: false,
    };
    this.handleClickAnswers = this.handleClickAnswers.bind(this);
    this.changeColorsAnswersButtons = this.changeColorsAnswersButtons.bind(this);
    this.changeShowNextButton = this.changeShowNextButton.bind(this);
    this.EnableAnswersButtons = this.EnableAnswersButtons.bind(this);
    this.clearColorsAnswersButtons = this.clearColorsAnswersButtons.bind(this);
    this.clearColorAndEnableButtonQuestion = this.clearColorAndEnableButtonQuestion
      .bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { timer, disabledButtonsAnswers } = this.state;
    if (timer === 0 || disabledButtonsAnswers) {
      clearInterval(this.intervalId);
    }
  }

  sumScore() {
    const { element: { difficulty }, score, saveScoreStore } = this.props;
    const { timer } = this.state;
    const points = TEN + (timer * DIFFICULTY[difficulty]);
    const newScore = score + points;
    saveScoreStore(newScore);
  }

  sumAssertions() {
    const { saveAssertionsStore, assertions } = this.props;
    const newAssertions = assertions + 1;
    saveAssertionsStore(newAssertions);
  }

  changeColorsAnswersButtons() {
    this.setState({
      'wrong-answer-': 'red',
      'correct-answer': 'green',

    });
  }

  changeShowNextButton() {
    this.setState({
      showButtonNext: true,
    });
  }

  changeDisabledAnswersButtons() {
    this.setState({
      disabledButtonsAnswers: true,
      showButtonNext: true,
    });
  }

  handleClickAnswers({ target: { name } }) {
    if (name === 'correct-answer') {
      this.sumScore();
      this.sumAssertions();
    }
    this.changeColorsAnswersButtons();
    this.changeShowNextButton();
    this.changeDisabledAnswersButtons();
  }

  showNextQuestionButton() {
    this.setState({
      disabledButtonsAnswers: true,
    });
  }

  clearColorsAnswersButtons() {
    this.setState({
      'correct-answer': '',
      'wrong-answer-': '',
    });
  }

  EnableAnswersButtons() {
    this.setState({
      disabledButtonsAnswers: false,
    });
  }

  clearColorAndEnableButtonQuestion() {
    this.EnableAnswersButtons();
    this.clearColorsAnswersButtons();
  }

  buttonsAnswersDisabledValidity() {
    const { timer, disabledButtonsAnswers } = this.state;
    if (timer === 0 || disabledButtonsAnswers) {
      return true;
    }
  }

  createButtonNextQuestion() {
    const { showButtonNext, timer } = this.state;
    const { changeCount } = this.props;
    if (showButtonNext || timer === 0) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          className="btn-next"
          onClick={ () => changeCount(this.clearColorAndEnableButtonQuestion) }
        >
          Next Question
        </button>
      );
    }
  }

  savePlayerLocalStorage() {
    const { name, email, score, assertions } = this.props;
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    this.savePlayerLocalStorage();
    const element = this.props;
    const { timer, 'correct-answer': correct,
      'wrong-answer-': incorrect } = this.state;
    const { category, allAnswer, question } = element.element;
    // console.log(allAnswer);
    return (
      <section>
        <Question
          category={ category }
          allAnswer={ allAnswer }
          question={ question }
          timer={ timer }
          correct={ correct }
          incorrect={ incorrect }
          handleClickAnswers={ this.handleClickAnswers }
          buttonsAnswersDisabledValidity={ this.buttonsAnswersDisabledValidity() }
        />
        <div className="next-btn">
          {this.createButtonNextQuestion()}
        </div>
      </section>
    );
  }
}

CardGame.propTypes = {
  element: PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    allAnswer: PropTypes.arrayOf(Array),
  }).isRequired,
  saveScoreStore: PropTypes.func.isRequired,
  changeCount: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  saveAssertionsStore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.scoreboard.score,
  assertions: state.scoreboard.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  saveScoreStore: (score) => dispatch(actionScore(score)),
  saveAssertionsStore: (assertions) => dispatch(actionAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
