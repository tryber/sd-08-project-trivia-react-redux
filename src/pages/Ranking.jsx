<<<<<<< HEAD
import React from 'react';
import ButtonHome from '../components/ButtonHome';
import * as ranking from '../core/ranking';

function Ranking() {
  return (
    <div>
      <h1 data-testid="ranking-title">Ranking</h1>
      <ButtonHome />
      <ol>
        { ranking.loadRanking().sort((a, b) => b.score - a.score).map((i, index) => (
          <li key={ index }>
            <br />
            <span data-testid={ `player-name-${index}` }>{i.name}</span>
            <br />
            <span data-testid={ `player-score-${index}` }>{i.score}</span>
            <br />
            <img
              data-testid={ `player-image-${index}` }
              alt="gravatar"
              src={ i.image }
            />
            <br />
          </li>))}
      </ol>
    </div>
  );
=======
import React, { Component } from 'react';

class Ranking extends Component {
  render() {
    return (
      <div>
        <h1>RANKING</h1>
      </div>
    );
  }
>>>>>>> origin/main-group-20
}

export default Ranking;
