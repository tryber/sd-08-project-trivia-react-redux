import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionReturnLogin } from '../redux/actions/index';

class Ranking extends Component {
  compare(a, b) {
    const NEGATIVE = -1;
    if (a.score > b.score) return NEGATIVE;
    if (b.score > a.score) return 1;
    return 0;
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = ranking.sort(this.compare);
    const { returnLogin } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title" className="ranking-page">
          Ranking
        </h1>
        <div className="ranking-container">
          <Link to="/">
            <button
              type="button"
              data-testid="btn-go-home"
              onClick={ () => returnLogin() }
              className="btn btn-success button-ranking"
            >
              Jogar novamente
            </button>
          </Link>
          {sortedRanking.map((player, index) => (
            <div key={ index } className="div-ranking">
              <img
                data-testid="header-profile-picture"
                src={ `https://www.gravatar.com/avatar/${player.gravatarEmail}` }
                className="gravatar-ranking"
                alt="perfil"
              />
              <span className="span-rankin" key={ player.name }>
                Player:
                {' '}
                <span data-testid={ `player-name-${index}` }>{player.name}</span>
              </span>
              <span
                className="span-rankin"
                key={ player.score }
                data-testid={ `player-score-${index}` }
              >
                Pontuação:
                {' '}
                {player.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  returnLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  returnLogin: () => dispatch(actionReturnLogin()),
});

export default connect(null, mapDispatchToProps)(Ranking);
