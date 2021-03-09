import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderFeedback from '../components/HeaderFeedback';
import {
  resetGame as resetGameAction,
} from '../actions';

import '../styles/Feedback.css';

class Feedback extends React.Component {
  render() {
    const { gameInfo, history, resetGame } = this.props;
    return (
      <div className="feedback-page-container">
        <section className="feedback-container">
          <HeaderFeedback />
          <p className="feedback-text" data-testid="feedback-text">
            { gameInfo.assertions > 2 ? 'Mandou bem!' : 'Podia ser melhor...' }
          </p>
          <span>Score:</span>
          <p data-testid="feedback-total-score">{ gameInfo.score }</p>
          <span>Correct Answers:</span>
          <p data-testid="feedback-total-question">{ gameInfo.assertions }</p>
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => { resetGame(); history.push('/'); } }
          >
            Jogar novamente
          </button>
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => { history.push('/ranking'); } }
          >
            Ver Ranking
          </button>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gameInfo: state.gameReducer,
});

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGameAction()),
});

Feedback.propTypes = {
  gameInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
