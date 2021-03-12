import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
    };

    this.shouldRedirect = this.shouldRedirect.bind(this);
  }

  shouldRedirect() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    const rankingList = JSON.parse(localStorage.getItem('ranking'));
    const orderedRanking = rankingList.sort((a, b) => b.score - a.score);
    if (redirect) return <Redirect to="/" />;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {
            orderedRanking.map((player, index) => (
              <li key={ player.index }>
                <h3 data-testid={ `player-name-${index}` }>{player.name}</h3>
                <span data-testid={ `player-score-${index}` }>{player.score}</span>
              </li>))
          }
        </ul>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.shouldRedirect }
        >
          Voltar para o início!
        </button>
      </>
    );
  }
}

export default connect(null, null)(Ranking);
