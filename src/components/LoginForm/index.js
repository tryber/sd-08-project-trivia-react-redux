import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getToken } from '../../services/api';
import { actionUser, actionToken } from '../../redux/actions';

import './styles.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      shouldRedirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name, email } = this.state;
    const { saveNameEmail, saveToken } = this.props;
    saveNameEmail(name, email);
    const token = await getToken();
    saveToken(token);
    localStorage.setItem('token', token);
    this.setState({ shouldRedirect: true });
  }

  checkValidity() {
    const { name, email } = this.state;
    const nameLength = 1;
    if (name.length < nameLength) return false;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) return false;
    // https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    return true;
  }

  savePlayerLocalStorage() {
    const { name, email, score, assertions } = this.props;
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    this.savePlayerLocalStorage();
    const { shouldRedirect } = this.state;
    if (shouldRedirect) return <Redirect to="/game" />;
    return (
      <div className="loginForm">
        <form
          onSubmit={ this.handleSubmit }
          autoComplete="on"
        >
          <input
            data-testid="input-player-name"
            id="name"
            type="text"
            name="name"
            onChange={ this.handleChange }
            placeholder="Player Name"
          />
          <input
            data-testid="input-gravatar-email"
            id="email"
            type="text"
            name="email"
            onChange={ this.handleChange }
            placeholder="Player Email
            "
          />
          <button
            data-testid="btn-play"
            disabled={ !this.checkValidity() }
            type="submit"
          >
            PLAY!
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  saveNameEmail: PropTypes.func.isRequired,
  saveToken: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.score.score,
  assertions: state.score.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  saveNameEmail: (name, email) => dispatch(actionUser(name, email)),
  saveToken: (token) => dispatch(actionToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
