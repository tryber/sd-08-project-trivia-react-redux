import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { getToken } from '../services/questionsAPI';
// import { actionUserEmail } from '../actions/walletActions';

// import './Login.css';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  /* handleSubmit(event) {
    event.preventDefault();
  } */

  async handleClick() {
    const { token } = await getToken();
    localStorage.setItem('token', token);
  }

  validate() {
    const { name, email } = this.state;
    console.log(this.state);
    if (name.length > 0 && email.length > 0) {
      this.setState({ isDisable: false });
    } else {
      this.setState({ isDisable: true });
    }
  }

  render() {
    const { name, email, isDisable } = this.state;
    const token = localStorage.getItem('token');
    if (token) return <Redirect to="/questions" />;

    return (
      <form className="form-login" onSubmit={ this.handleSubmit }>
        <div className="login-pass">Login</div>
        <div className="login-pass">
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            onKeyUp={ this.validate }
            placeholder="Digite seu nome"
            data-testid="input-player-name"
          />
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            onKeyUp={ this.validate }
            placeholder="alguem@email.com"
            data-testid="input-gravatar-email"
          />
        </div>
        <div>
          <Link to="/questions">
            <button
              type="button"
              disabled={ isDisable }
              data-testid="btn-play"
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </Link>
        </div>
        <div>
          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configurações
            </button>
          </Link>
        </div>
      </form>
    );
  }
}

/* const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
   writeEmail: (email) => dispatch(actionUserEmail(email)),
});

Login.propTypes = {
  // writeEmail: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}; */

export default Login;
