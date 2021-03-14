import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actionDatesPlayer, actionTokenPlayer } from '../actions/triviaActions';

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

  async handleClick() {
    const { namePlayer, emailPlayer, scorePlayer } = this.state;
    const { datesPlayer, tokenPlayer } = this.props;
    datesPlayer(namePlayer, emailPlayer, scorePlayer);
    tokenPlayer();
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
  datesPlayer: (
    name, email,
  ) => dispatch(actionDatesPlayer(name, email, 0, 0)),
  tokenPlayer: () => dispatch(actionTokenPlayer()),
});

Login.propTypes = {
  datesPlayer: PropTypes.func.isRequired,
  tokenPlayer: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
