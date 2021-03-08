import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetScoreAndAnswerAction } from '../actions';

const M_ONE = -1;

class Ranking extends Component {
  render() {
    const { resetScoreAndAnswers } = this.props;
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => {
        if (a.score < b.score) {
          return 1;
        }
        if (b.score < a.score) {
          return M_ONE;
        }
        return 0;
      });

    return (
      <div className="ranking w-75 d-flex flex-column">
        <ul className="list-group">
          <li className="list-group-item active">
            <h4 data-testid="ranking-title" className="mb-0">
              Ranking
            </h4>
          </li>
          { ranking.map((ranked, index) => (
            <li
              key={ index }
              className="list-group-item list-group-item
                d-flex justify-content-between align-items-center"
            >
              <img
                alt="user-gravatar"
                src={ ranked.picture }
                className="rounded-circle"
              />
              <h6
                className="mb-0"
                data-testid={ `player-name-${index}` }
              >
                { ranked.name }
              </h6>
              <h7 data-testid={ `player-score-${index}` }>
                { ranked.score }
              </h7>
            </li>
          )) }
        </ul>
        <Link
          to="/"
          data-testid="btn-go-home"
          className="ranking btn btn-secondary w-25"
          onClick={ () => resetScoreAndAnswers() }
        >
          <h6>Jogar Novamente</h6>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  resetScoreAndAnswers: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetScoreAndAnswers: () => dispatch(resetScoreAndAnswerAction()),
});

export default connect(null, mapDispatchToProps)(Ranking);
