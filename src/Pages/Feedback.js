import React from 'react';

import '../styles/feedback.css';

const THREE = 3;

class FeedbackPage extends React.Component {
  onClickPlayAgain() {
    window.location.href = '/';
  }

  onClickRank() {
    window.location.href = '/rank';
  }

  render() {
    const player = localStorage.getItem('state');
    const playerObj = JSON.parse(player);
    return (
      <>
        <header className="header-feedback">
          <div className="name-gravatar">
            <img
              src="https://www.gravatar.com/avatar/U2FsdGVkX1/0pruu96nX+mxAf7RfQMQkMZtZkuRzURjq4qlGV8CuxdxxfiNbXApZ"
              alt="logo-gravatar"
              data-testid="header-profile-picture"
            />
            <p data-testid="header-player-name">{playerObj.player.name}</p>
          </div>
          <p data-testid="header-score">{playerObj.player.score}</p>
        </header>
        <section className="section-feedback">
          <div className="div-section">
            { playerObj.player.assertions < THREE
              ? <p data-testid="feedback-text">Podia ser melhor... </p>
              : <p data-testid="feedback-text">Mandou bem!</p>}

            <p
              data-testid="feedback-total-score"
            >
              {playerObj.player.score}
            </p>
            <p
              data-testid="feedback-total-question"
            >
              {playerObj.player.assertions}
            </p>

            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => this.onClickPlayAgain() }
            >
              Jogar novamente
            </button>

            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => this.onClickRank() }
            >
              Ver Ranking
            </button>
          </div>
        </section>
      </>
    );
  }
}

export default FeedbackPage;
