import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { fetchToken, handleInput, fetchQuestions } from '../redux/actions';

import ConfigButton from './ConfigButton';

class FormsLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    const { fetchTok } = this.props;
    fetchTok();
  }

  componentDidUpdate() {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const { fetchQuest } = this.props;
      console.log(typeof token);
      fetchQuest(token);
    }
  }

  handleClick() {
    const { loaded } = this.state;
    const { name, email } = this.props;
    this.setState({
      loaded: !loaded,
    });
    localStorage.setItem('state',
      JSON.stringify({ player:
        { name,
          assertions: 0,
          score: 0,
          gravatarEmail: email,
        } }));
  }

  render() {
    const { handleInp, name, email } = this.props;
    const { loaded } = this.state;
    if (loaded) {
      console.log(loaded);
      return (<Redirect to="/gamescreen" />);
    }
    return (
      <form>
        <label htmlFor="name">
          NOME
          <input
            value={ name }
            type="text"
            name="name"
            id="name"
            data-testid="input-player-name"
            onChange={ (event) => handleInp('name', event.target.value) }
          />
        </label>
        <label htmlFor="email">
          EMAIL
          <input
            value={ email }
            type="email"
            name="email"
            id="email"
            data-testid="input-gravatar-email"
            onChange={ (event) => handleInp('email', event.target.value) }
          />
        </label>
        <button
          disabled={ !(name.length && email.length > 0) }
          type="button"
          data-testid="btn-play"
          onClick={ () => this.handleClick() }
        >
          {/* {(name.length && email.length > 0)
            ? <Link disabled to="/gamescreen">Jogar</Link> : <p>Jogar</p>} */}
          Jogar
        </button>
        <ConfigButton />
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.email,
  name: state.name,
  token: state.token,
});

const mapDispatchToProps = (dispatch) => ({
  handleInp: (position, input) => dispatch(handleInput(position, input)),
  fetchTok: () => dispatch(fetchToken()),
  fetchQuest: (token) => dispatch(fetchQuestions(token)),
});

FormsLogin.propTypes = {
  handleInp: PropTypes.func,
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(FormsLogin);
