import React from 'react';
import PropTypes from 'prop-types';

const FeedbackScreenHeader = (props) => {
  const { image, name, score } = props;
  return (
    <header>
      <img src={ image } alt="gravatar" data-testid="header-profile-picture" />
      <p data-testid="header-player-name">{name}</p>
      <p data-testid="header-score">{score}</p>
    </header>
  );
};

FeedbackScreenHeader.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

export default FeedbackScreenHeader;
