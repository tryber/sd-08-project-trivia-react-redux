import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { getUserToken } from '../helpers';
import newPlayer from '../store/actions/player.actions';
import Settings from '../components/Settings';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      disabled: true,
      redictToGame: false,
      showSettings: false,
    };

    this.openSettings = this.openSettings.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  openSettings() {
    const { showSettings } = this.state;
    this.setState({ showSettings: !showSettings });
  }

  handleChange(e) {
    const { name, email } = this.state;
    const hasUserAndEmail = (name.length > 0 && email.match(/\S+@\S+\.\S+/) !== null);
    this.setState({ [e.target.name]: e.target.value, disabled: !hasUserAndEmail });
  }

  async handleClick() {
    const { setNewPlayer } = this.props;
    const { name, email } = this.state;
    const token = await getUserToken().then((toke) => {
      localStorage.setItem('token', toke);
      return toke;
    });
    setNewPlayer({ name, email, token });
    const player = {
      player: {
        name,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(player));
    this.setState({ redictToGame: true });
  }

  render() {
    const { disabled, redictToGame, showSettings } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>Vamos nessa!</p>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.openSettings }
          >
            settings
          </button>
        </header>
        {showSettings && <Settings openSettings={ this.openSettings } />}
        <main>
          <form>
            <input
              name="name"
              type="text"
              data-testid="input-player-name"
              placeholder="User Name"
              onChange={ this.handleChange }
            />
            <input
              name="email"
              type="email"
              data-testid="input-gravatar-email"
              placeholder="Email"
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="btn-play"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Jogar
            </button>
          </form>
        </main>
        {redictToGame && <Redirect to="/game" />}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setNewPlayer: (newPlayerObj) => dispatch(newPlayer(newPlayerObj)),
  };
}

Login.propTypes = {
  setNewPlayer: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(Login);
