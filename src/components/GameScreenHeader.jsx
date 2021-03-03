import React from 'react';

function GameScreenHeader({ image, name }) {
  return (
    <header>
      <p data-testid="header-player-name">{name}</p>
      <p data-testid="header-score">0</p>
      <img src={ image } alt="usuario-img" data-testid="header-profile-picture" />
    </header>
  );
}

GameScreenHeader.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
}.siRequired;

export default GameScreenHeader;
