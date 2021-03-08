import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import getAvatarUrl from '../services/gravatarApi';

import styles from '../styles/components/Header.module.css';

class Header extends Component {
  render() {
    const { playerName, gravatarEmail, score, assertions } = this.props;
    return (
      <header className={ styles.header }>
        <div className={ styles.userInfo }>
          <img
            className={ styles.gravatar }
            src={ getAvatarUrl(gravatarEmail) }
            alt="imagem aleatória"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ `Jogador: ${playerName}`}</p>
        </div>
        <div className={ styles.infos }>
          <p>
            Acertos:&nbsp;
            <span>{ assertions }</span>
          </p>
          <p>
            Pontos:&nbsp;
            <span data-testid="header-score">{ score }</span>
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  playerName: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user, game }) => ({
  playerName: user.playerName,
  gravatarEmail: user.gravatarEmail,
  score: game.score,
  assertions: game.assertions,
});

export default connect(mapStateToProps)(Header);
