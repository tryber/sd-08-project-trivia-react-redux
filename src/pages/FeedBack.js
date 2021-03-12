import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    const numberAssertions = 3;
    return (
      <div>
        <Header />
        <h1>Feedback</h1>
        <h2 data-testid="feedback-text">
          {assertions < numberAssertions
            ? 'Podia ser melhor...'
            : 'Mandou bem!'}
        </h2>
        <span data-testid="feedback-total-score">{score}</span>
        <span data-testid="feedback-total-question">{assertions}</span>
        <Link to="/">
          <button data-testid="btn-play-again" type="button">
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button data-testid="btn-ranking" type="button">
            Ver Ranking
          </button>
        </Link>
      </div>
    );
  }
}
Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.player.correctAnswers,
  score: state.player.player.score,
});

export default connect(mapStateToProps)(Feedback);
