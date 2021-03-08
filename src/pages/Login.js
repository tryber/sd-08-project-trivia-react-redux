import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchToken, loginAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      player: '',
      email: '',
      buttonDisable: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.verification = this.verification.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.verification());
  }

  async handleClick(e) {
    const { tokenRequest, login } = this.props;
    const { email, player } = this.state;
    login(player, email);
    e.target.innerHTML = 'Aguarde...';
    localStorage.setItem('state', JSON.stringify({
      player: {
        name: player,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    }));
    await tokenRequest();
  }

  verification() {
    const { email, player } = this.state;
    const EMAIL_REGEX = /\S+@\S+\.\S+/;
    const PLAYER_MINIMUM_LENGTH = 3;
    const loginValidation = player.length >= PLAYER_MINIMUM_LENGTH
    && EMAIL_REGEX.test(email);

    this.setState({
      buttonDisable: !loginValidation,
    });
  }

  render() {
    const { player, email, buttonDisable } = this.state;
    const { redirect } = this.props;

    if (redirect) {
      return (
        <Redirect to="/game" />
      );
    }

    return (
      <div className="login-container">
        <h1>Hello Trivia!</h1>
        <input
          data-testid="input-player-name"
          type="text"
          name="player"
          placeholder="Player name"
          value={ player }
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          name="email"
          placeholder="Email"
          value={ email }
          onChange={ this.handleChange }
        />

        <button
          data-testid="btn-play"
          type="button"
          className="login-button"
          disabled={ buttonDisable }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <Link to="/settings" data-testid="btn-settings">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Gear_icon.png"
            alt="settings-icon"
            className="settings-icon"
          />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  redirect: state.trivia.hasToken,
});

const mapDispatchToProps = (dispatch) => ({
  tokenRequest: () => dispatch(fetchToken()),
  login: (name, email) => (dispatch(loginAction(name, email))),
});

Login.propTypes = {
  tokenRequest: PropTypes.func.isRequired,
  redirect: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
