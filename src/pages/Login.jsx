import React from 'react';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import * as player from '../core/player';
import * as ranking from '../core/ranking';
=======
import { requestToken } from '../services';
>>>>>>> origin/main-group-20

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSettingsChange = this.handleSettingsChange.bind(this);
  }

<<<<<<< HEAD
=======
  componentDidMount() {
    // const token = await requestToken();
  }

>>>>>>> origin/main-group-20
  handleSettingsChange() {
    const { history } = this.props;
    history.push('/settings');
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleClick() {
    const { history } = this.props;
    const { name, email } = this.state;
<<<<<<< HEAD
    ranking.loadRanking();
    await player.login({ name, email });
=======
    const tokenCode = await requestToken();
    localStorage.setItem('token', tokenCode);
    console.log(tokenCode);
    localStorage.setItem('state', JSON.stringify(
      { player: { name, assertions: 0, score: 0, gravatarEmail: email } },
    ));
>>>>>>> origin/main-group-20
    history.push('/game');
  }

  render() {
    const { name, email } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome:
          <input
            data-testid="input-player-name"
            name="name"
            type="text"
            value={ name }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            data-testid="input-gravatar-email"
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleChange }
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          disabled={ !email.length || !name.length }
          onClick={ this.handleClick }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ this.handleSettingsChange }
        >
          Settings
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
