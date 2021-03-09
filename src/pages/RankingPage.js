import React from 'react';
import ButtonReturnToLogin from '../components/ButtonReturnToLogin';
import { getObj } from '../helpers';

export default class RankingPage extends React.Component {
  constructor() {
    super();
    const allRankings = getObj('ranking');
    this.state = {
      ranking: allRankings,
    };

    this.sortScores = this.sortScores.bind(this);
  }

  sortScores() {
    const { ranking } = this.state;
    ranking.sort((a, b) => b.score - a.score);
    return ranking;
  }

  render() {
    this.sortScores();
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Rankings
        </h1>
        {this.sortScores().map((value, index) => (
          <div key={ index }>
            <p data-testid={ `player-name-${index}` }>{value.name}</p>
            <p data-testid={ `player-score-${index}` }>
              Pontuação:
              {value.score}
            </p>
          </div>
        ))}
        <ButtonReturnToLogin testIdName="btn-go-home" />
      </div>
    );
  }
}
