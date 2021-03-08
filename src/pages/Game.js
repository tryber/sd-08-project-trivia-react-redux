import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Header from '../components/Header';
import Question from '../components/Question';
import { fetchQuestions, updateGameSituation } from '../redux/actions';
import CountTime from '../components/CountTime';

class Game extends React.Component {
  constructor() {
    super();
    this.updateFetchSituation = this.updateFetchSituation.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.answerClick = this.answerClick.bind(this);
    this.saveStorage = this.saveStorage.bind(this);
    this.outOfTime = this.outOfTime.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.state = {
      currentQuestion: 0,
      fetchCompleted: 0,
      nextButtonEnabled: false,
      finishGame: false,
      assertions: 0,
      score: 0,
      timer: 0,
      reset: false,
    };
  }

  async componentDidMount() {
    const {
      numberOfQuestions,
      token,
      getQuestions,
      history,
    } = this.props;
    await getQuestions(numberOfQuestions, token, history);
    this.updateFetchSituation();
  }

  setBorders(correctIndex) {
    const botoes = document.getElementsByClassName('alternative');
    for (let i = 0; i < botoes.length; i += 1) {
      botoes[i].disabled = true;
      if (i === correctIndex) {
        botoes[i].className = 'alternative greenBorder';
      } else {
        botoes[i].className = 'alternative redBorder';
      }
    }
  }

  setTimer(sec) {
    this.setState({
      timer: sec,
    });
  }

  updateFetchSituation() {
    this.setState({ fetchCompleted: 1 });
  }

  clearBorders() {
    const botoes = document.getElementsByClassName('alternative');
    for (let i = 0; i < botoes.length; i += 1) {
      botoes[i].className = 'alternative';
      botoes[i].disabled = false;
    }
  }

  saveStorage(question) {
    const { playerName, playerEmail } = this.props;
    const { assertions, score, timer } = this.state;
    let diffMultiplier = 0;
    const numbers = { three: 3, ten: 10 };
    switch (question.difficulty) {
    case 'easy':
      diffMultiplier = 1;
      break;
    case 'medium':
      diffMultiplier = 2;
      break;
    case 'hard':
      diffMultiplier = numbers.three;
      break;
    default:
      break;
    }
    const points = numbers.ten + ((timer - 1) * diffMultiplier);
    const info = {
      player: {
        name: playerName,
        assertions: assertions + 1,
        score: score + points,
        gravatarEmail: playerEmail,
      },
    };
    localStorage.setItem('state', JSON.stringify(info));
    this.setState({
      assertions: info.player.assertions,
      score: info.player.score,
    });
  }

  nextQuestion() {
    this.clearBorders();
    const { currentQuestion } = this.state;
    const { numberOfQuestions, updateGameStatus } = this.props;
    if (currentQuestion < numberOfQuestions - 1) {
      this.setState({
        currentQuestion: currentQuestion + 1,
        nextButtonEnabled: false,
        reset: true,
      });
    } else {
      updateGameStatus();
      this.setState({
        finishGame: true,
      });
    }
  }

  clearReset() {
    this.setState({ reset: false });
  }

  answerClick(event, correctIndex) {
    const answer = event.target.getAttribute('data-testid');
    const { currentQuestion } = this.state;
    const { questions } = this.props;
    if (answer === 'correct-answer') {
      this.saveStorage(questions[currentQuestion]);
    }
    this.setState({ nextButtonEnabled: true });
    this.setBorders(correctIndex);
  }

  outOfTime() {
    this.setState({ nextButtonEnabled: true });
    const { questions } = this.props;
    const { currentQuestion } = this.state;
    const botoes = document.querySelectorAll('.alternative');
    const alternatives = [...botoes].map((button) => button.innerHTML);
    const correctIndex = alternatives.indexOf(questions[currentQuestion].correct_answer);
    this.setBorders(correctIndex);
  }

  render() {
    const { questions, playerName, playerEmail } = this.props;
    const {
      currentQuestion,
      fetchCompleted,
      nextButtonEnabled,
      finishGame,
      reset } = this.state;
    if (reset) this.clearReset();
    return (
      <div>
        <Header name={ playerName } email={ playerEmail } />
        <CountTime
          outOfTime={ this.outOfTime }
          questionAnswered={ nextButtonEnabled }
          reset={ reset }
          setTimer={ this.setTimer }
        />
        {fetchCompleted && (
          <Question
            question={ questions[currentQuestion] }
            answerClick={ this.answerClick }
          />
        )}
        {nextButtonEnabled && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Próxima
          </button>
        )}
        {finishGame && <Redirect to="/feedback" />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  numberOfQuestions: state.login.numberOfQuestions,
  token: state.login.token,
  questions: state.login.questions,
  playerName: state.login.name,
  playerEmail: state.login.email,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (numberOfQuestions, token, history) => dispatch(
    fetchQuestions(numberOfQuestions, token, history),
  ),
  updateGameStatus: () => dispatch(updateGameSituation()),
});

Game.propTypes = {
  numberOfQuestions: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object),
  token: PropTypes.string.isRequired,
  getQuestions: PropTypes.func.isRequired,
  updateGameStatus: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

Game.defaultProps = {
  questions: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
