import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { resetStoreAction } from '../../actions';

class Ranking extends Component {
  render() {
    const { resetStore } = this.props;
    const rankings = JSON.parse(localStorage.getItem('ranking'));
    rankings.sort((a, b) => (b.score - a.score));
    return (
      <>
        <header>
          <Link
            to="/"
            data-testid="btn-go-home"
            onClick={ resetStore }
          >
            Jogar novamente
          </Link>
        </header>
        <main>
          <p data-testid="ranking-title">Ranking</p>
          <ol>
            { rankings.map((ranking, index) => (
              <li key={ ranking.name }>
                <img src={ ranking.picture } alt="avatar" />
                <div data-testid={ `player-name-${index}` }>{ ranking.name }</div>
                <div data-testid={ `player-score-${index}` }>{ ranking.score }</div>
              </li>
            ))}
          </ol>
        </main>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStoreAction()),
});

Ranking.propTypes = {
  resetStore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
