import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as UserActions } from '../store/ducks/user';
import { Creators as AuthActions } from '../store/ducks/auth';
import { Creators as GameActions } from '../store/ducks/game';

import styles from '../styles/components/LoginForm.module.css';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      user: {
        playerName: '',
        gravatarEmail: '',
      },
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState(({ user }) => ({
      user: {
        ...user,
        [name]: value,
      },
    }));
  }

  async handleButtonClick() {
    const { saveUser, fetchToken, initGame } = this.props;
    const { user } = this.state;
    saveUser(user);
    await fetchToken();
    initGame();
    this.setState({ shouldRedirect: true });
  }

  checkValidity() {
    const { user: { playerName, gravatarEmail } } = this.state;
    return playerName && gravatarEmail;
  }

  render() {
    const { user, shouldRedirect } = this.state;
    const { playerName, gravatarEmail } = user;

    if (shouldRedirect) return <Redirect to="/game" />;

    return (
      <form
        className={ styles.loginForm }
        autoComplete="off"
      >
        <input
          name="playerName"
          value={ playerName }
          type="text"
          data-testid="input-player-name"
          onChange={ this.handleChange }
          placeholder="Nome"
        />
        <input
          name="gravatarEmail"
          value={ gravatarEmail }
          type="text"
          data-testid="input-gravatar-email"
          onChange={ this.handleChange }
          placeholder="Email"
        />
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !this.checkValidity() }
          onClick={ this.handleButtonClick }
        >
          Jogar
        </button>
      </form>
    );
  }
}

LoginForm.propTypes = {
  saveUser: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  initGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  ...UserActions,
  ...AuthActions,
  ...GameActions,
}, dispatch);

export default connect(null, mapDispatchToProps)(LoginForm);
