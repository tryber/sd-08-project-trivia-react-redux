import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../store/ducks/game';
import { Creators as TimerActions } from '../store/ducks/timer';
import { Creators as RankingActions } from '../store/ducks/ranking';
import getGravatarURL from '../services/gravatarApi';

import Header from '../components/Header';
import TriviaQuestion from '../components/TriviaQuestion';

import styles from '../styles/pages/Game.module.css';

class Game extends Component {
  constructor(props) {
    super(props);

    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    const { fetchQuestions } = this.props;
    fetchQuestions();
  }

  handleNextQuestion() {
    const { nextQuestion, resetTimer } = this.props;
    nextQuestion();
    resetTimer();
  }

  endGame() {
    const { addPlayer, playerName, gravatarEmail, score } = this.props;

    addPlayer({
      score,
      name: playerName,
      picture: getGravatarURL(gravatarEmail),
    });

    return <Redirect to="/feedback" />;
  }

  render() {
    const { currentQuestionIndex, isRevealed,
      isTimedOut: istimedout, isEndGame, token } = this.props;

    if (isEndGame) return this.endGame();

    if (!token) return <Redirect to="/" />;

    return (
      <>
        <Header />
        <div className={ styles.game }>
          <TriviaQuestion key={ currentQuestionIndex } />
          <button
            data-testid="btn-next"
            style={ { display: `${isRevealed || istimedout ? 'unset' : 'none'}` } }
            type="button"
            onClick={ this.handleNextQuestion }
            className={ styles.buttonNext }
          >
            Próxima
          </button>
        </div>
      </>
    );
  }
}

Game.propTypes = {
  currentQuestionIndex: PropTypes.number.isRequired,
  fetchQuestions: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  isRevealed: PropTypes.bool.isRequired,
  isTimedOut: PropTypes.bool.isRequired,
  isEndGame: PropTypes.bool.isRequired,
  addPlayer: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game, timer, auth, user }) => ({
  currentQuestionIndex: game.currentQuestionIndex,
  isRevealed: game.isRevealed,
  isTimedOut: timer.isTimedOut,
  isEndGame: game.isEndGame,
  token: auth.token,
  playerName: user.playerName,
  gravatarEmail: user.gravatarEmail,
  score: game.score,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    ...GameActions,
    ...TimerActions,
    ...RankingActions,
  }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Game);
