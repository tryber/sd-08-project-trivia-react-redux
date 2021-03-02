import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { getGravatar } from '../_redux/action';

class Trivia extends React.Component {
  componentDidMount() {
    const { getAvatar, email } = this.props;
    const hash = md5(email);
    console.log(hash);
    getAvatar(hash);
  }

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

Trivia.propTypes = {
  userName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  getAvatar: PropTypes.func.isRequired,
};

const mapStateToProp = (state) => ({
  userName: state.login.name,
  email: state.login.email,
  score: state.trivia.score,
  avatar: state.trivia.avatar,
});

const mapDispatchToProps = (dispatch) => ({
  getAvatar: (hash) => dispatch(getGravatar(hash)),
});

export default connect(mapStateToProp, mapDispatchToProps)(Trivia);
