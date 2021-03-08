import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Config from './Config';
import { fetchToken, getQuestions, saveLoginInfo } from '../redux/actions';
import './css/Login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleConfig = this.toggleConfig.bind(this);
    this.state = {
      email: '',
      playerName: '',
      disableBtn: true,
      showConfig: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(() => ({ [name]: value }), () => {
      this.verifyInputs();
    });
  }

  verifyInputs() {
    const { email, playerName } = this.state;
    if (email !== '' && playerName !== '') {
      this.setState(() => ({ disableBtn: false }));
    } else {
      this.setState(() => ({ disableBtn: true }));
    }
  }

  handleClick() {
    const { loginAction, fetchTokenAction, config, getQuestionsAction } = this.props;
    const { email, playerName } = this.state;
    loginAction({ email, playerName });
    fetchTokenAction().then(
      (res) => {
        localStorage.setItem('token', res.payload);
        getQuestionsAction(config, res.payload);
      },
    );
  }

  toggleConfig() {
    this.setState((old) => ({
      showConfig: !old.showConfig,
    }));
  }

  renderLoginInputs() {
    const { history } = this.props;
    const { email, playerName, disableBtn } = this.state;
    return (
      <>
        <label htmlFor="email">
          Email do Gravatar:
          <input
            type="text"
            id="email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <label htmlFor="playerName">
          Nome do Jogador:
          <input
            type="text"
            id="playerName"
            name="playerName"
            value={ playerName }
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <button
          className="loginButtons cool"
          disabled={ disableBtn }
          type="button"
          onClick={ async () => {
            await this.handleClick();
            history.push('/game');
          } }
          data-testid="btn-play"
        >
          JOGAR!
        </button>
        <button
          className="loginButtons cool"
          type="button"
          onClick={ this.toggleConfig }
          data-testid="btn-settings"
        >
          CONFIG
        </button>
      </>
    );
  }

  render() {
    const { showConfig } = this.state;
    return (
      <section className="loginSection">
        { showConfig ? <Config show={ this.toggleConfig } />
          : this.renderLoginInputs() }

      </section>
    );
  }
}
Login.propTypes = {
  loginAction: PropTypes.func.isRequired,
  fetchTokenAction: PropTypes.func.isRequired,
  getQuestionsAction: PropTypes.func.isRequired,
  config: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  config: state.config,
});

const mapDispatchToProps = (dispatch) => ({
  loginAction: (obj) => dispatch(saveLoginInfo(obj)),
  fetchTokenAction: () => dispatch(fetchToken()),
  getQuestionsAction: (obj, token) => dispatch(getQuestions(obj, token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
