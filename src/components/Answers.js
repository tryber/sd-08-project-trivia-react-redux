import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../store/ducks/game';
import { Creators as TimerActions } from '../store/ducks/timer';

import styles from '../styles/components/Answers.module.css';

const correctAnswerStyles = {
  border: '3px solid rgb(6, 240, 15)',
  background: 'rgb(6, 240, 15, 0.5)',
  color: 'black',
};

const incorrectAnswerStyles = {
  border: '3px solid rgb(255, 0, 0)',
  background: 'rgb(255, 0, 0, 0.5)',
  color: 'black',
};

class Answers extends Component {
  constructor(props) {
    super(props);

    const { questions, currentQuestionIndex } = this.props;
    const {
      correct_answer: correct,
      incorrect_answers: incorrect,
    } = questions[currentQuestionIndex];

    this.answers = [
      { isCorrect: true, answer: correct },
      ...incorrect.map((answer) => ({ isCorrect: false, answer })),
    ];

    this.answers.sort(() => (Math.random() < +'0.5' ? 1 : -'1'));

    this.handleRightAnswer = this.handleRightAnswer.bind(this);
    this.handleWrongAnswer = this.handleWrongAnswer.bind(this);
  }

  handleRightAnswer() {
    const { rightAnswer, stopTimer } = this.props;
    rightAnswer();
    stopTimer();
  }

  handleWrongAnswer() {
    const { wrongAnswer, stopTimer } = this.props;
    wrongAnswer();
    stopTimer();
  }

  renderCorrectButton(answer, index) {
    const { isRevealed, isTimedOut } = this.props;
    return (
      <button
        style={ isTimedOut || isRevealed ? correctAnswerStyles : null }
        type="button"
        data-testid="correct-answer"
        key={ index }
        onClick={ this.handleRightAnswer }
        disabled={ isTimedOut || isRevealed }
      >
        { atob(answer) }
      </button>
    );
  }

  renderIncorrectButton(answer, index) {
    const { isRevealed, isTimedOut } = this.props;
    return (
      <button
        style={ isTimedOut || isRevealed ? incorrectAnswerStyles : null }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ index }
        onClick={ this.handleWrongAnswer }
        disabled={ isTimedOut || isRevealed }
      >
        { atob(answer) }
      </button>
    );
  }

  render() {
    return (
      <div className={ styles.answersContainer }>
        { this.answers.map((answer, index) => (
          answer.isCorrect
            ? this.renderCorrectButton(answer.answer, index)
            : this.renderIncorrectButton(answer.answer, index))) }
      </div>
    );
  }
}

Answers.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  rightAnswer: PropTypes.func.isRequired,
  wrongAnswer: PropTypes.func.isRequired,
  stopTimer: PropTypes.func.isRequired,
  isTimedOut: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ game, timer }) => ({
  questions: game.questions,
  currentQuestionIndex: game.currentQuestionIndex,
  isRevealed: game.isRevealed,
  isTimedOut: timer.isTimedOut,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ ...GameActions, ...TimerActions }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Answers);
