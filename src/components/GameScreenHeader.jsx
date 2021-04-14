import React from 'react';
import PropTypes from 'prop-types';

const GameScreenHeader = (props) => {
  const { image, name } = props;
  return (
    <header>
      <img src={ image } alt="gravatar" data-testid="header-profile-picture" />
      <p data-testid="header-player-name">{name}</p>
      <p data-testid="header-score">0</p>
    </header>
  );
};

GameScreenHeader.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default GameScreenHeader;
