import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../store/ducks/game';

import LoginForm from '../components/LoginForm';
import SettingsButton from '../components/Buttons/SettingsButton';

import styles from '../styles/pages/Login.module.css';

class Login extends Component {
  render() {
    return (
      <div className={ styles.loginContainer }>
        <LoginForm />
        <SettingsButton />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(GameActions, dispatch);

export default connect(null, mapDispatchToProps)(Login);
