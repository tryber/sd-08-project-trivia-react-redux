import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  onSubmit as onSubmitAction,
  fetchToken as fetchTokenThunk,
  willPlay as willPlayAction,
} from '../../actions';
import icon from '../../images/icon-config.png';
import '../../App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      submit: false,
    };
    this.submitHandler = this.submitHandler.bind(this);
  }

  async submitHandler(event) {
    const { name, email } = this.state;
    const { onSubmit, fetchToken, willPlay } = this.props;
    event.preventDefault();
    onSubmit({ name, email });
    await fetchToken();
    willPlay();
    this.setState({
      submit: true,
    });
  }

  render() {
    const regex = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$');
    const { name, email, submit } = this.state;
    return (
      <>
        <div>Login</div>
        {submit ? <Redirect to="/game" /> : false }
        <form onSubmit={ this.submitHandler }>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            data-testid="input-player-name"
            onChange={ (e) => this.setState({ name: e.target.value }) }
            value={ name }
            required
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            data-testid="input-gravatar-email"
            pattern="[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$"
            onChange={ (e) => this.setState({ email: e.target.value }) }
            value={ email }
            required
          />

          <input
            type="submit"
            disabled={ !(regex.test(email) && name.length > 0) } // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
            data-testid="btn-play"
          />
        </form>
        <Link className="config-icon" data-testid="btn-settings" to="/settings">
          <img src={ icon } alt="configuration icon" />
        </Link>
      </>
    );
  }
}
const mapStateToProps = ({ reducerToken: { id } }) => ({
  id,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (data) => dispatch(onSubmitAction(data)),
  fetchToken: () => dispatch(fetchTokenThunk()),
  willPlay: () => (dispatch(willPlayAction())),
});

Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  willPlay: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
