import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { actionReturnLogin } from '../redux/actions/index';

class Feedback extends Component {
  render() {
    const { score, assertions } = JSON.parse(localStorage.getItem('state'))
      .player;
    const { returnLogin } = this.props;
    return (
      <>
        <Header />
        { assertions >= (2 + 1)
          ? <h1 data-testid="feedback-text">Mandou bem!</h1>
          : <h1 data-testid="feedback-text">Podia ser melhor...</h1>}

        <h2 data-testid="feedback-total-score">{score}</h2>
        <h2 data-testid="feedback-total-question">{assertions}</h2>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => returnLogin() }
          >
            Jogar novamente
          </button>
        </Link>
      </>
    );
  }
}

Feedback.propTypes = {
  returnLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  returnLogin: () => dispatch(actionReturnLogin()),
});

export default connect(null, mapDispatchToProps)(Feedback);
