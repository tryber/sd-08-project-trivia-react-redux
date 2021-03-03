import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

  async handleClick() {
    const { tokenRequest } = this.props;
    await tokenRequest();
    const { token, login } = this.props;
    localStorage.setItem('token', token);

    const { email, player } = this.state;
    login(player, email);
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
        <Link to="/game">
          <button
            data-testid="btn-play"
            type="button"
            className="login-button"
            disabled={ buttonDisable }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.triviaAPI.token.token,
});

const mapDispatchToProps = (dispatch) => ({
  tokenRequest: () => dispatch(fetchToken()),
  // APIRequest: (token) => dispatch(fetchAPI(token)),
  login: (name, email) => (dispatch(loginAction(name, email))),
});

Login.propTypes = {
  tokenRequest: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  token: PropTypes.string,
};

Login.defaultProps = {
  token: 'token',
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
