import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import GameAnswer from './GameAnswer';

import { shuffle } from '../../../core/trivia';

import { QuestionType } from '../../../common/Types';

function GameRound({ question, onChoice, round, isDisabled, done }) {
  const { id, category, text, answers } = question;
  const memoAnswers = useMemo(() => shuffle(answers), [answers]);

  return (
    <div className="game-round">
      <div className="game-round-category" data-testid="question-category">

        Category:
        {' '}
        {category}

      </div>

      <div className="game-round-question" data-testid="question-text">
        <span>{id + 1}</span>
        <span>{ ' - '}</span>
        <span>{text}</span>
      </div>
      <div className="game-answer-list">
        {memoAnswers.map((i) => (<GameAnswer
          key={ i.id }
          answer={ i }
          done={ done }
          round={ round }
          onChoice={ onChoice }
          isDisabled={ isDisabled }
        />))}
      </div>
    </div>
  );
}

GameRound.propTypes = {
  question: QuestionType.isRequired,
  onChoice: PropTypes.func.isRequired,
  done: PropTypes.bool.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  round: PropTypes.number.isRequired,
};

export default GameRound;
