import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/components/Header/Header';

class Feedback extends React.Component {
  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { assertions, score } = state.player;
    const THREE_ASSERTIONS = 3;
    return (
      <section>
        <Header />
        <p data-testid="feedback-text">
          {console.log(assertions)}
          { assertions < THREE_ASSERTIONS ? 'Podia ser melhor...' : 'Mandou bem!' }
        </p>
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar Novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </section>
    );
  }
}

export default Feedback;
