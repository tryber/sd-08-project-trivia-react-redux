import React, { Component } from 'react';

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

  handleChange() {

  }

  handleClick() {

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
          placeholder="Email"
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Começar
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
