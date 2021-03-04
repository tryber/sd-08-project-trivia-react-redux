import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
// import { actionUserEmail } from '../actions/walletActions';

// import './Login.css';

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      isDisable: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
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

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    const { name, email, isDisable } = this.state;

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
              type="submit"
              disabled={ isDisable }
              data-testid="btn-play"
            >
              Jogar
            </button>
          </Link>
        </div>
      </form>
    );
  }
}

// export default Login;
// const mapStateToProps = (state) => ({
//   readEmail: state.user.email,
// });

// const mapDispatchToProps = (dispatch) => ({
//   writeEmail: (email) => dispatch(actionUserEmail(email)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Login);

// Login.propTypes = {
//   writeEmail: PropTypes.func.isRequired,
// };
