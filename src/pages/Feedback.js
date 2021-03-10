import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonClickPlayAgain = this.handleButtonClickPlayAgain.bind(this);
    this.handleButtonClickRanking = this.handleButtonClickRanking.bind(this);
  }

  handleButtonClickPlayAgain() {
    const { history } = this.props;
    history.push('/');
  }

  handleButtonClickRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    return (
      <>
        <Header />
        <h2 data-testid="feedback-text">Tela de feedback!</h2>
        <div data-testid="feedback-total-score">
          {this.messageScore()}
        </div>
        <div data-testid="feedback-total-question">
          {this.messageAssertions()}
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.handleButtonClickPlayAgain }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.handleButtonClickRanking }
        >
          Ver Ranking
        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Feedback;
