import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Timer from 'react-compound-timer';
import { MD5 } from 'crypto-js';
import { updateScoreAction, addCorrectAnswerAction } from '../actions';
import CardQuestion from './CardQuestion';

const CONST_INIT = 10;
const THREE = 3;
class CardQuestions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ask: 0,
      timeOut: false,
    };
    this.onClick = this.onClick.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.clickWrong = this.clickWrong.bind(this);
  }

  componentDidMount() {
    const { nameUser, emailUser, updateScore } = this.props;
    const state = JSON.stringify({
      player: {
        name: nameUser,
        assertions: 0,
        score: 0,
        gravatarEmail: emailUser,
      },
    });
    updateScore(0);
    localStorage.setItem('state', state);
    if (localStorage.ranking === undefined) {
      localStorage.ranking = JSON.stringify([]);
    }
  }

  onClick(answerUser, question, timer) {
    const { updateScore, addCorrectAnswer } = this.props;
    let { score } = this.props;

    let state = JSON.parse(localStorage.getItem('state'));
    const { name, gravatarEmail } = state.player;
    let { assertions } = state.player;

    if (answerUser === question.correct_answer) {
      score += CONST_INIT + (Math.round(timer) * this.difficulty(question.difficulty));
      assertions += 1;
      addCorrectAnswer();
    }

    state = JSON.stringify({ player: { name, assertions, score, gravatarEmail } });
    updateScore(score);
    return (
      localStorage.setItem('state', state)
    );
  }

  difficulty(dificuldade) {
    if (dificuldade === 'easy') {
      return 1;
    }
    if (dificuldade === 'medium') {
      return 2;
    }
    return THREE;
  }

  handleNext() {
    const { ask } = this.state;
    const { questionCard, history } = this.props;
    if (questionCard.length - 1 > ask) {
      this.setState((state) => ({ ask: state.ask + 1, timeOut: false }));
    } else {
      const ranking = JSON.parse(localStorage.ranking);
      const state = JSON.parse(localStorage.state);
      const { player: { name, assertions, score, gravatarEmail } } = state;
      const picture = `https://www.gravatar.com/avatar/${MD5(gravatarEmail).toString()}`;
      ranking.push({ name, score, picture, assertions });
      localStorage.ranking = JSON.stringify(ranking);
      history.push('/feedback');
    }
  }

  clickWrong() {
    this.setState({ timeOut: true });
  }

  render() {
    const { questionCard } = this.props;
    const { ask, timeOut } = this.state;
    return (questionCard.length > 0
      && (
        <div>
          <Timer
            initialTime={ 30100 }
            direction="backward"
            checkpoints={ [
              { time: 0, callback: () => this.clickWrong() },
            ] }
          >
            {({ stop, reset, start, getTime }) => (
              <>
                <div className="timer"><Timer.Seconds /></div>
                <CardQuestion
                  question={ questionCard[ask] }
                  handleLocalStoreUpdate={ this.onClick }
                  handleNext={ this.handleNext }
                  timerStop={ stop }
                  timerReset={ reset }
                  timerStart={ start }
                  timerTime={ getTime }
                  timeOut={ timeOut }
                />
              </>
            )}
          </Timer>
        </div>
      )
    );
  }
}

CardQuestions.propTypes = {
  questionCard: PropTypes.arrayOf(PropTypes.object).isRequired,
  score: PropTypes.number.isRequired,
  updateScore: PropTypes.func.isRequired,
  addCorrectAnswer: PropTypes.func.isRequired,
  nameUser: PropTypes.string.isRequired,
  emailUser: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(updateScoreAction(score)),
  addCorrectAnswer: () => dispatch(addCorrectAnswerAction()),
});

const mapStateToProps = (state) => ({
  questionCard: state.play.questions,
  score: state.play.score,
  nameUser: state.user.nameUser,
  emailUser: state.user.emailUser,
});

export default connect(mapStateToProps, mapDispatchToProps)(CardQuestions);
