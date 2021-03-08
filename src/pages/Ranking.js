import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Ranking extends Component {
  constructor(props) {
    super(props);
    this.renderRank = this.renderRank.bind(this);
    this.getRankByScore = this.getRankByScore.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  componentDidMount() {
    this.getRankByScore();
  }

  getRankByScore() {
    const UM_NEGATIVO_SORT = -1;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const ordenedRank = ranking.sort((a, b) => {
      if (a.score < b.score) {
        return 1;
      }
      if (a.score > b.score) {
        return UM_NEGATIVO_SORT;
      }
      return 0;
    });
    return ordenedRank;
  }

  goHome() {
    const { history } = this.props;
    history.push('/');
  }

  renderRank() {
    return this.getRankByScore().map((e, index) => (
      <li key={ index }>
        <img
          alt={ e.name }
          src={ e.picture }
        />
        <span data-testid={ `player-name-${index}` }>
          {e.name}
        </span>
        <span
          data-testid={ `player-score-${index}` }
        >
          {e.score}
        </span>
      </li>));
  }

  render() {
    return (
      <div>
        <h1 data-testid="ranking-title">RANKING</h1>
        <button
          type="button"
          onClick={ this.goHome }
          data-testid="btn-go-home"
        >
          Go home
        </button>
        <ul>
          {this.renderRank()}
        </ul>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
