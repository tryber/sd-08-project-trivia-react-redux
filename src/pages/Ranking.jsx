import React, { Component } from 'react';
import RedirectButton from '../common/components/content/buttons/RedirectButton';
import { getRanking } from '../services/localStorage';

class Ranking extends Component {
  render() {
    const ranking = getRanking();
    return (
      <>
        <title data-testid="ranking-title">Ranking</title>
        <RedirectButton text="Home" path="/" testId="btn-go-home" />
        {ranking
          .sort((a, b) => b.score - a.score)
          .map((player, index) => (
            <div key={ index }>
              <img src={ player.picture } alt={ player.name } />
              <span data-testid={ `player-name-${index}` }>{player.name}</span>
              {' '}
              <span data-testid={ `player-score-${index}` }>{player.score}</span>
            </div>
          ))}
      </>
    );
  }
}

export default Ranking;
