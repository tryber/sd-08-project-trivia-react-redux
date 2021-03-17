import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';

class Feedback extends React.Component {
  renderMensagem() {
    const { playerState: { assertions } } = this.props;
    const assertionsThreshold = 3;
    if (assertions < assertionsThreshold) {
      return <p data-testid="feedback-text">Podia ser melhor...</p>;
    }
    return <p data-testid="feedback-text">Mandou bem!</p>;
  }

  renderScore() {
    const { playerState: { assertions, score } } = this.props;
    return (
      <div>
        <p>
          Seu Score Final é:
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
        </p>
        <p>
          Você acertou:
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          perguntas
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        <h1 data-testid="settings-title">FEEDBACK</h1>
        { this.renderMensagem() }
        { this.renderScore() }
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>
        </Link>
        <Link to="/ranking">
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </Link>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerState: state.game.player,
});

Feedback.propTypes = {
  playerState: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Feedback);
