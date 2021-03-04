import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/Answers.module.css';

class Answers extends Component {
  renderCorrectButton(answer, index) {
    return (
      <button
        type="button"
        data-testid="correct-answer"
        key={ index }
      >
        { atob(answer) }
      </button>
    );
  }

  renderIncorrectButton(answer, index) {
    return (
      <button
        type="button"
        data-testid={ `wrong-answer-${index}` }
        key={ index }
      >
        { atob(answer) }
      </button>
    );
  }

  render() {
    const { correct, incorrect } = this.props;

    const answers = [
      { isCorrect: true, answer: correct },
      ...incorrect.map((answer) => ({ isCorrect: false, answer })),
    ];

    answers.sort(() => (Math.random() < +'0.5' ? 1 : -'1'));

    return (
      <div className={ styles.answersContainer }>
        { answers.map((answer, index) => (
          answer.isCorrect
            ? this.renderCorrectButton(answer.answer, index)
            : this.renderIncorrectButton(answer.answer, index))) }
      </div>
    );
  }
}

// tetse

Answers.propTypes = {
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Answers;
