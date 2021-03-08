import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { clearToken } from '../actions';

const MINIMUM_ASSERTIONS = 3;

class Feedback extends Component {
  render() {
    const assertions = JSON.parse(localStorage.getItem('state')).player.assertions || 0;
    const score = JSON.parse(localStorage.getItem('state')).player.score || 0;
    const texto = assertions < MINIMUM_ASSERTIONS ? 'Podia ser melhor...' : 'Mandou bem!';
    const { clearToken: clearTokenAction } = this.props;

    return (
      <>
        <Header />
        <section>
          <p data-testid="feedback-text">{texto}</p>
          <p data-testid="feedback-total-question">
            {assertions}
          </p>
          <p data-testid="feedback-total-score">{score}</p>
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
            >
              Ver Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ () => clearTokenAction() }
            >
              Jogar novamente
            </button>
          </Link>
        </section>
      </>
    );
  }
}

Feedback.propTypes = {
  clearToken: PropTypes.func.isRequired,
};
const mapDispatch = {
  clearToken,
};

export default connect(null, mapDispatch)(Feedback);
