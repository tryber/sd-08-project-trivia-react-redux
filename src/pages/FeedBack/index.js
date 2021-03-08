import React from 'react';
import { Link } from 'react-router-dom';
import HeaderJogo from '../../components/HeaderJogo';
import { saveRankingLocalStorage } from '../../localStorage';

class FeedBack extends React.Component {
  componentDidMount() {
    saveRankingLocalStorage();
  }

  render() {
    const state = Object
      .values(JSON.parse(localStorage
        .getItem('state')).player);
    const ASSERTIONS = state[1];
    const SCORE = state[2];
    const MEDIA = 3;
    return (
      <>
        <HeaderJogo />
        {
          ASSERTIONS < MEDIA
            ? <h1 data-testid="feedback-text">Podia ser melhor...</h1>
            : <h1 data-testid="feedback-text">Mandou bem!</h1>
        }
        <span>Total Score</span>
        <p data-testid="feedback-total-score">{ SCORE }</p>
        <span>Total Questions</span>
        <p data-testid="feedback-total-question">{ ASSERTIONS }</p>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
      </>
    );
  }
}

export default FeedBack;
