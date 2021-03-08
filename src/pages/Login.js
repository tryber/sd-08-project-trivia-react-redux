import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getStartTheGame } from '../redux/actions';
import logoImage from '../trivia.png';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nickname: '',
      isValidated: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(
      (state) => ({
        ...state,
        [name]: value,
      }),
      () => this.validateFields(),
    );
  }

  validateFields() {
    const { email, nickname } = this.state;
    const regex = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const nicknameLengthMin = 1;
    const checkedEmail = regex.test(email);
    const checkedNickname = nickname.length >= nicknameLengthMin;

    if (checkedEmail && checkedNickname) {
      return this.setState((state) => ({
        ...state,
        isValidated: false,
      }));
    }
    this.setState((state) => ({
      ...state,
      isValidated: true,
    }));
  }

  render() {
    const { email, nickname, isValidated } = this.state;
    const { isGameStarted, startTheGame } = this.props;
    if (isGameStarted) return <Redirect to="/game" />;
    return (
      <div className="loginContainer">
        <img src={ logoImage } alt="logo" width="150px" />
        <input
          type="text"
          data-testid="input-player-name"
          name="nickname"
          id="id-nickname"
          value={ nickname }
          placeholder="nick"
          onChange={ this.handleChange }
        />
        <input
          type="text"
          data-testid="input-gravatar-email"
          name="email"
          id="id-email"
          value={ email }
          placeholder="email"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="btn-play"
          onClick={ () => startTheGame({ nickname, email }) }
          disabled={ !!isValidated }
        >
          Jogar
        </button>
        <Link
          data-testid="btn-settings"
          to="/settings"
        >
          Configurações
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ login: { isGameStarted } }) => ({
  isGameStarted,
});

const mapDispatchToProps = (dispatch) => ({
  startTheGame: bindActionCreators(getStartTheGame, dispatch),
});

Login.propTypes = {
  isGameStarted: PropTypes.bool,
  startTheGame: PropTypes.func,
};

Login.defaultProps = {
  isGameStarted: false,
  startTheGame: () => console.log('Failed!'),
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
