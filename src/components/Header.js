import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  render() {
    const { player } = this.props;
    console.log(player);
    return (
      <>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${
            md5(player.gravatarEmail.toString())} ` }
          alt="Gravatar ProfilePic"
        />
        <span data-testid="header-player-name">
          { player.name }
        </span>
        <span data-testid="header-score">
          { player.score }
        </span>
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  player,
});

Header.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(Header);
