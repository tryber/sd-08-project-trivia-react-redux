import React, { Component } from 'react';
import PropTypes from 'prop-types';
import redirect from '../services/redirect';

const B_BEFORE_A = 1;
const A_BEFORE_B = -1;

class Ranking extends Component {
  compareFunction(itemA, itemB) {
    if (itemB.score > itemA.score) return B_BEFORE_A;
    if (itemB.score < itemA.score) return A_BEFORE_B;
    return itemA.name.localeCompare(itemB.name);
  }

  render() {
    const { history } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = [...ranking].sort(
      (itemA, itemB) => this.compareFunction(itemA, itemB),
    );
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          {orderedRanking.map((item, index) => (
            <div key={ index }>
              <img src={ item.picture } alt={ `${item.name} profile` } />
              <span data-testid={ `player-name-${index}` }>{item.name}</span>
              <span data-testid={ `player-score-${index}` }>{item.score}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => redirect(history, '/') }
        >
          Home
        </button>
      </div>
    );
  }
}

export default Ranking;

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
