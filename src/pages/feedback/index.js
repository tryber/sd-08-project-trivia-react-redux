import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

class Feedback extends Component {
  render() {
    const { score, assertions } = this.props;
    const THREE_ASSERTIONS = 3;
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          { assertions >= THREE_ASSERTIONS
            ? <h1>Mandou bem!</h1> : <h1>Podia ser melhor...</h1> }
        </h1>
        <p data-testid="feedback-total-question">
          { `Você acertou ${assertions} questões!` }
        </p>
        <p data-testid="feedback-total-score">
          { `Um total de ${score} pontos` }
        </p>
        <Link to="/ranking" data-testid="btn-ranking">Ver Ranking</Link>
        <Link to="/" data-testid="btn-play-again">Jogar novamente</Link>
      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.score.score,
  assertions: state.score.assertions,
});

export default connect(mapStateToProps)(Feedback);
