import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { ButtonConfig, ButtonGoRanking } from '../components';
import { fetchToken as fetchTokenAction } from '../Redux/actions';
import { getObj, setNewObj } from '../helpers';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      redirect: false,
    };
    this.renderInputs = this.renderInputs.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.tokenStorage = this.tokenStorage.bind(this);
    this.playerStorage = this.playerStorage.bind(this);
  }

  checkInputs() {
    const check = new RegExp('[a-zA-Z0-9.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+$', 'gm');
    const { name, email } = this.state;
    return check.test(email) && name.length > 0;
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  playerStorage() {
    const { name, email } = this.state;
    const player = { name, gravatarEmail: email, assertions: '', score: 0 };
    const hash = () => md5(email.trim().toLowerCase());
    const rankingPlayer = { name, score: 0, picture: `https://www.gravatar.com/avatar/${hash}?s=20` };
    setNewObj('state', { player });
    let allPlayers = [];
    allPlayers = getObj('ranking') || [];
    allPlayers.push(rankingPlayer);
    setNewObj('ranking', allPlayers);
    // setNewObj('ranking', [{ name, picture: `https://www.gravatar.com/avatar/${hash}?s=20`, score: '0' }]);
  }

  tokenStorage() {
    const { token } = this.props;
    localStorage.setItem('token', token);
  }

  async handleClick() {
    const { fetchToken } = this.props;
    const { redirect } = this.state;
    await fetchToken();
    this.tokenStorage();
    this.playerStorage();
    this.setState({ redirect: !redirect });
  }

  renderInputs() {
    return (
      <form>
        <label htmlFor="player-name">
          Nome:
          <input
            type="text"
            id="player-name"
            data-testid="input-player-name"
            placeholder="Nome"
            name="name"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <label htmlFor="gravatar-email">
          E-mail:
          <input
            type="text"
            id="gravatar-email"
            data-testid="input-gravatar-email"
            placeholder="E-mail"
            name="email"
            onChange={ (e) => this.handleChange(e) }
          />
        </label>
        <button
          type="button"
          disabled={ !this.checkInputs() }
          data-testid="btn-play"
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <ButtonConfig />
        <ButtonGoRanking />
      </form>
    );
  }

  render() {
    const { redirect } = this.state;
    return (
      <div>
        { redirect ? <Redirect to="/trivia" /> : this.renderInputs() }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.tokenReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  fetchToken: () => dispatch(fetchTokenAction()),
});

Login.propTypes = {
  token: PropTypes.arrayOf(PropTypes.array),
  // token: PropTypes.string,
  fetchToken: PropTypes.func.isRequired,
};

Login.defaultProps = {
  token: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
