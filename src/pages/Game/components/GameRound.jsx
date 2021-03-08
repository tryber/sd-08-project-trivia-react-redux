import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import GameAnswer from './GameAnswer';

import { shuffle } from '../../../core/trivia';

import { QuestionType } from '../../../common/Types';

function GameRound({ question, onChoice, round, isDisabled, done }) {
  const { category, text, answers } = question;
  const memoAnswers = useMemo(() => shuffle(answers), [answers]);

  return (
    <section className="game-round">
      <div className="game-round-category">
        <span
          className="game-round-category-label"
        >
          Category:

        </span>
        <span
          className="game-round-category-type"
          data-testid="question-category"
        >
          {category}

        </span>
      </div>
      <section
        className="game-round-question"
        data-testid="question-text"
      >
        <ReactMarkdown source={ text } />

      </section>

      <section className="game-answer-list">
        {memoAnswers.map((i) => (<GameAnswer
          key={ i.id }
          answer={ i }
          done={ done }
          round={ round }
          onChoice={ onChoice }
          isDisabled={ isDisabled }
        />))}
      </section>
    </section>
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
