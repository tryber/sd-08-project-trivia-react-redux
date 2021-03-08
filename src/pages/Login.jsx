import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import getToken from '../services';
import redirect from '../services/redirect';
import getQuestions from '../services/TrivaAPI';
import { saveUserData, saveQuestions } from '../_redux/action';

import trybeLogo from '../images/trybe_logo.png';
import triviaLogo from '../images/trivia.jpg';
import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleClick(history, path) {
    const { email, name } = this.state;
    const { saveUser, fetchQuestions, category, difficulty, type } = this.props;
    const triviaAPIResponse = await getToken();
    const { token } = triviaAPIResponse;
    const questions = await getQuestions(token, category, difficulty, type);
    const state = { player: { name, assertions: 0, score: 0, gravatarEmail: email } };

    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('state', JSON.stringify(state));

    saveUser({ email, name });
    fetchQuestions(questions);

    redirect(history, path);
  }

  validator() {
    const { email, name } = this.state;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    if (name.length === 0 || email.length === 0) return false;
    return true;
  }

  renderInput(...args) {
    const [testId, name, value, placeholder, handleChange] = args;
    return (
      <input
        type="text"
        data-testid={ `input-${testId}` }
        name={ name }
        value={ value }
        placeholder={ placeholder }
        onChange={ handleChange }
      />
    );
  }

  render() {
    const { history } = this.props;
    const { name, email } = this.state;
    return (
      <div className="container">
        <aside className="aside">
          <p className="p typing-animation">GRUPO 17</p>
          <p className="p typing-animation">Ailson</p>
          <p className="p typing-animation">Eric Massaki</p>
          <p className="p typing-animation">Felipe Belarmino</p>
          <p className="p typing-animation">Tandy</p>
        </aside>
        <div className="box-login">
          <img
            className="logo"
            src={ trybeLogo }
            alt="logo trybe"
          />
          <img src={ triviaLogo } alt="trivia" />
          {this.renderInput('player-name', 'name', name, 'Nome', this.handleChange)}
          {this.renderInput('gravatar-email', 'email', email, 'Email', this.handleChange)}
          <div className="row">
            <button
              type="button"
              data-testid="btn-play"
              name="goToGame"
              disabled={ !this.validator() }
              onClick={ () => this.handleClick(history, '/trivia') }
            >
              Jogar
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              name="goToConfig"
              onClick={ () => redirect(history, '/config') }
            >
              Config
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  category: state.trivia.category,
  difficulty: state.trivia.difficulty,
  type: state.trivia.type,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestions: (questions) => dispatch(saveQuestions(questions)),
  saveUser: (user) => dispatch(saveUserData(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  saveUser: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
