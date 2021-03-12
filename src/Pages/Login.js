import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { addName } from '../actions';
import { addImage } from '../actions/gravatar';
import { fetchQuestions } from '../actions/trivia';
import requestToken from '../services/Api';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      disabledButton: true,
      gravatar: '',
    };
    this.validation = this.validation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.gravatarCode = this.gravatarCode.bind(this);
  }

  handleChange({ id, value }) {
    this.setState({
      [id]: value,
    }, this.validation());
  }

  validation() {
    const { name, email } = this.state;
    const reGex = /\S+@\S+\.\S+/;
    if (name !== '' && reGex.test(email)) {
      this.setState({
        disabledButton: false,
      });
    }
  }

  gravatarCode() {
    const { email } = this.state;
    const code = md5(email).toString();
    this.setState({
      gravatar: code,
    });
  }

  render() {
    const { disabledButton, name, gravatar } = this.state;
    const { history, sendName, saveAvatar, fetch } = this.props;
    const playerData = { player: {
      name,
      gravatarEmail: gravatar,
      assertions: 0,
      score: 0,
    } };
    return (
      <div className="login-image">
        <fieldset className="login-box">
          <label htmlFor="nome">
            Nome:
            <input
              onChange={ (e) => this.handleChange(e.target) }
              id="name"
              data-testid="input-player-name"
              type="text"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              onChange={ (e) => { this.handleChange(e.target); this.gravatarCode(); } }
              id="email"
              data-testid="input-gravatar-email"
              type="email"
            />
          </label>
          <button
            disabled={ disabledButton }
            data-testid="btn-play"
            type="button"
            onClick={ async () => {
              saveAvatar(gravatar);
              await requestToken();
              await fetch();
              sendName(name);
              history.push('/questions');
              localStorage.setItem('state', JSON.stringify(playerData));
            } }
          >
            Jogar

          </button>
          <button
            data-testid="btn-settings"
            type="button"
            onClick={ () => history.push('/settings') }
          >
            Settings

          </button>
        </fieldset>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendName: (value) => dispatch(addName(value)),
  saveAvatar: (url) => dispatch(addImage(url)),
  fetch: (value) => dispatch(fetchQuestions(value)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  sendName: PropTypes.func.isRequired,
  saveAvatar: PropTypes.func.isRequired,
  fetch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
