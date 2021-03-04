import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gravatarAPI from '../services/gravatarAPI';
// import './Header.css';

export default class Header extends Component {
  render() {
    const { emailPlayer, scorePlayer = 0 } = this.props;

    return (
      <section>
        <div className="player-info">
          <img
            alt="Player Avatar"
            data-testid="header-profile-picture"
            src={ gravatarAPI(emailPlayer) }
          />
          Nome da pessoa:
          <p data-testid="header-player-name">Nome da pessoa</p>
        </div>
        <div>
          Placar:
          <span data-testid="header-score">{ scorePlayer }</span>
        </div>
      </section>
    );
  }
}

// const mapStateToProps = (state) => ({
//   emailPlayer: state.player.emailPlayer,
//   namePlayer: state.player.namePlayer,
//   scorePlayer: state.player.scorePlayer,
// });

// export default connect(mapStateToProps, null)(Header);

Header.propTypes = {
  emailPlayer: PropTypes.string.isRequired,
  // namePlayer: PropTypes.string.isRequired,
  scorePlayer: PropTypes.number.isRequired,
};
