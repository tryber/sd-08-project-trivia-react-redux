import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { AnswerType } from '../../../common/Types';

const correctStyle = {
  border: '3px solid rgb(6, 240, 15)',
};

const wrongStyle = {
  border: '3px solid rgb(255, 0, 0)',
};

function GameAnswer({ answer, onChoice, round, isDisabled, done }) {
  const { id, text, isCorrect } = answer;

  const handleSelect = (question) => {
    if (!done) {
      onChoice(isCorrect, question);
    }
  };

  const memoStyle = useMemo(() => {
    if (done) {
      return isCorrect ? correctStyle : wrongStyle;
    }
  }, [done, round, isCorrect]);

  return (
    <button
      type="button"
      className="game-answer"
      style={ memoStyle }
      data-testid={ isCorrect ? 'correct-answer'
        : `wrong-answer-${id - 1}` }
      onClick={ (question) => handleSelect(question) }
      disabled={ isDisabled }
    >
      {text}

    </button>
  );
}

GameAnswer.propTypes = {
  answer: AnswerType.isRequired,
  onChoice: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  round: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default GameAnswer;
