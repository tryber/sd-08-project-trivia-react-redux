import React from 'react';
import { Link } from 'react-router-dom';
import InfoFeedback from '../components/InfoFeedback';
import Header from '../components/Header';
import MessageFeedback from '../components/MessageFeedback';

class Feedback extends React.Component {
  async componentDidMount() {
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    console.log(ranking);
    if (ranking === null) {
      localStorage.setItem('ranking', JSON.stringify([playerInfo.player]));
    } else {
      const newRank = ranking.concat(playerInfo.player);
      localStorage.setItem('ranking', JSON.stringify(newRank));
    }
  }

  render() {
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions, score, name, email } } = playerInfo;
    return (
      <div>
        <Header name={ name } email={ email } />
        <h1>Feedback</h1>
        <MessageFeedback assertions={ assertions } />
        <InfoFeedback assertions={ assertions } score={ score } />
        <Link to="/ranking">
          <button
            type="button"
            data-testid="btn-ranking"
          >
            Ver Ranking
          </button>
        </Link>
        <Link to="/">
          <button type="button" data-testid="btn-play-again">Jogar Novamente</button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
