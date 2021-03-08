import React from 'react';
import ButtonHome from '../components/ButtonHome';
import * as ranking from '../core/ranking';
import * as player from '../core/player';

function Ranking() {
  return (
    <main>
      <section className="game-ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul className="game-ranking-list">
          { ranking.loadRanking().sort((a, b) => b.score - a.score).map((i, index) => (
            <li key={ index } className="game-ranking-list-item">
              <img
                className="game-ranking-list-item-gravatar"
                data-testid={ `player-image-${index}` }
                alt="gravatar"
                src={ player.gravatarUrl(i.image) }
              />
              <span data-testid={ `player-name-${index}` }>{i.name}</span>
              <span data-testid={ `player-score-${index}` }>{i.score}</span>
            </li>))}
        </ul>
      </section>

      <section className="game-footer">
        <ButtonHome />
      </section>
    </main>
  );
}

export default Ranking;
