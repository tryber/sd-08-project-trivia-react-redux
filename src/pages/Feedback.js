// https://stackoverflow.com/questions/51393153/react-routing-redirect-onclick
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../components/Header';
import gravatarAPI from '../services/gravatarAPI';

export default class Feedback extends Component {
  componentDidMount() {
    this.savingRanking();
  }

  savingRanking() {
    console.log('salvando');
    let stateString = '';
    let state = '';
    while (stateString === null || stateString === '' || state === '') {
      stateString = localStorage.getItem('state');
      state = JSON.parse(stateString);
      console.log('1');
    }
    console.log('2');
    let rankingString = 'AnaKarine';
    let ranking = [];
    while (rankingString === 'AnaKarine') {
      rankingString = localStorage.getItem('ranking');
      if (rankingString !== null) {
        ranking = JSON.parse(rankingString);
      }
      console.log('3');
      console.log(ranking);
      console.log(typeof ranking);
    }
    console.log('4');
    ranking.push({ name: state.player.name,
      score: state.player.score,
      picture: gravatarAPI(state.player.email) });
    rankingString = JSON.stringify(ranking);
    localStorage.setItem('ranking', rankingString);
  }

  clearLocalStorage() {
    localStorage.removeItem('state');
    localStorage.removeItem('token');
  }

  render() {
    const stateString = localStorage.getItem('state');
    const state = JSON.parse(stateString);
    const minAssertions = 3;
    const { score } = state.player;
    const { assertions } = state.player;

    // let rankingString = localStorage.getItem('ranking');
    // let ranking = [];
    // ranking = JSON.parse(rankingString);
    // ranking.push({ name: state.player.name,
    //   score: state.player.score,
    //   picture: gravatarAPI(state.player.email) });
    // rankingString = JSON.stringify(ranking);
    // localStorage.setItem('ranking', rankingString);
    // console.log(typeof assertions);
    return (
      <div>
        <h1
          data-testid="feedback-text"
        >
          { assertions >= minAssertions
            ? 'Mandou bem!' : 'Podia ser melhor...'}
        </h1>
        <span data-testid="feedback-total-score">{score}</span>
        <div>
          acertos :
        </div>
        <span data-testid="feedback-total-question">{assertions}</span>
        <Header />
        <NavLink
          to="/"
        >
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ () => this.clearLocalStorage() }
          >
            Jogar novamente
          </button>
        </NavLink>
        <NavLink
          to="/ranking"
        >
          <button
            type="button"
            data-testid="btn-ranking"
            onClick={ () => this.clearLocalStorage() }
          >
            Ver Ranking
          </button>
        </NavLink>
      </div>
    );
  }
}
