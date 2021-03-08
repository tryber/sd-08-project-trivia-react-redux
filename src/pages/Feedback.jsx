import React from 'react';
import { useHistory } from 'react-router-dom';
import * as player from '../core/player';

import ButtonRanking from '../components/ButtonRanking';
import Header from '../components/Header';

import { feedbackEval } from '../core/trivia';

function Feedback() {
  const history = useHistory();

  const playerAssert = player.getPlayer().player.assertions;
  const playerScore = player.getPlayer().player.score || 0;
  const feedbackText = feedbackEval(playerAssert);

  return (
    <main>
      <Header />
      <section className="game-feedback">
        <div data-testid="feedback-text" className="game-feedback-text">
          {feedbackText}
        </div>

        <section className="game-feedback-score">
          <div className="game-feedback-score-item">
            <span>Assertions:</span>
            <span data-testid="feedback-total-question">
              {playerAssert}
            </span>
          </div>
          <div className="game-feedback-score-item">
            <span>Score:</span>
            <span data-testid="feedback-total-score">
              {playerScore}
            </span>
          </div>

        </section>

        <br />
      </section>

      <section className="game-footer-feedback">
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
          className="button-base"
        >
          Jogar novamente
        </button>
        <ButtonRanking />
      </section>

    </main>
  );
}

export default Feedback;
