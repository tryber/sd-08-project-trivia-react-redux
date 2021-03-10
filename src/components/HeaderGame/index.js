import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';

class HeaderGame extends Component {
  render() {
    const { playerName, playerEmail } = this.props;
    const hashGerada = md5(playerEmail);
    return (
      <header className="header-game">
        <img
          src={ `https://www.gravatar.com/avatar/${hashGerada}` }
          alt="imagem de perfil"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{playerName}</p>
        <p data-testid="header-score">0</p>
      </header>
    );
  }
}

HeaderGame.propTypes = {
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
};

function mapStateToProps({ login }) {
  return {
    playerName: login.name,
    playerEmail: login.email,
  };
}

export default connect(mapStateToProps)(HeaderGame);
