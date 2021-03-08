import React, { useMemo, useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

import PropTypes from 'prop-types';
import { AnswerType } from '../../../common/Types';

import {
  QUESTION_CORRECT_STYLE,
  QUESTION_WRONG_STYLE,
} from '../../../common/Defs';

function GameAnswer({ answer, onChoice, round, isDisabled, done }) {
  const [selected, setSelected] = useState(false);
  const { id, text, isCorrect } = answer;

  const handleSelect = (question) => {
    if (!done) {
      setSelected(true);
      onChoice(isCorrect, question);
    }
  };

  useEffect(() => {
    setSelected(false);
  }, [round]);

  const feedbackStyle = useMemo(() => {
    if (done) {
      return isCorrect ? QUESTION_CORRECT_STYLE : QUESTION_WRONG_STYLE;
    }
  }, [done, round, isCorrect]);

  return (
    <button
      type="button"
      className={ !done ? 'game-answer' : 'game-answer-done' }
      style={ feedbackStyle }
      data-testid={ isCorrect ? 'correct-answer'
        : `wrong-answer-${id - 1}` }
      onClick={ (question) => handleSelect(question) }
      disabled={ isDisabled }
    >
      <ReactMarkdown
        source={ text }
        className={ !selected && done && 'game-answer-unselected' }
      />
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
