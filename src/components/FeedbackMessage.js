import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class FeedbackMessage extends React.Component {
  constructor(props) {
    super(props);

    this.handleButtonClickRanking = this.handleButtonClickRanking.bind(this);
  }

  message() {
    const { player } = this.props;
    const THREE = 3;
    return (
      player.assertions < THREE ? (
        <h2 data-testid="feedback-text">Podia ser melhor...</h2>
      ) : (
        <h2 data-testid="feedback-text">Mandou bem!</h2>
      )
    );
  }

  messageScore() {
    const storage = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = storage;
    return `Com total de ${score} pontos`;
  }

  render() {
    return (
      <>
        <div data-testid="feedback-total-score">
          {this.messageScore()}
        </div>
        <div data-testid="feedback-total-question">
          {this.message()}
        </div>
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

const mapStateToProps = ({ player }) => ({
  player,
});

FeedbackMessage.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(FeedbackMessage);
