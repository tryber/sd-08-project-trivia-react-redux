import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import { resetScore } from '../store/actions/player.actions';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      redirectTo: '',
    };
  }

  render() {
    const { redirect, redirectTo } = this.state;
    const { resetScoreReducer } = this.props;
    if (redirect) {
      return <Redirect push to={ redirectTo } />;
    }

    const GOOD_SCORE = 3;
    const { score, assertions } = this.props;

    return (
      <div>
        <Header />
        <span data-testid="feedback-text">
          {assertions >= GOOD_SCORE ? 'Mandou bem!' : 'Podia ser melhor...'}
        </span>
        <span>Acertos: </span>
        <span data-testid="feedback-total-question">{assertions}</span>
        <span>Pontução: </span>
        <span data-testid="feedback-total-score">{score}</span>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            resetScoreReducer();
            this.setState({ redirect: !redirect, redirectTo: '/' });
          } }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => {
            resetScoreReducer();
            this.setState({ redirect: !redirect, redirectTo: '/ranking' });
          } }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { player } = state;
  return {
    name: player.name,
    score: player.score,
    email: player.email,
    assertions: player.assertions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    resetScoreReducer: () => dispatch(resetScore()),
  };
}

Feedback.propTypes = {
  score: PropTypes.number,
  assertions: PropTypes.number,
  resetScoreReducer: PropTypes.func.isRequired,
};

Feedback.defaultProps = {
  score: 0,
  assertions: 0,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
