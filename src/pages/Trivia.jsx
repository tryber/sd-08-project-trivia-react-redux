import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Trivia extends React.Component {
  render() {
    const { userName, email, score } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="profile-avatar"
          data-testid="header-profile-picture"
        />
        <span data-testid="header-player-name">{ userName }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Trivia.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProp = (state) => ({
  userName: state.login.name,
  email: state.login.email,
  score: state.trivia.score,
});

export default connect(mapStateToProp)(Trivia);
