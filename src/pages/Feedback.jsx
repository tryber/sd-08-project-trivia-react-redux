<<<<<<< HEAD
import React from 'react';
import { useHistory } from 'react-router-dom';
import * as player from '../core/player';

import ButtonRanking from '../components/ButtonRanking';
import Header from '../components/Header';

const DEF_FET = 3;

function Feedback() {
  const history = useHistory();
  const lastGameAssert = player.getPlayer().player.assertions;
  const lastGameScore = player.getPlayer().player.score || 0;

  const feedbackText = () => (lastGameAssert < DEF_FET
    ? 'Podia ser melhor...'
    : 'Mandou bem!');

  return (
    <div>
      <Header />
      Feedback
      <div data-testid="feedback-text">
        Feedback:
        {feedbackText()}
      </div>
      <div data-testid="feedback-total-question">
        {lastGameAssert}
      </div>
      <div data-testid="feedback-total-score">
        {lastGameScore}
      </div>
      <br />
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ () => history.push('/') }
      >
        Jogar novamente
      </button>
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => history.push('/game') }
      >
        Proxima!
      </button>
      <ButtonRanking />
    </div>
  );
=======
import React, { Component } from 'react';

class Feedback extends Component {
  render() {
    return (
      <div>
        <h1>FEEDBACK</h1>
      </div>
    );
  }
>>>>>>> origin/main-group-20
}

export default Feedback;
