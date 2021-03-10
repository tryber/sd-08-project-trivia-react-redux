import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const GameScreenHeader = (props) => {
  const { image, name, score } = props;
  return (
    <header>
      <img src={ image } alt="gravatar" data-testid="header-profile-picture" />
      <p data-testid="header-player-name">{name}</p>
      <p data-testid="header-score">{score}</p>
    </header>
  );
};

GameScreenHeader.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  score: state.score,
});

export default connect(mapStateToProps)(GameScreenHeader);
