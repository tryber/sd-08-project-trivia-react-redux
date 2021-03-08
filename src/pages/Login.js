import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser, getTokenAndSaveToLocalStore } from '../actions';
import TextInputLabel from '../componente/TextInputLable';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.verificaLogin = this.verificaLogin.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick() {
    const { name, email } = this.state;
    const { getUserProps, getTokenAndSaveToLocalStoreProps, history } = this.props;
    await getTokenAndSaveToLocalStoreProps();
    getUserProps(name, email);
    history.push({ pathname: '/game' });
  }

  verificaLogin() {
    const { name, email } = this.state;
    if (name && email) {
      return false;
    }
    return true;
  }

  renderNameInput(name) {
    return (
      <TextInputLabel
        htmlFor="input-player-name"
        labelText="Nome:"
        id="input-player-name"
        name="name"
        type="text"
        value={ name }
        onChange={ this.handleInput }
        dataTestId="input-player-name"
      />
    );
  }

  renderEmailInput(email) {
    return (
      <TextInputLabel
        htmlFor="input-gravatar-email"
        labelText="Email:"
        id="input-gravatar-email"
        name="email"
        type="text"
        value={ email }
        onChange={ this.handleInput }
        dataTestId="input-gravatar-email"
      />
    );
  }

  render() {
    const { name, email } = this.state;

    return (
      <div>
        { this.renderNameInput(name) }
        { this.renderEmailInput(email) }
        <button
          onClick={ this.handleClick }
          type="button"
          data-testid="btn-play"
          disabled={ this.verificaLogin() }
        >
          Jogar
        </button>

        <div>
          <Link
            data-testid="btn-settings"
            to={ {
              pathname: '/configurations',
            } }
          >
            Configurações
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserProps: (name, email) => dispatch(getUser(name, email)),
  getTokenAndSaveToLocalStoreProps: () => dispatch(getTokenAndSaveToLocalStore()),
});

export default connect(null, mapDispatchToProps)(Login);

Login.propTypes = {
  getUserProps: PropTypes.func.isRequired,
  getTokenAndSaveToLocalStoreProps: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
