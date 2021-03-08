import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
  }

  generateRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    // ranking.sort((a, b) => {
    //   const change = -1;
    //   if (a.name === 'Mais uma pessoa' && b.name === 'Outra pessoa') {
    //     return change;
    //   }
    //   return 1;
    // });

    ranking.sort((a, b) => b.score - a.score);
    // .sort((a, b) => {
    //   if (a.score === b.score) {
    //     return a.name.localeCompare(b.name);
    //   }
    //   return 1;
    // });
    return (
      ranking.map((e, index) => (
        <tr
          key={ index }
          role="row"
        >
          <td role="cell">
            <img src={ e.picture } alt="Gravatar" />
          </td>
          <td role="cell" data-testid={ `player-name-${index}` }>{e.name}</td>
          <td role="cell" data-testid={ `player-score-${index}` }>{e.score}</td>
        </tr>
      ))
    );
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        <h1 className="ranking" data-testid="ranking-title">Ranking</h1>
        <table>
          <tbody>
            <tr>
              <th>Foto</th>
              <th>Jogador</th>
              <th>Pontução</th>
            </tr>
            {this.generateRanking()}
          </tbody>
        </table>
        <button
          data-testid="btn-go-home"
          type="button"
          onClick={ () => this.setState({ redirect: !redirect }) }
        >
          Home
        </button>
      </div>
    );
  }
}

export default Ranking;
