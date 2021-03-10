import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.css';

class HeaderFeedback extends Component {
  constructor(props) {
    super(props);
    this.getNameStorage = this.getNameStorage.bind(this);
  }

  getNameStorage() {
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    const { player: { name } } = playerInfo;
    return name;
  }

  render() {
    const { playerEmail, callback } = this.props;
    const hashGerada = md5(playerEmail);
    return (
      <header className="header-feedback">
        <img
          src={ `https://www.gravatar.com/avatar/${hashGerada}` }
          alt="imagem de perfil"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{this.getNameStorage()}</p>
        <p data-testid="header-score">{callback()}</p>
      </header>
    );
  }
}

HeaderFeedback.propTypes = {
  playerEmail: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

function mapStateToProps({ login }) {
  return {
    playerName: login.name,
    playerEmail: login.email,
  };
}

export default connect(mapStateToProps)(HeaderFeedback);
