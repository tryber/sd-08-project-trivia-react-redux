import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const THREE_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <h1 data-testid="feedback-text">
          {
            assertions < THREE_ASSERTIONS
              ? 'Podia ser melhor...'
              : 'Mandou bem!'
          }
        </h1>
        <p>
          Você acertou
          {' '}
          <span data-testid="feedback-total-question">{assertions}</span>
          {' '}
          perguntas e somou
          {' '}
          <span data-testid="feedback-total-score">{score}</span>
          {' '}
          pontos!
        </p>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
        <a href="/" data-testid="btn-play-again">Jogar novamente</a>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.reducerRequestApiTrivia.currentScore,
  assertions: state.reducerRequestApiTrivia.assertions,
});

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
