// https://stackoverflow.com/questions/51393153/react-routing-redirect-onclick
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

class Ranking extends Component {
  render() {
    let ranking = [];
    const getRankings = () => {
      console.log('1');
      const rankingString = localStorage.getItem('ranking');
      console.log('2');
      console.log(ranking);
      while (ranking === null || ranking.length === 0) {
        ranking = JSON.parse(rankingString);
        console.log('3');
        console.log(ranking);
        // console.log(typeof ranking);
        ranking.sort((a, b) => b.score - a.score);
      }
      console.log('4');
      return ranking;
    };

    ranking = getRankings();

    // const { score, name, picture } = ranking;
    if (!ranking) {
      return (
        <div>
          Carregando...
        </div>
      );
    }
    return (
      <div>
        <div data-testid="ranking-title">
          Tela de ranking
        </div>
        {ranking.map((e, index) => (
          <div key={ index }>
            <img src={ e.picture } alt={ e.name } />
            <p data-testid={ `player-name-${index}` }>{ e.name }</p>
            <p
              data-testid={ `player-score-${index}` }
            >
              { e.score }
            </p>
          </div>
        ))}
        <NavLink
          to="/"
        >
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Jogar novamente
          </button>
        </NavLink>
      </div>
    );
  }
}

Ranking.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

export default Ranking;
