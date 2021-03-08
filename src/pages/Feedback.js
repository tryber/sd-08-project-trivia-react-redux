import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componente/Header';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      assertions: 0,
      score: 0,
    };

    this.handleButtonClickPlayAgain = this.handleButtonClickPlayAgain.bind(this);
    this.handleButtonClickRanking = this.handleButtonClickRanking.bind(this);
    this.getDataPlayer = this.getDataPlayer.bind(this);
  }

  componentDidMount() {
    this.getDataPlayer();
  }

  getDataPlayer() {
    const { player: { assertions, score } } = JSON.parse(localStorage.getItem('state'));
    this.setState({
      assertions,
      score,
    });
  }

  messageFeedback(assertions) {
    const minimumQuantityAssertions = 3;

    if (assertions < minimumQuantityAssertions) {
      return 'Podia ser melhor...';
    }

    return 'Mandou bem!';
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
    const { assertions, score } = this.state;
    return (
      <div>
        <h1>Feedback</h1>
        <Header />
        <div data-testid="feedback-text">
          { this.messageFeedback(assertions) }
          <div data-testid="feedback-total-score">
            { score }
          </div>
          <div data-testid="feedback-total-question">
            { assertions }
          </div>
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
      </div>
    );
  }
}

export default Feedback;

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
