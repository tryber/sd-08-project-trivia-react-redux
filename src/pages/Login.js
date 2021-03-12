import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { playerLogin } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      disabledButton: true,
      shouldRedirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.redirectToGameScreen = this.redirectToGameScreen.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    }, this.enableButton);
  }

  enableButton() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        disabledButton: false,
      });
    } else {
      this.setState({
        disabledButton: true,
      });
    }
  }

  redirectToGameScreen() {
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
    this.setState({
      shouldRedirect: true,
    });
  }

  render() {
    const { disabledButton, email, name, shouldRedirect } = this.state;
    const { player } = this.props;

    if (shouldRedirect) return <Redirect to="/gamescreen" />;

    return (
      <>
        <h1>LOGIN</h1>
        <form>
          <label htmlFor="input-name">
            Nome
            <input
              type="text"
              id="input-name"
              name="name"
              data-testid="input-player-name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-email">
            Email
            <input
              type="text"
              id="input-email"
              name="email"
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              value={ email }
            />
          </label>
          <button
            onClick={ () => { player(name); this.redirectToGameScreen(); } }
            type="button"
            data-testid="btn-play"
            disabled={ disabledButton }
          >
            Jogar
          </button>
          <Link to="/settings">
            <button
              data-testid="btn-settings"
              type="button"
            >
              Configurações
            </button>
          </Link>
        </form>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  player: (name) => dispatch(
    playerLogin(name),
  ),
});

Login.propTypes = {
  player: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
