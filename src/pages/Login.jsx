import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import getToken from '../services';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick() {
    this.setState({ shouldRedirect: true });
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
    const { name, email, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/trivia" />;
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
          disabled={ !this.validator() }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid=""
          onClick={ this.handleClick }
        >
          Config
        </button>
      </div>
    );
  }
}

export default Login;
