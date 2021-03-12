import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getToken from '../services/apis/getToken';
import { saveName } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      userName: '',
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.checkValidity = this.checkValidity.bind(this);
  }

  componentWillUnmount() {
    const ranking = localStorage.getItem('ranking');
    if (ranking === null) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.checkValidity();
  }

  checkValidity() {
    const { userName, email } = this.state;
    if (userName.length > 0 && email.length > 0) {
      this.setState({ isDisabled: false });
    } else if (userName.length === 0 || email.length === 0) {
      this.setState({ isDisabled: true });
    }
  }

  async handleSubmit() {
    const { history } = this.props;
    const { saveNamePlayer } = this.props;
    const { userName } = this.state;
    saveNamePlayer(userName);
    await getToken();
    history.push('/game-page');
  }

  goToPage() {
    const { history } = this.props;
    history.push('./Config');
  }

  render() {
    const { email, userName, isDisabled } = this.state;
    return (
      <div>
        <input
          data-testid="input-gravatar-email"
          type="email"
          value={ email }
          name="email"
          placeholder="Digite seu email..."
          onChange={ this.handleChange }
        />
        <input
          data-testid="input-player-name"
          type="text"
          value={ userName }
          name="userName"
          placeholder="Digite seu nome..."
          onChange={ this.handleChange }
          autoComplete="off"
        />
        <button
          data-testid="btn-play"
          type="button"
          disabled={ isDisabled }
          onClick={ this.handleSubmit }
        >
          Jogar
        </button>
        <Link to="/config">
          <button type="button" data-testid="btn-settings">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.objectOf.isRequired,
  saveNamePlayer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveNamePlayer: (name) => dispatch(saveName(name)),
});
export default connect(null, mapDispatchToProps)(Login);
