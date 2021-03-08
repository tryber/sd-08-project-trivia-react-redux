import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      verifyFields: true,
      shouldRedirect: false,
    };

    this.saveToLocalStore = this.saveToLocalStore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.verify = this.verify.bind(this);
  }

  componentDidMount() {
    const { assertions, score } = this.state;
    console.log(`${assertions} and ${score}`);
  }

  async saveToLocalStore() {
    const estado = this.state;
    const fetchApi = await fetch('https://opentdb.com/api_token.php?command=request');
    const jsonObj = await fetchApi.json();
    const { token } = jsonObj;

    const objLocalStorage = {
      player: estado,
    };
    objLocalStorage.player.assertions = 0;
    objLocalStorage.player.score = 0;
    const ranking = [];
    const old = JSON.parse(localStorage.getItem('ranking'));
    console.log(`Old Ranking: ${old}`);
    localStorage.setItem('token', token);
    localStorage.setItem('state', JSON.stringify(objLocalStorage));
    if (!old) {
      console.log('Cria Ranking');
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }

    this.setState({ shouldRedirect: true });
  }

  handleChange(e) {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value,
    });

    this.verify();
  }

  verify() {
    const { gravatarEmail, name } = this.state;
    if (gravatarEmail.length > 0 && name.length > 0) {
      this.setState({ verifyFields: false });
      return;
    }
    this.setState({ verifyFields: true });
  }

  render() {
    const { verifyFields, shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/jogo" />;
    return (
      <div>
        <label htmlFor="input-player-name">
          Nome:
          <input
            type="text"
            id="input-player-name"
            data-testid="input-player-name"
            name="name"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="input-gravatar-email">
          Email:
          <input
            type="text"
            data-testid="input-gravatar-email"
            id="input-gravatar-email"
            name="gravatarEmail"
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ verifyFields }
          onClick={ this.saveToLocalStore }
        >
          Jogar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
