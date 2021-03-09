import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import GameHeader from './GameHeader';
import { resetStoreAction } from '../../actions';

class Feedback extends Component {
  render() {
    const { score, rightAnswers, resetStore } = this.props;
    const CORRECT_ANSWERS_NEEDED = 3;
    return (
      <>
        <GameHeader />
        {
          rightAnswers < CORRECT_ANSWERS_NEEDED
            ? <h1 data-testid="feedback-text">Podia ser melhor...</h1>
            : <h1 data-testid="feedback-text">Mandou bem!</h1>
        }
        <h3
          data-testid="feedback-total-score"
        >
          {score}
        </h3>
        <h3
          data-testid="feedback-total-question"
        >
          {rightAnswers}
        </h3>
        {/* <Redirect to="/" /> */}

        <Link
          to="/"
          data-testid="btn-play-again"
          onClick={ resetStore }
        >
          Jogar novamente
        </Link>
        <Link to="/ranking" data-testid="btn-ranking">Ver ranking</Link>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.reducerUser.score,
  rightAnswers: state.reducerUser.rightAnswers,
});

const mapDispatchToProps = (dispatch) => ({
  resetStore: () => dispatch(resetStoreAction()),
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  rightAnswers: PropTypes.number.isRequired,
  resetStore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
