import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
  constructor() {
    super();
    this.handleInput = this.handleInput.bind(this);
    this.validar = this.validar.bind(this);
    this.getToken = this.getToken.bind(this);
    this.setToken = this.setToken.bind(this);
    this.APIQuestions = this.APIQuestions.bind(this);
    this.getQuestionsAndAnswers = this.getQuestionsAndAnswers.bind(this);
    this.logado = this.logado.bind(this);
    this.state = {
      userr: {
        questions: [],
        name: '',
        email: '',
      },
      redirect: false };
  }

  async getToken() {
    const endpoint = 'https://opentdb.com/api_token.php?command=request';
    const request = await fetch(endpoint);
    const json = await request.json();
    return json.token;
  }

  async setToken() {
    const tokenn = await this.getToken();
    localStorage.setItem('token', tokenn);
    const obj = { player: { name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '' } };
    const player = JSON.stringify(obj);
    localStorage.setItem('state', player);
  }

  async getQuestionsAndAnswers() {
    const { userr } = this.state;
    const json = await this.APIQuestions();
    console.log(json, 'json');
    const questions = [];
    for (let i = 0; i < json.length; i += 1) {
      questions.push(json[i].question);
    }
    const categories = [];
    for (let i = 0; i < json.length; i += 1) {
      categories.push(json[i].category);
    }
    const correctsAnswers = [];
    for (let i = 0; i < json.length; i += 1) {
      correctsAnswers.push(json[i].correct_answer);
    }
    const wrongAnswers = [];
    for (let i = 0; i < json.length; i += 1) {
      wrongAnswers.push(json[i].incorrect_answers);
    }
    const difficulty = [];
    for (let i = 0; i < json.length; i += 1) {
      difficulty.push(json[i].difficulty);
    }
    this.setState({ userr: { ...userr,
      categories,
      questions,
      correctsAnswers,
      wrongAnswers,
      difficulty,
    } });
    this.logado();
  }

  handleInput(event) {
    const { name, value } = event.target;
    const { userr } = this.state;
    this.setState({ userr: { ...userr,
      [name]: value,
    } });
  }

  logado() {
    const { userr } = this.state;
    const { login } = this.props;
    login(userr);
    this.setState({ redirect: true });
  }

  async APIQuestions() {
    try {
      const tokeen = localStorage.getItem('token');
      const endpoint = `https://opentdb.com/api.php?amount=5&token=${tokeen}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  validar() {
    const { userr } = this.state;
    return userr.name && userr.email;
  }

  render() {
    const { userr, redirect } = this.state;
    return (redirect
      ? <Redirect to="./game" />

      : (
        <div className="login">
          <main className="main">
            <div className="form">
              <input
                className="input text"
                type="name"
                name="name"
                placeholder="Name"
                data-testid="input-player-name"
                value={ userr.name }
                onChange={ this.handleInput }
              />
              <input
                className="input text"
                type="text"
                name="email"
                placeholder="Email"
                data-testid="input-gravatar-email"
                value={ userr.email }
                onChange={ this.handleInput }

              />

              <button
                className="input"
                type="button"
                disabled={ !this.validar() }
                data-testid="btn-play"
                onClick={ async () => {
                  await this.setToken();
                  this.getQuestionsAndAnswers();
                } }

              >
                Play
              </button>

              <Link to="./settings" data-testid="btn-settings" className="engrenagem">
                <div className="engrenagem" />
              </Link>
            </div>
          </main>
        </div>)
    );
  }
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch({ type: 'LOGIN', user }),
});

export default connect(null, mapDispatchToProps)(Login);
