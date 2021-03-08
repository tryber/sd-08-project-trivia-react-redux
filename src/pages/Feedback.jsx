import React from 'react';
import PropTypes from 'prop-types';

import md5 from 'crypto-js/md5';
import redirect from '../services/redirect';
import Header from '../components/Header';

const MINIMUM_ASSERTIONS = 3;

class Feedback extends React.Component {
  feedback({ player: { assertions } }) {
    if (assertions < MINIMUM_ASSERTIONS) {
      return <span data-testid="feedback-text">Podia ser melhor...</span>;
    }
    if (assertions >= MINIMUM_ASSERTIONS) {
      return <span data-testid="feedback-text">Mandou bem!</span>;
    }
  }

  finalScore({ player: { score, assertions } }) {
    return (
      <section>
        <div data-testid="feedback-total-score">{score}</div>
        <div data-testid="feedback-total-question">{assertions}</div>
      </section>
    );
  }

  generateRanking(player, path) {
    const { history } = this.props;
    const {
      player: { name, score, gravatarEmail: email },
    } = player;
    const localRanking = JSON.parse(localStorage.getItem('ranking')) || [];
    const thisPlayerPoints = {
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${md5(email).toString()}`,
    };
    const newRanking = [...localRanking, thisPlayerPoints];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
    redirect(history, path);
  }

  render() {
    const player = JSON.parse(localStorage.getItem('state'));
    return (
      <>
        <Header />
        <section>{this.feedback(player)}</section>
        {this.finalScore(player)}
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => { this.generateRanking(player, '/'); } }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => this.generateRanking(player, '/ranking') }
        >
          Ranking
        </button>
      </>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
