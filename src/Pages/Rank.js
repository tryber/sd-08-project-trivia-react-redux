import React from 'react';

class Rank extends React.Component {
  homeButton() {
    window.location.href = '/';
  }

  render() {
    const rank = JSON.parse(localStorage.getItem('ranking'));
    const rankSort = rank.sort((a, b) => b.score - a.score);
    console.log(rankSort);
    return (
      <>
        <h1 data-testid="ranking-title">Tela do Rank</h1>
        <section>
          { rank.map((player, index) => (
            <div key={ index }>
              <img src={ player.url } alt="gravatar" />
              <p data-testid={ `player-name-${index}` }>{player.name}</p>
              <p data-testid={ `player-score-${index}` }>{player.score}</p>
            </div>
          ))}
        </section>
        <button
          type="button"
          onClick={ () => this.homeButton() }
          data-testid="btn-go-home"
        >
          Home
        </button>
      </>
    );
  }
}

export default Rank;
