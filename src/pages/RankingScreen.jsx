import React from 'react';
import { Link } from 'react-router-dom';

class RankingScreen extends React.Component {
  render() {
    const ranking = JSON.parse(localStorage.setItem('ranking'));
    const rankingOrder = [...ranking].sort(
      (a, b) => b.score - a.score,
    );

    return (
      <div>
        <div>
          { rankingOrder.map((item, index) => (
            <div key={ index }>
              <span>{ item.picture }</span>
              <span data-testid={ `player-name-${index}` }>{ item.name }</span>
              <span data-testid={ `player-score-${index}` }>{ item.score }</span>
            </div>
          )) }
        </div>
        <Link to="/">
          <button type="button" data-testid="btn-go-home">Home</button>
        </Link>
      </div>
    );
  }
}

export default RankingScreen;
