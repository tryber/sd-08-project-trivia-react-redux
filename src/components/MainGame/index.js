import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import shuffle from '../../services/Randomizers';
import './mainGame.css';
import Timer from '../Timer';
import { resetTimer } from '../../actions';
// :D
class MainGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      questionResolved: false,
    };
    this.addPlayerStorage = this.addPlayerStorage.bind(this);
    this.addPointsStorage = this.addPointsStorage.bind(this);
    this.arrayOfQuestions = this.arrayOfQuestions.bind(this);
    this.incorrectQuestions = this.incorrectQuestions.bind(this);
    this.borderCorrect = this.borderCorrect.bind(this);
    this.handleCalcPoints = this.handleCalcPoints.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.borderWrong = this.borderWrong.bind(this);
    this.handleWrong = this.handleWrong.bind(this);
    this.handleDisableButton = this.handleDisableButton.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.showMeButton = this.showMeButton.bind(this);
  }

  componentDidMount() {
    this.addPlayerStorage();
  }

  getDifficulty(difficulty) {
    const hardP = 3;
    const mediumP = 2;
    const easyP = 1;
    switch (difficulty) {
    case 'hard':
      return hardP;
    case 'medium':
      return mediumP;
    case 'easy':
      return easyP;
    default:
      return 0;
    }
  }

  addPlayerStorage() {
    const { playerName, playerEmail } = this.props;
    const playerInfo = {
      player: {
        name: playerName,
        assertions: 0,
        score: 0,
        gravatarEmail: playerEmail,
      },
    };
    const stringPlayerInfo = JSON.stringify(playerInfo);
    localStorage.setItem('state', stringPlayerInfo);
  }

  addPointsStorage(points) {
    const stringPlayerInfo = localStorage.getItem('state');
    const playerInfo = JSON.parse(stringPlayerInfo);
    playerInfo.player.assertions += 1;
    playerInfo.player.score += points;
    const altStringPlayerInfo = JSON.stringify(playerInfo);
    localStorage.setItem('state', altStringPlayerInfo);
  }

  handleCalcPoints() {
    const { questionNumber } = this.state;
    const { timer } = this.props;
    const { pQuestions } = this.props;
    const actualQuestion = pQuestions[questionNumber];
    const { difficulty } = actualQuestion;
    const difficultyMultiplyer = this.getDifficulty(difficulty);
    const basePoints = 10;
    const calcPoints = basePoints + (timer * difficultyMultiplyer);
    this.addPointsStorage(calcPoints);
  }

  handleCorrect() {
    this.setState({
      questionResolved: true,
    });
    this.handleCalcPoints();
  }

  handleDisableButton() {
    this.setState({ questionResolved: true });
  }

  borderCorrect() {
    const { questionResolved } = this.state;
    if (questionResolved) {
      return 'correct-answer';
    }
    return 'answer-button';
  }

  borderWrong() {
    const { questionResolved } = this.state;
    if (questionResolved) {
      return 'wrong-answer';
    }
    return 'answer-button';
  }

  handleWrong() {
    this.setState({
      questionResolved: true,
    });
  }

  incorrectQuestions(incorrects) {
    const { questionResolved } = this.state;
    return incorrects.map((e, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        key={ `wrong-answer-${index}` }
        type="button"
        className={ this.borderWrong() }
        onClick={ this.handleWrong }
        disabled={ questionResolved }
      >
        {e}
      </button>
    ));
  }

  arrayOfQuestions({ correct_answer: correct, incorrect_answers: incorrects }) {
    const { questionResolved } = this.state;
    const { timer } = this.props;
    const correctAnswer = (
      <button
        data-testid="correct-answer"
        key="correct-answer"
        type="button"
        className={ this.borderCorrect() }
        onClick={ this.handleCorrect }
        disabled={ questionResolved }
      >
        {correct}
      </button>);
    const array = [correctAnswer, ...this.incorrectQuestions(incorrects)];
    const timerMax = 30;
    if (!questionResolved && timer === timerMax) {
      shuffle(array);
    }
    return array;
  }

  changeQuestion() {
    const { pResetTimer } = this.props;
    this.setState((prevState) => ({
      questionNumber: prevState.questionNumber + 1,
      questionResolved: false,
    }));
    pResetTimer();
  }

  showMeButton() {
    const { questionResolved, questionNumber } = this.state;
    const { pQuestions } = this.props;
    const answersNumber = pQuestions.length - 1;
    if (questionResolved && questionNumber < answersNumber) {
      return (
        <button
          data-testid="btn-next"
          key="btn-next"
          type="button"
          className="btn-next"
          onClick={ this.changeQuestion }
        >
          Próxima
        </button>
      );
    }
    if (questionResolved && questionNumber === answersNumber) {
      return (
        <Link to="/feedback">
          <button
            data-testid="btn-next"
            key="btn-next"
            type="button"
            className="btn-next"
          >
            Feedback
          </button>
        </Link>
      );
    }
  }

  render() {
    const { questionNumber, questionResolved } = this.state;
    const { pQuestions } = this.props;
    const actualQuestion = pQuestions[questionNumber];
    const { category, question } = actualQuestion;
    return (
      <main>
        <div className="question-box">
          <div className="question-class">
            <h2 data-testid="question-category">{category}</h2>
            <p data-testid="question-text">{question}</p>
          </div>
          <div className="answer-class">
            { this.arrayOfQuestions(actualQuestion) }
          </div>
        </div>
        <Timer
          questionResolved={ questionResolved }
          handleDisable={ this.handleDisableButton }
        />
        <div>
          { this.showMeButton() }
        </div>
      </main>
    );
  }
}

MainGame.propTypes = {
  timer: PropTypes.number.isRequired,
  pResetTimer: PropTypes.func.isRequired,
  playerName: PropTypes.string.isRequired,
  playerEmail: PropTypes.string.isRequired,
  pQuestions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    pResetTimer: () => dispatch(resetTimer()),
  };
}

function mapStateToProps({ triviaGame, login }) {
  return {
    timer: triviaGame.timer,
    pQuestions: triviaGame.questions.results,
    pLoading: triviaGame.isLoading,
    playerName: login.name,
    playerEmail: login.email,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
