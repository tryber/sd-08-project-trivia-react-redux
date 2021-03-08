import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { user } from '../redux/actions/userAction';
import { getToken, getAnswers } from '../services';
import BtnSet from './BtnSet';

import styles from '../styles/components/FormLogin.module.css';

const FormLogin = (props) => {
  const [token, setToken] = useState(null);
  const [login, setLogin] = useState({
    name: '',
    email: '',
  });

  const { saveUser: saveEmail } = props;

  useEffect(() => {
    getToken().then(setToken);
  }, []);

  async function play() {
    const answers = await getAnswers(token);
    console.log(answers);
  }
  localStorage.setItem('token', token);

  if (!token) return 'Loading';

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  function validateLogin() {
    return !login.name || !login.email;
  }

  return (
    <div className={ styles.formLoginContainer }>
      <header className={ styles.formLoginHeader }>
        <h1>Trivia</h1>
      </header>
      <form className={ styles.formLogin } autoComplete="off">
        <input
          name="name"
          onChange={ handleChange }
          data-testid="input-player-name"
          type="text"
          placeholder="Name"
        />
        <input
          name="email"
          onChange={ handleChange }
          data-testid="input-gravatar-email"
          type="text"
          placeholder="Email"
        />
        <Link to="/jogo">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ validateLogin() }
            onClick={ () => {
              play();
              saveEmail(login.email, login.name);
            } }
          >
            Jogar
          </button>
        </Link>
      </form>
      <BtnSet />
    </div>
  );
};

FormLogin.propTypes = {
  saveUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveUser: (email, name) => dispatch(user(email, name)),
});

export default connect(null, mapDispatchToProps)(FormLogin);
