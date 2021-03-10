import React, { useState } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import FeedbackScreenHeader from '../components/FeedbackScreenHeader';

const FeedBackScreen = (props) => {
  const [playAgain, letsPlayAgain] = useState(false);
  const [ranking, showRankig] = useState(false);
  const FEEDBACK_ASSERTION = 3;
  const { email, name, score } = props;
  const { player: { assertions } } = JSON.parse(localStorage.getItem('state'));
  console.log(assertions);
  const hash = md5(email).toString();
  const src = `https://www.gravatar.com/avatar/${hash}`;
  if (playAgain) {
    return (
      <Redirect to="/" />
    );
  }
  if (ranking) {
    return (
      <Redirect to="/ranking" />
    );
  }
  return (
    <div data-testid="feedback-text">
      <FeedbackScreenHeader image={ src } name={ name } score={ score } />
      {assertions < FEEDBACK_ASSERTION ? <p>Podia ser melhor...</p> : <p>Mandou bem!</p>}
      <p data-testid="feedback-total-score">{score}</p>
      {assertions === 0
        ? <p data-testid="feedback-total-question">{assertions}</p>
        : (
          <p
            data-testid="feedback-total-question"
          >
            {assertions}
          </p>)}
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ () => letsPlayAgain(true) }
      >
        Jogar novamente
      </button>
      <button type="button" data-testid="btn-ranking" onClick={ () => showRankig(true) }>
        Ranking
      </button>
    </div>
  );
};

FeedBackScreen.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  name: state.name,
  email: state.email,
  score: state.score,
});

export default connect(mapStateToProps)(FeedBackScreen);
