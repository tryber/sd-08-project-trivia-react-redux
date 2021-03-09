import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js';
import PropTypes from 'prop-types';

class Header extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     currentState: {},
  //   };
  // }

  // componentDidMount() {
  //   this.handleUpdateLocalStorage();
  // }

  getGravatarHash() {
    const { email } = this.props;

    return md5(email).toString();
  }

  // handleUpdateLocalStorage() {
  //   const { name, email } = this.props;

  //   const state = JSON.parse(localStorage.getItem('state'));

  //   const updatedState = {
  //     ...state,
  //     player: {
  //       name,
  //       gravatarEmail: email,
  //       score: state.player.score,
  //     },
  //   };

  //   this.setState({
  //     currentState: updatedState,
  //   });
  // }

  render() {
    const { name, score } = this.props;
    // const { name, score } = currentState.player;

    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${this.getGravatarHash}` } alt="Gravatar" data-testid="header-profile-picture" />

        <p data-testid="header-player-name">{name}</p>

        <span data-testid="header-score">{score}</span>
      </header>
    );
  }
}

const mapStateToProps = ({ login: { name, email } }) => ({
  name,
  email,
  // score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
