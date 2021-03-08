import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getToken from '../actions/getToken';
import { setUserAndEmail } from '../actions/setUserAndEmail';
import createPlayerAction from '../actions/createPlayerAction';
import { zeraScore } from '../actions/scoreAction';
import '../styles/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      email: '',
    };

    this.buttonValidate = this.buttonValidate.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.subbmitUser = this.subbmitUser.bind(this);
  }

  componentDidMount() {
    const { zeraScoreAction } = this.props;
    zeraScoreAction();
  }

  buttonValidate() {
    const { email, nome } = this.state;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return true;
    if (nome.length === 0) return true;
    return false;
  }

  handlechange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async subbmitUser() {
    const { history, getTokenProp, sendNameAndEmail, createPlayer } = this.props;
    const { nome, email } = this.state;
    await getTokenProp();

    const { token } = this.props;
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('state', JSON.stringify({
      player: {
        name: nome,
        assertions: 0,
        gravatarEmail: email,
        score: 0,
      },
    }));
    sendNameAndEmail({ name: nome, email });
    createPlayer({ player: { name: nome, email, assertions: 0, score: 0 } });
    history.push('/jogar');
  }

  render() {
    const { history } = this.props;
    return (
      <div className="login-body">
        <form className="login">
          <input
            data-testid="input-player-name"
            onChange={ this.handlechange }
            name="nome"
            type="text"
          />
          <input
            data-testid="input-gravatar-email"
            onChange={ this.handlechange }
            name="email"
            type="text"
          />
          <button
            className="button-jogar"
            data-testid="btn-play"
            type="button"
            disabled={ this.buttonValidate() }
            onClick={ this.subbmitUser }
          >
            Jogar
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ () => history.push('/config') }
          >
            Config
          </button>
        </form>

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  token: PropTypes.string.isRequired,
  getTokenProp: PropTypes.func.isRequired,
  sendNameAndEmail: PropTypes.func.isRequired,
  createPlayer: PropTypes.func.isRequired,
  zeraScoreAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getTokenProp: () => dispatch(getToken()),
  sendNameAndEmail: (value) => dispatch(setUserAndEmail(value)),
  createPlayer: (value) => dispatch(createPlayerAction(value)),
  zeraScoreAction: () => dispatch(zeraScore()),
});
const mapStateToProps = (state) => ({
  token: state.getTokenReducer.token,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
