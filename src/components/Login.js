import React from 'react';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isNotValid: true,
      email: '',
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validButton = this.validButton.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.validButton());
  }

  validButton() {
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({ isNotValid: false });
    }
  }

  render() {
    const { email, name, isNotValid } = this.state;
    return (
      <form>
        <label htmlFor="email">
          Enter you email
          <input
            type="email"
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
            value={ email }
            required
          />
        </label>
        <label htmlFor="name">
          Enter you Name
          <input
            type="text"
            name="name"
            onChange={ this.handleChange }
            data-testid="input-player-name"
            value={ name }
            required
          />
        </label>
        <button
          type="submit"
          disabled={ isNotValid }
          className="button-jogar"
          data-testid="btn-play"
        >
          PLAY GAME
        </button>
      </form>
    );
  }
}

export default Login;
