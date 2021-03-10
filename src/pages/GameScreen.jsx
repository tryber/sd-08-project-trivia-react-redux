import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import GameScreenHeader from '../components/GameScreenHeader';
import GameScreenBody from '../components/GameScreenBody';

const GameScreen = (props) => {
  const { email, name } = props;

  const hash = md5(email).toString();
  const src = `https://www.gravatar.com/avatar/${hash}`;

  return (
    <div>
      <GameScreenHeader image={ src } name={ name } />
      <GameScreenBody />
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: state.email,
  name: state.name,
});

GameScreen.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(GameScreen);
