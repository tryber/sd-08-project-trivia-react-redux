import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Timer from './Timer';
import updateTimer from '../store/actions/updateTimer.actions';
import { setScore } from '../store/actions/player.actions';

class QuestionViewer extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonCorrect: 'button buttonCorrect',
      buttonFalse: 'button buttonFalse',
      answered: false,
      currentQuestion: 0,
      startTimer: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.n = this.n.bind(this);
    this.timeExpired = this.timeExpired.bind(this);
  }

  timeExpired() {
    this.setState({
      answered: true,
    });
  }

  handleClick(correctAnswer) {
    this.setState({
      answered: true,
    });
    if (correctAnswer) {
      const { currentQuestion } = this.state;
      const { questions, setScoreInStore, timeLeft } = this.props;
      const BASE_SCORE = 10;
      const difficultyQuestion = questions[currentQuestion].difficulty;
      const difficultyValue = {
        easy: 1,
        medium: 2,
        hard: 3,
      };
      const score = BASE_SCORE + (timeLeft * difficultyValue[difficultyQuestion]);
      setScoreInStore(score);
      const playerLocal = JSON.parse(localStorage.getItem('state'));
      playerLocal.player.score += score;
      playerLocal.player.assertions += 1;
      localStorage.setItem('state', JSON.stringify(playerLocal));
    }
  }

  // Retorna a proxima questão, estava dando conflito de alinhamento da tag no lint (na hora de declarar o botão "Next")
  // por isso o nome "n"
  n() {
    const { currentQuestion } = this.state;
    const { updateTimerReducer } = this.props;
    const MAX_TIMER = 30;
    this.setState({
      currentQuestion: currentQuestion + 1, answered: false, startTimer: false,
    },
    () => {
      updateTimerReducer(MAX_TIMER);
      this.setState({ startTimer: true });
    });
  }

  generateQuestion(currentQuestion) {
    const { questions } = this.props;
    const { buttonCorrect, buttonFalse, answered } = this.state;
    const {
      category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers,
    } = questions[currentQuestion];
    const correctAnswerObject = { answerText: correctAnswer, testid: 'correct-answer' };
    const wrongAnswers = incorrectAnswers.map((wrongAnswer, index) => (
      { answerText: wrongAnswer, testid: `wrong-answer-${index}` }
    ));
    // const ZERO_POINT_FIVE = 0.5;
    const allAnswers = [...wrongAnswers, correctAnswerObject];
    // ref: https://stackoverflow.com/questions/53591691/sorting-an-array-in-random-order
    return (
      <section>
        <span data-testid="question-category">{ category }</span>
        <p data-testid="question-text">{ question }</p>
        {allAnswers
        // .sort(() => ZERO_POINT_FIVE - Math.random())
          .map((answer) => (
            <button
              type="button"
              className={
                (answered && (answer.testid === 'correct-answer'
                  ? buttonCorrect
                  : buttonFalse)) || 'button'
              }
              onClick={ () => this.handleClick(answer.testid === 'correct-answer') }
              key={ answer.testid }
              disabled={ answered }
              data-testid={ answer.testid }
            >
              { answer.answerText }
            </button>
          ))}
        {
          answered
          && <button type="button" onClick={ this.n } data-testid="btn-next">Next</button>
        }
      </section>
    );
  }

  redirectToFeedback() {
    const { gravatarURL, score, name } = this.props;
    const player = {
      name,
      score,
      picture: gravatarURL,
    };
    const rankingLocal = JSON.parse(localStorage.getItem('ranking'));
    if (!rankingLocal) {
      localStorage.setItem('ranking', JSON.stringify([player]));
      return <Redirect push to="/feedback" />;
    }
    localStorage.setItem('ranking', JSON.stringify([...rankingLocal, player]));
    return <Redirect push to="/feedback" />;
  }

  render() {
    const { answered, currentQuestion,
      startTimer, questionLoaded } = this.state;
    const { maxQuestions } = this.props;
    return (
      <main>
        {startTimer
        && <Timer
          timeExpired={ this.timeExpired }
          answered={ answered }
        />}
        <section>
          {currentQuestion < maxQuestions && !questionLoaded
          && this.generateQuestion(currentQuestion)}
          {currentQuestion >= maxQuestions && this.redirectToFeedback()}
        </section>
      </main>
    );
  }
}

QuestionViewer.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    difficulty: PropTypes.string.isRequired,
  })).isRequired,
  maxQuestions: PropTypes.number.isRequired,
  setScoreInStore: PropTypes.func.isRequired,
  gravatarURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  updateTimerReducer: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  maxQuestions: state.player.maxQuestions,
  score: state.player.score,
  gravatarURL: state.player.gravatarURL,
  name: state.player.name,
  timeLeft: state.updateTimeLeft.timeLeft,
});

const mapDispatchToProps = (dispatch) => ({
  setScoreInStore: (score) => dispatch(setScore(score)),
  updateTimerReducer: (time) => dispatch(updateTimer(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuestionViewer);
