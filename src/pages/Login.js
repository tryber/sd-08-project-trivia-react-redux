import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchJogo, userLogin } from '../actions';
import SettingButton from '../components/SettingButton';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
    };
  }

  componentDidMount() {
    localStorage.removeItem('state');
  }

  sendData() {
    const { token, loginInfo } = this.props;

    const { email, name } = this.state;
    token();
    const state = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));

    loginInfo(email, name);
  }

  render() {
    const { email, name } = this.state;

    return (
      <div className="Login">
        <form>
          <label htmlFor="input-nome">
            Nome
            <input
              data-testid="input-player-name"
              type="text"
              id="input-nome"
              value={ name }
              onChange={ (e) => this.setState({ name: e.target.value }) }
              placeholder="nome"
            />
          </label>
          <label htmlFor="input-pass">
            Email
            <input
              data-testid="input-gravatar-email"
              value={ email }
              type="email"
              onChange={ (e) => this.setState({ email: e.target.value }) }
              placeholder="email"
            />
          </label>
        </form>
        <div className="login">
          <Link to="/jogo">
            <button
              data-testid="btn-play"
              type="button"
              onClick={ () => this.sendData() }
              disabled={ !name || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) }
            >
              Jogar
            </button>
          </Link>
        </div>
        <SettingButton />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  loginInfo: (email, name) => dispatch(userLogin(email, name)),
  token: () => dispatch(fetchJogo()),

});

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,

});

Login.propTypes = {
  token: PropTypes.func.isRequired,
  loginInfo: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
