import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Link } from 'react-router-dom';

class RankingPage extends Component {
  constructor() {
    super();
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    this.state = {
      ranking,
    };
    this.setTableRanking = this.setTableRanking.bind(this);
  }

  setTableRanking(players) {
    return (
      <table>
        <tbody>
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => (
              <tr key={ index }>
                <th>
                  <img
                    src={ `https://www.gravatar.com/avatar/${md5(
                      player.gravatarEmail,
                    )}` }
                    alt={ player.name }
                  />
                </th>
                <th data-testid={ `player-name-${index}` }>{player.name}</th>
                Score:
                <th data-testid={ `player-score-${index}` }>{player.score}</th>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {this.setTableRanking(ranking)}
        <Link to="/">
          <button data-testid="btn-go-home" type="button">
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

export default RankingPage;
