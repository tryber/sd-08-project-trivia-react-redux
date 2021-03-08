import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/components/RankingPlayerCard.module.css';

class RankingPlayerCard extends Component {
  render() {
    const { player, index } = this.props;
    const { name, picture, score } = player;
    return (
      <div className={ styles.rankingPlayerCard }>
        <img src={ picture } alt={ name } />
        <p
          className={ styles.playerName }
          data-testid={ `player-name-${index}` }
        >
          { name }
        </p>
        <p
          data-testid={ `player-score-${index}` }
          className={ styles.score }
        >
          { score }
        </p>
      </div>
    );
  }
}

RankingPlayerCard.propTypes = {
  player: PropTypes.shape({
    name: PropTypes.string,
    picture: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default RankingPlayerCard;
