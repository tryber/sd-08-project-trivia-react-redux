import React, { Component } from 'react';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { setLocalStorage } from '../services/utils';

class Header extends Component {
  constructor() {
    super();
    this.getGravatar = this.getGravatar.bind(this);
  }

  async componentDidMount() {
    const { playerName: name, gravatarEmail, score, assertions } = this.props;
    await setLocalStorage(name, score, gravatarEmail, assertions);
  }

  getGravatar() {
    const { gravatarEmail } = this.props;
    const imageHash = md5(gravatarEmail);
    return imageHash;
  }

  render() {
    const imageURL = `https://www.gravatar.com/avatar/${this.getGravatar()}`;
    const { playerName, score } = this.props;
    console.log(playerName, score);
    return (
      <div className="header-game">
        <img data-testid="header-profile-picture" src={ imageURL } alt="" />
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
  assertions: PropTypes.number.isRequired,
};
const mapStateToProps = (state) => ({
  playerName: state.player.player.name,
  gravatarEmail: state.player.player.gravatarEmail,
  score: state.player.player.score,
  assertions: state.player.player.correctAnswers,
});
export default connect(mapStateToProps)(Header);
