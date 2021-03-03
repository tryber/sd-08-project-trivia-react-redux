import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import getToken from '../services';
import { saveUserData } from '../_redux/action';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    const { email, name } = this.state;
    const { saveUser } = this.props;
    saveUser({ email, name });
    const triviaAPIResponse = await getToken();
    const { token } = triviaAPIResponse;
    localStorage.setItem('token', JSON.stringify(token));
  }

  validator() {
    const { email, name } = this.state;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    if (name.length === 0 || email.length === 0) return false;
    return true;
  }

  render() {
    const { name, email } = this.state;
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
        <Link to="/trivia">
          <button
            type="button"
            data-testid="btn-play"
            name="goToGame"
            disabled={ !this.validator() }
            onClick={ this.handleClick }
          >
            Jogar
          </button>
        </Link>
        <Link to="/config">
          <button
            type="button"
            data-testid="btn-settings"
            name="goToConfig"
            onClick={ this.handleClick }
          >
            Config
          </button>
        </Link>
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
