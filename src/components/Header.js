import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';

class Header extends Component {
  constructor() {
    super();
    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar() {
    const { gravatarEmail } = this.props;
    const imageHash = md5(gravatarEmail).toString();
    return imageHash;
  }

  render() {
    const imageURL = `https://www.gravatar.com/avatar/${this.getGravatar()}`;
    const { playerName, score } = this.props;
    return (
      <div className="header-game">
        <img data-testid="header-profile-picture" src={ imageURL } alt="Avatar logo" />
        <span data-testid="header-score">{score}</span>
        <span data-testid="header-player-name">{playerName}</span>
      </div>
    );
  }
}
Header.propTypes = {
  gravatarEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  playerName: state.player.player.name,
  gravatarEmail: state.player.player.gravatarEmail,
  score: state.player.player.score,
});
export default connect(mapStateToProps)(Header);
