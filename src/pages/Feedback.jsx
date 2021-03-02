import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends React.Component {
  render() {
    const { userName, avatar, score } = this.props;
    return (
      <header>
        <img src={ avatar } alt="profile-avatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ userName }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

Feedback.propTypes = {
  userName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProp = (state) => ({
  userName: state.login.name,
  avatar: state.trivia.avatar,
});

export default connect(mapStateToProp)(Feedback);
