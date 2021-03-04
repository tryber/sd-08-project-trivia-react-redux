import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BtnLogin from '../components/BtnLogin';
import inputLogin from '../components/InputLogin';
import getToken from '../services/apis/getToken';
import { saveName, saveEmail } from '../redux/actions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      userName: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  async handleSubmit() {
    const { saveNamePlayer, saveEmailPlayer } = this.props;
    const { userName, email } = this.state;
    await getToken();
    saveNamePlayer(userName);
    saveEmailPlayer(email);
  }

  render() {
    const { email, userName } = this.state;
    return (
      <>
        <h1>Trivia</h1>
        <form>
          {inputLogin(
            'email',
            'Email do Gravatar:',
            'email',
            'input-player-name',
            this.handleChange,
          )}

          {inputLogin(
            'userName',
            'Nome do Jogador:',
            'userName',
            'input-gravatar-email',
            this.handleChange,
          )}
          <Link to="/game-page">
            {BtnLogin(this.handleSubmit, email, userName)}
          </Link>
          <Link to="/config">
            <button type="button" data-testid="btn-settings">
              Config
            </button>
          </Link>
        </form>
      </>
    );
  }
}
Login.propTypes = {
  saveNamePlayer: propTypes.func.isRequired,
  saveEmailPlayer: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveNamePlayer: (name) => dispatch(saveName(name)),
  saveEmailPlayer: (email) => dispatch(saveEmail(email)),
});
export default connect(null, mapDispatchToProps)(Login);
