import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getToken } from '../services/questionsAPI';
import { actionTokenUser } from '../actions/triviaActions';

// import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      namePlayer: '',
      emailPlayer: '',
      redirectQuestions: false,
      redirectSettings: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.buttonSettings = this.buttonSettings.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  //   https://github.com/tryber/sd-08-project-trivia-react-redux/#observações-técnicas
  //   player: {
  //     name,
  //     assertions,
  //     score,
  //     gravatarEmail
  // }
  // A chave token deve conter o valor do token recebido na API do Trivia.
  async handleClick(name, email) {
    const { tokenUser } = this.props;
    tokenUser(name, email);
    const { token } = await getToken();
    const state = { player: { name, assertions: 0, score: 0, gravatarEmail: email } };
    const stateString = JSON.stringify(state);
    localStorage.setItem('token', token);
    localStorage.setItem('state', stateString);
    this.setState({
      redirectQuestions: true,
    });
  }

  buttonSettings() {
    this.setState({ redirectSettings: true });
  }

  render() {
    const { namePlayer, emailPlayer, redirectQuestions, redirectSettings } = this.state;

    return (
      <form className="form-login" onSubmit={ this.handleSubmit }>
        <div className="login-pass">Login</div>
        <div className="login-pass">
          <input
            type="text"
            name="namePlayer"
            value={ namePlayer }
            onChange={ this.handleChange }
            onKeyUp={ this.validate }
            placeholder="Digite seu nome"
            data-testid="input-player-name"
          />
          <input
            type="text"
            name="emailPlayer"
            value={ emailPlayer }
            onChange={ this.handleChange }
            onKeyUp={ this.validate }
            placeholder="alguem@email.com"
            data-testid="input-gravatar-email"
          />
        </div>
        <div>
          <button
            type="button"
            data-testid="btn-play"
            onClick={ () => this.handleClick(namePlayer, emailPlayer) }
            disabled={ namePlayer.length === 0 || emailPlayer.length === 0 }
          >
            Jogar
          </button>
          {(redirectQuestions) && <Redirect to="/questions" />}
        </div>
        <div>

          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => this.buttonSettings() }
          >
            Configurações
          </button>
          {(redirectSettings) && <Redirect to="/settings" />}
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  tokenUser: (name, email) => dispatch(actionTokenUser(name, email)),
});

Login.propTypes = {
  tokenUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
