import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';

class TopInfobar extends React.Component {
  render() {
    const { email, playerName, score } = this.props;
    const emailHash = MD5(email).toString();
    return (
      <section className="game-header">
        <div className="userInfoDiv">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${emailHash}` }
            alt="player-img"
          />
          Jogador:
          <span data-testid="header-player-name">{ playerName }</span>
        </div>
        <div className="scoreDiv">
          Pontos:
          <span data-testid="header-score">{score}</span>
        </div>
      </section>
    );
  }
}
TopInfobar.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  playerName: state.login.playerName,
  score: state.update.score,
});
// const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, null)(TopInfobar);
