import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();

    this.getPlayers = this.getPlayers.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  getPlayers() {
    if (localStorage.getItem('ranking')) {
      const players = JSON.parse(localStorage.getItem('ranking'));

      return players;
    }

    return [];
  }

  handleLogin() {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const players = this.getPlayers();
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            { players.length
              ? players.map((player, index) => (
                <tr key={ index }>
                  <td data-testid={ `player-name-${index}` }>
                    <image style={ { width: 30, height: 30, display: 'inline' } } is=" " src="https://www.gravatar.com/avatar/253c30a4238838dd2419c6e3cfb316d9" />
                    { player.name }
                  </td>
                  <td data-testid={ `player-score-${index}` }>{ player.score }</td>
                </tr>
              ))
              : (
                <tr>
                  <td>
                    Opa, ninguém por aqui ainda! Que tal inaugurar? :)
                  </td>
                </tr>
              )}
          </tbody>
        </table>
        <button onClick={ this.handleLogin } data-testid="btn-go-home" type="button">
          Home
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.game.score,
  assertions: state.game.assertions,
  email: state.game.email,
  name: state.game.name,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Ranking);
