import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const order = [...ranking].sort((a, b) => (b.score - a.score));

    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>

        <Link
          to="/"
          data-testid="btn-go-home"
        >
          Jogar novamente
        </Link>

        <main>
          <ol>
            { order.map((player, index) => (
              <li key={ player.name }>
                <img src={ player.picture } alt="avatar" />
                <div data-testid={ `player-name-${index}` }>{ player.name }</div>
                <div data-testid={ `player-score-${index}` }>{ player.score }</div>
              </li>
            ))}
          </ol>
        </main>
      </main>
    );
  }
}

export default Ranking;
