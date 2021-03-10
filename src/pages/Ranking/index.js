import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { redirectPageFalse } from '../../actions';

class Ranking extends Component {
  render() {
    const { pRedirectPageFalse } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    return (
      <section>
        <h2 data-testid="ranking-title"> Ranking</h2>
        {ranking.map((player, index) => (
          <div key={ index }>
            <p
              data-testid={ `player-name-${index}` }
            >
              {player.name}
            </p>
            <p data-testid={ `player-score-${index}` }>
              {player.score}
            </p>
          </div>
        ))}
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ pRedirectPageFalse }
          >
            Volta para a tela inicial
          </button>
        </Link>
      </section>

    );
  }
}

Ranking.propTypes = {
  pRedirectPageFalse: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    pRedirectPageFalse: () => dispatch(redirectPageFalse()),
  };
}

export default connect(null, mapDispatchToProps)(Ranking);
