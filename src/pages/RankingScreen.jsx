import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';

const RankingScreen = (props) => {
  const [home, goToHome] = useState(false);
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  const { score } = props;
  if (home) {
    return <Redirect to="/" />;
  }
  return (
    <div data-testid="ranking-title">
      Ranking
      {' '}
      {score}
      <ol>
        {ranking.sort((a, b) => b.score - a.score).map((player, index) => (
          <li key={ index }>
            <img src={ player.picture } alt={ player.name } />
            <p data-testid={ `player-name-${index}` }>{player.name}</p>
            <p data-testid={ `player-score-${index}` }>{player.score}</p>
          </li>
        ))}
      </ol>
      <button
        type="button"
        data-testid="btn-go-home"
        onClick={ () => goToHome(true) }
      >
        Home
      </button>
    </div>
  );
};

RankingScreen.propTypes = {
  score: PropTypes.string,
}.isRequired;

export default RankingScreen;
