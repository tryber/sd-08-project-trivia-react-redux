import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';
import { gravatarAction } from '../../actions';

class GameHeader extends Component {
  getGravatarImg() {
    const { email, gravatar } = this.props;
    const hash = CryptoJS.MD5(email);
    gravatar(`https://www.gravatar.com/avatar/${hash}`);
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header className="game-header">
        <img
          src={ this.getGravatarImg() }
          alt="profile user"
          data-testid="header-profile-picture"
        />
        <h3 data-testid="header-player-name">
          { name }
        </h3>
        <p data-testid="header-score">
          { score }
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.reducerUser.name,
  email: state.reducerUser.email,
  score: state.reducerUser.score,
});

const mapDispatchToProps = (dispatch) => ({
  gravatar: (url) => dispatch(gravatarAction(url)),
});

GameHeader.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  gravatar: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameHeader);
