import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  getStorage() {
    const player = JSON.parse(localStorage.getItem('player'));
    return player;
  }

  render() {
    return (
      <>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${
            md5(this.getStorage().gravatarEmail.toString())} ` }
          alt="Gravatar ProfilePic"
        />
        <span data-testid="header-player-name">
          { this.getStorage().name }
        </span>
        <span data-testid="header-score">
          { this.getStorage().score }
        </span>
      </>
    );
  }
}

export default connect(null, null)(Header);
