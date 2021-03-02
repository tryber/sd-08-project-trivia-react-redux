import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import getToken from '../services';
import { saveUserData } from '../_redux/action';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      goToGame: false,
      goToConfig: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick({ target }) {
    const { email, name } = this.state;
    const { saveUser } = this.props;
    saveUser({ email, name });
    this.setState({ [target.name]: true });
    if (target.name === 'goToGame') {
      const triviaAPIResponse = await getToken();
      const { token } = triviaAPIResponse;
      localStorage.setItem('token', JSON.stringify(token));
    }
  }

  validator() {
    const { email, name } = this.state;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    if (name.length === 0 || email.length === 0) return false;
    return true;
  }

  render() {
    const { name, email, goToGame, goToConfig } = this.state;
    if (goToGame) return <Redirect to="/trivia" />;
    if (goToConfig) return <Redirect to="/config" />;
    return (
      <div>
        <input
          type="text"
          data-testid="input-player-name"
          name="name"
          value={ name }
          placeholder="Nome"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="email"
          value={ email }
          placeholder="Email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          name="goToGame"
          disabled={ !this.validator() }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          name="goToConfig"
          onClick={ this.handleClick }
        >
          Config
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveUser: (user) => dispatch(saveUserData(user)),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  saveUser: PropTypes.func.isRequired,
};
