import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import logo from '../trivia.png';
import '../styles/trivia.css';

import { fetchAPI } from '../redux/actions';

class Trivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  settingsButton() {
    window.location.href = '/config';
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleClick(api) {
    await api();
    await this.playerLocalStorage();
    const { login } = this.props;
    if (login === true) {
      window.location.href = '/jogo';
    }

    return 'erro';
  }

  disabled() {
    const { name, email } = this.state;
    if (name === '' || email === '') {
      return true;
    }

    return false;
  }

  playerLocalStorage() {
    const { name, email } = this.state;
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
  }

  render() {
    const { requestApi } = this.props;
    return (
      <>
        <header className="app-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form id="form-one" className="form-login">
          <p>
            VOCÊ ESTÁ PREPARADO ?
          </p>
          <label htmlFor="input-text" className="input-name">
            <input
              type="text"
              name="name"
              className="input-field"
              placeholder="Name"
              onChange={ this.handleChange }
              data-testid="input-player-name"
            />
          </label>
          <label htmlFor="input-email" className="input-email">
            <input
              type="text"
              name="email"
              className="input-field"
              placeholder="Email"
              onChange={ this.handleChange }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="button"
            className="btn"
            onClick={ () => this.handleClick(requestApi) }
            data-testid="btn-play"
            disabled={ this.disabled() }
          >
            Jogar
          </button>
          <button
            type="button"
            className="btn-field"
            data-testid="btn-settings"
            onClick={ () => this.settingsButton() }
          >
            Configurações
          </button>
          <button type="button" className="btn-field">Comentários</button>
          <button type="button" className="btn-field">Rank</button>
        </form>
      </>
    );
  }
}

Trivia.propTypes = {
  login: propTypes.bool.isRequired,
  requestApi: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login.login,
});

const mapDispacthToProps = (dispacth) => ({
  requestApi: () => dispacth(
    fetchAPI(),
  ),
});
export default connect(mapStateToProps, mapDispacthToProps)(Trivia);
