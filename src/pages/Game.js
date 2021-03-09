import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import md5 from 'crypto-js/md5';
import { gettingHashEmail } from '../actions';
import GameQuestions from '../components/GameQuestions';
import Loading from '../components/Loading';

import '../styles/Game.css';

class Game extends React.Component {
  componentDidMount() {
    this.cryptoEmail();
  }

  cryptoEmail() {
    const { readInputs, getHashEmail } = this.props;
    const { email } = readInputs;
    const emailHash = md5(email).toString();
    getHashEmail(emailHash);
  }

  render() {
    const { readInputs, score } = this.props;
    const imgGravatar = `https://www.gravatar.com/avatar/${readInputs.hashEmail}`;

    return (
      <div className="container">
        <div className="container-player">
          <div className="header-player">
            <img
              data-testid="header-profile-picture"
              className="gravatar-image"
              src={ imgGravatar }
              alt="gratavar perfil"
            />
            <div data-testid="header-player-name" className="player-name">
              { readInputs.name }
            </div>
            <div data-testid="header-score" className="score-player">
              { score }
            </div>
          </div>
          <div className="body-player">
            { readInputs.isFetching
              ? <Loading />
              : <GameQuestions /> }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  readInputs: state.loginReducer,
  score: state.gameReducer.score,
});
const mapDispatchToProps = (dispatch) => ({
  getHashEmail: (HashEmail) => dispatch(gettingHashEmail(HashEmail)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  readInputs: PropTypes.objectOf(PropTypes.any).isRequired,
  getHashEmail: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
};
