import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      buttonDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.validateBoth = this.validateBoth.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.validateBoth();
    this.setState({
      [name]: value,
    });
  }

  validateBoth() {
    this.setState({
      buttonDisabled: true,
    });
    const { email, name } = this.state;
    if (email.length > 0 && name.length > 0) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  render() {
    const { buttonDisabled, email, name } = this.state;
    const { sendEmail } = this.props;

    return (
      <div>
        <form>
          <label htmlFor="input-player-name">
            Nome
            <input
              type="text"
              name="input-player-name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-gravatar-email">
            E-mail
            <input
              type="text"
              name="input-gravatar-email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
            />
          </label>
          <button
            disabled={ buttonDisabled }
            type="button"
            data-testid="btn-play"
            onClick={ () => {
              sendEmail(email);
            } }
          >
            Jogar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  sendEmail: (value) => dispatch(setEmail(value)),
});

Login.propTypes = {
  sendEmail: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
