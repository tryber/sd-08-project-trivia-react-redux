import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setLogin } from '../actions/index';
import { fetchQuestions as fetchQuestionsThunk } from '../actions/fetchQuestions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateBoth = this.validateBoth.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.fetchApi = this.fetchApi.bind(this);
    this.redirectSettings = this.redirectSettings.bind(this);
    // this.setLocalStorageState = this.setLocalStorageState.bind(this);
  }

  // setLocalStorageState() {
  //   const { email, name } = this.state;
  //   const { score } = this.props;

  //   const state = {
  //     player: {
  //       email,
  //       name,
  //       score,
  //     },
  //   };

  //   localStorage.setItem('state', JSON.stringify(state));
  // }

  async fetchApi() {
    const { fetchQuestions } = this.props;

    await fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.token));
        fetchQuestions(response.token);
      });

    // this.setLocalStorageState();
  }

  redirectSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  async handleClick(email, name) {
    const { sendLogin, history } = this.props;

    await this.fetchApi();
    // .then((token) => localStorage.setItem('token', token));
    sendLogin(email, name);
    history.push('/game');
    // localStorage.setItem('state', JSON.stringify(playerInfo));
  }

  handleChange(e) {
    console.log(e.target.value);
    const { name, value } = e.target;
    this.validateBoth();
    this.setState({
      [name]: value,
    });
  }

  validateBoth() {
    this.setState({
      buttonDisabled: true,
    });
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  render() {
    const { buttonDisabled, email, name } = this.state;
    const playerInfo = { player: {
      name,
      gravatarEmail: email,
      assertions: 0,
      score: 0,
    } };

    return (
      <div>
        <form>
          <label htmlFor="name">
            Nome
            <input
              type="text"
              name="name"
              id="input-player-name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              type="text"
              name="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ buttonDisabled }
            type="button"
            data-testid="btn-play"
            onClick={ () => {
              this.handleClick(email, name);
              localStorage.setItem('state', JSON.stringify(playerInfo));
            } }
          >
            Jogar
          </button>
        </form>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.redirectSettings }
        >
          Configurações
        </button>
      </div>
    );
  }
}

// const mapStateToProps = ({ score: { score } }) => ({
//   score,
// });

const mapDispatchToProps = (dispatch) => ({
  sendLogin: (email, name) => dispatch(setLogin(email, name)),
  fetchQuestions: (data) => dispatch(fetchQuestionsThunk(data)),
});

Login.propTypes = {
  fetchQuestions: PropTypes.func.isRequired,
  sendLogin: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  // score: PropTypes.number.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
