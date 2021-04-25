import React from 'react';
// import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { addEmail as addEmailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      isDisabled: true,
      email: '',
      name: '',
    };
    this.validateEmailAndname = this.validateEmailAndname.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  validateEmailAndname(email, name) {
    if (email.length < 1 || name.length < 1) {
      this.setState({
        isDisabled: true,
      });
    } else {
      this.setState({
        isDisabled: false,
      });
    }
  }

  handleChange(callback, event) {
    callback();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { email, name, isDisabled } = this.state;
    // const { addEmail } = this.props;
    return (
      <div>
        <div>Login</div>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ (event) => this.handleChange(
              () => this.validateEmailAndname(event.target.value, name), event,
            ) }
          />
        </label>
        <label htmlFor="name">
          Nome:
          <input
            type="name"
            data-testid="input-player-name"
            name="name"
            value={ name }
            onChange={ (event) => this.handleChange(
              () => this.validateEmailAndname(email, event.target.value), event,
            ) }
          />
        </label>
        <Link to="/play">
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isDisabled }
            // onClick={ () => addEmail(email) }
          >
            Jogar
          </button>
        </Link>
      </div>
    );
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   addEmail: (value) => dispatch(addEmailAction(value)),
// });

// Login.propTypes = {
//   addEmail: PropTypes.func.isRequired,
// };

// export default connect(null, mapDispatchToProps)(Login);

export default Login;
