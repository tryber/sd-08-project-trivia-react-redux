import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  saveInputValues as saveInputValuesAction,
  getTriviaToken as getTriviaTokenAction,
} from '../actions';

class Login extends React.Component {
  handleChange({ target: { id, value } }) {
    const { saveInputValues } = this.props;
    saveInputValues({ [id]: value });
  }

  handleClick(event) {
    event.preventDefault();
    const { getTriviaToken, history } = this.props;
    getTriviaToken();
    history.push('/game');
  }

  render() {
    const { readInputValues, history } = this.props;
    return (
      <>
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="input-player-name"
              id="name"
              onChange={ this.handleChange.bind(this) }
              type="text"
            />
          </label>
          <label htmlFor="email">
            Email
            <input
              data-testid="input-gravatar-email"
              id="email"
              onChange={ this.handleChange.bind(this) }
              type="text"
            />
          </label>
          <button
            disabled={ Object.keys(readInputValues).length !== 2 }
            data-testid="btn-play"
            onClick={ this.handleClick.bind(this) }
            type="submit"
          >
            Jogar
          </button>
        </form>
        <button
          data-testid="btn-settings"
          onClick={ () => history.push('/configurations') }
          type="button"
        >
          Configurações
        </button>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  readInputValues: state.loginReducer,
});

const mapDispatchToProps = (dispatch) => ({
  saveInputValues: (payload) => (dispatch(saveInputValuesAction(payload))),
  getTriviaToken: () => (dispatch(getTriviaTokenAction())),
});

Login.propTypes = {
  readInputValues: PropTypes.objectOf(PropTypes.any).isRequired,
  saveInputValues: PropTypes.func.isRequired,
  getTriviaToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
