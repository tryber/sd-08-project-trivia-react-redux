import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ shouldRedirect: true });
  }

  checkValidity() {
    const { email } = this.state;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    return true;
  }

  render() {
    const { shouldRedirect } = this.state;

    if (shouldRedirect) return <Redirect to="/game" />; // É PRECISO DEFINIR A ROTA DO GAME.

    return (
      <div>
        <form
          onSubmit={ this.handleSubmit }
          autoComplete="on"
        >
          <label htmlFor="email">
            E-mail do Gravatar:
            <input
              id="email"
              type="text"
              name="email"
              onChange={ this.handleChange }
            />
          </label>
          Nome do Jogador
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              id="name"
              onChange={ this.handleChange }
            />

          </label>

          <button
            disabled={ !this.checkValidity() }
            type="submit"
          >
            JOGAR!
          </button>
        </form>

      </div>
    );
  }
}
