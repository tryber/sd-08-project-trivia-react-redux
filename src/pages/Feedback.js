import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();

    this.playAgain = this.playAgain.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  playAgain() {
    const { history } = this.props;
    history.push('/');
  }

  handleSubmit() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const feedbackState = JSON.parse(localStorage.getItem('state')).player;
    return (
      <div>
        <Header score={ feedbackState.score } />
        <h1 data-testid="feedback-text">Feedback</h1>
        <span data-testid="feedback-total-score">
          Pontuação total:
          { feedbackState.score }
        </span>
        <span data-testid="feedback-total-question">
          Acertos:
          { feedbackState.assertions }
        </span>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          onClick={ this.handleSubmit }
          data-testid="btn-ranking"
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
