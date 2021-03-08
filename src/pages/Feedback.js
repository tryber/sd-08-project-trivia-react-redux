import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Header } from '../components';
import { resetScoreAndAnswerAction } from '../actions';

const PASSING_SCORE = 3;

const Feedback = ({ correctAnswers, score, resetScoreAndAnswers }) => {
  const message = correctAnswers >= PASSING_SCORE ? 'Mandou bem!' : 'Podia ser melhor...';

  return (
    <div className="d-flex flex-column">
      <Header />
      <section>
        <h5 data-testid="feedback-text">{ message }</h5>
        <div>
          Pontuação total:
          <h6 data-testid="feedback-total-score">{ score }</h6>
        </div>
        <div>
          Quantidade de acertos:
          <h6 data-testid="feedback-total-question">{ correctAnswers }</h6>
        </div>
      </section>
      <Link
        to="/"
        data-testid="btn-play-again"
        className="ranking btn btn-secondary w-25"
        onClick={ () => resetScoreAndAnswers() }
      >
        <h6>Jogar Novamente</h6>
      </Link>
      <Link
        to="/ranking"
        data-testid="btn-ranking"
        className="ranking btn btn-secondary w-25"
        onClick={ () => resetScoreAndAnswers() }
      >
        <h6>Ranking</h6>
      </Link>
    </div>
  );
};

Feedback.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  resetScoreAndAnswers: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetScoreAndAnswers: () => dispatch(resetScoreAndAnswerAction()),
});

const mapStateToProps = (state) => ({
  correctAnswers: state.play.correctAnswers,
  score: state.play.score,
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
