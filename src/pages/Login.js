import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../images/trivia.gif';
import { login as loginAction } from '../actions';
import { getToken } from '../services';

// const CryptoJS = require('crypto-js');

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
    this.renderLogin = this.renderLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => this.validButton());
  }

  async handleLogin() {
    const { history } = this.props;
    await getToken();
    history.push('/game');
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  handleRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  validButton() {
    const { email, name } = this.state;
    const { handleLogin } = this.props;
    if (email.length > 0 && name.length > 0) {
      this.setState({ isNotValid: false });
      handleLogin({ email, name });
    }
  }

  localStorageSave() {
    const { score, name, email, assertions } = this.props;

    const player = { player: {
      name,
      assertions,
      score,
      gravatarEmail: email,
    } };

    localStorage.setItem('state', JSON.stringify(player));

    // const md5Converter = () => {
    //   const textMd5 = CryptoJS.MD5(email).toString();
    //   return textMd5;
    // };

    // const playerOnLocalStorage = {
    //   name, score, picture: `https://www.gravatar.com/avatar/${md5Converter()}`,
    // };
    // if (localStorage.getItem('ranking')) {
    //   const ranking = JSON.parse(localStorage.getItem('ranking'));
    //   ranking.push(playerOnLocalStorage);
    //   localStorage.setItem('ranking', JSON.stringify(ranking));
    // } else {
    //   localStorage.setItem('ranking', JSON.stringify([playerOnLocalStorage]));
    // }
  }

  renderLogin() {
    const { email, name, isNotValid } = this.state;
    return (
      <div>
        <img src={ logo } className="App-logo" alt="logo" />
        <form>
          <div className="login-input">
            <label htmlFor="email">
              Enter you email:
              <input
                type="email"
                name="email"
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                value={ email }
                placeholder="exemplo@exemplo.com"
                required
              />
            </label>
          </div>
          <div className="login-input">
            <label htmlFor="name">
              Enter you Name:
              <input
                type="text"
                name="name"
                onChange={ this.handleChange }
                data-testid="input-player-name"
                value={ name }
                placeholder="Barak Obama"
                required
              />
            </label>
          </div>
          <button
            type="button"
            onClick={ () => {
              this.handleLogin();
              this.localStorageSave();
            } }
            disabled={ isNotValid }
            className="button-jogar"
            data-testid="btn-play"
          >
            Jogar
          </button>
        </form>
        <button onClick={ this.handleSettings } data-testid="btn-settings" type="button">
          Configurações
        </button>
        <button onClick={ this.handleRanking } data-testid="btn-ranking" type="button">
          Ranking
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>{this.renderLogin()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.game.score,
  assertions: state.game.assertions,
  email: state.game.email,
  name: state.game.name,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (value) => dispatch(loginAction(value)),
});

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
