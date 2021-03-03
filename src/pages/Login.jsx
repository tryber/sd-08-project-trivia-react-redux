import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      isDisabled: true,
      shouldRedirect: false,
      score: 0,
      assertions: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkEmailAndName = this.checkEmailAndName.bind(this);
    this.requestToken = this.requestToken.bind(this);
  }

  handleChange(event) {
    const {
      target: { name, value },
    } = event;
    this.setState(
      {
        [name]: value,
        isDisabled: true,
      },
      () => this.checkEmailAndName(),
    );
  }

  handleClick() {
    this.requestToken();
    this.setState({
      shouldRedirect: true,
    });
  }

  checkEmailAndName() {
    const minimumNameSize = 1;
    const { email, name } = this.state;
    const re = /.+@[A-z]+[.]com/;
    const isValidEmail = re.test(email);
    const isValidName = name.length > minimumNameSize;
    if (isValidName && isValidEmail) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  requestToken() {
    const { name, email, score, assertions } = this.state;
    const gravatarEmail = md5(email).toString();
    const player = { name, assertions, score, gravatarEmail };
    localStorage.setItem('state', JSON.stringify(player));
    this.setState({ shouldRedirect: false }, async () => {
      await fetch('https://opentdb.com/api_token.php?command=request')
        .then((response) => response.json())
        .then((data) => localStorage.setItem('token', data.token));
    });
  }

  render() {
    const { isDisabled, shouldRedirect } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>NOSSA VEZ</p>
        </header>
        {shouldRedirect ? (
          <Redirect to="/game" />
        ) : (
          <main>
            <form>
              <label htmlFor="name">
                Name:
                <input
                  type="text"
                  name="name"
                  placeholder="Digite seu nick"
                  data-testid="input-player-name"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  data-testid="input-gravatar-email"
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  data-testid="btn-play"
                  disabled={ isDisabled }
                  onClick={ this.handleClick }
                >
                  Jogar
                </button>
                <Link to="/settings">
                  <button
                    type="button"
                    data-testid="btn-settings"
                  >
                    Configurações
                  </button>
                </Link>
              </label>
            </form>
          </main>
        )}
      </div>
    );
  }
}

export default Login;
