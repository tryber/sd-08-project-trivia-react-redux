import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchTriviaQuestions as fetchTriviaQuestionsAction,
  nextQuestion as nextQuestionAction,
  pause as pauseAction,
  correctAnswer as correctAnswerAction,
} from '../actions';
import Clock from './Clock';
import Loading from './Loading';

class GameQuestions extends React.Component {
  constructor() {
    super();

    this.state = {
      redirect: false,
    };
  }

  componentDidMount() {
    const { fetchTriviaQuestions } = this.props;
    const triviaToken = JSON.parse(localStorage.getItem('token'));
    const QUESTIONS_AMOUNT = 5;
    fetchTriviaQuestions(QUESTIONS_AMOUNT, triviaToken);
    this.savePlayerInfo();
  }

  componentDidUpdate() {
    this.savePlayerInfo();
  }

  handleCorrectAnswerClick() {
    const { pause, correctAnswer } = this.props;
    pause();
    correctAnswer(this.calculateScore());
  }

  handleIncorrectAnswerClick() {
    const { pause } = this.props;
    pause();
  }

  handleNextClick() {
    const { nextQuestion, readQuestions } = this.props;
    const QUESTIONS_AMOUNT = 5;
    return readQuestions.currentQuestion < (QUESTIONS_AMOUNT - 1)
      ? nextQuestion() : this.setState({ redirect: true });
  }

  // Solução de decode do colega Lucas Rodrigues de Castro, postada em thread do slack.
  decodeUtf8(string) {
    const stringUTF = unescape(encodeURIComponent(string));
    return stringUTF.replace(/&quot;|&#039;/gi, '\'');
  }

  savePlayerInfo() {
    const { playerInfo, readQuestions } = this.props;
    const state = { player: {
      name: playerInfo.name,
      assertions: readQuestions.assertions,
      score: readQuestions.score,
      gravatarEmail: `https://www.gravatar.com/avatar/${playerInfo.hashEmail}`,
    } };
    localStorage.setItem('state', JSON.stringify(state));
  }

  calculateScore() {
    const { readQuestions:
      { questions, currentQuestion, timer },
    } = this.props;
    const BASE_SCORE = 10;
    const { difficulty } = questions[currentQuestion];
    return BASE_SCORE + (timer * difficulty);
  }

  renderAnswers(answersArray) {
    const { paused } = this.props;
    const allAnswers = answersArray;
    const allAnswersButtons = [];
    const CORRECT_ANSWER = '3';

    allAnswers.forEach((answer) => {
      if (answer[0] === CORRECT_ANSWER) {
        allAnswersButtons.push(
          <button
            disabled={ paused }
            data-testid="correct-answer"
            className={ paused ? 'correct-answer' : null }
            key="3"
            onClick={ () => this.handleCorrectAnswerClick() }
            type="button"
          >
            { this.decodeUtf8(answer[1]) }
          </button>,
        );
      } else {
        allAnswersButtons.push(
          <button
            disabled={ paused }
            data-testid={ `wrong-answer-${answer[0]}` }
            className={ paused ? 'incorrect-answer' : null }
            key={ answer[0] }
            onClick={ () => this.handleIncorrectAnswerClick() }
            type="button"
          >
            { this.decodeUtf8(answer[1]) }
          </button>,
        );
      }
    });

    return (
      <>
        { allAnswersButtons.map((answer) => (answer)) }
      </>
    );
  }

  render() {
    const { readQuestions:
      { questions, currentQuestion, isFetching },
    paused,
    } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return (<Redirect to="/feedback" />);
    }

    return (
      <>
        <div className="question-answers-container">
          {isFetching
            ? <Loading />
            : (
              <>
                <h3 data-testid="question-category">
                  { questions[currentQuestion].category }
                </h3>
                <h3 data-testid="question-text">
                  { this.decodeUtf8(questions[currentQuestion].question) }
                </h3>
                <div className="answers-container">
                  { this.renderAnswers(questions[currentQuestion].answers) }
                </div>
                <Clock />
              </>
            )}
        </div>
        <div className="next-button-container">
          { paused && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.handleNextClick.bind(this) }
            >
              Próxima
            </button>) }
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  playerInfo: state.loginReducer,
  readQuestions: state.gameReducer,
  paused: state.gameReducer.pause,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaQuestions: (questionsAmount, token) => {
    dispatch(fetchTriviaQuestionsAction(questionsAmount, token));
  },
  nextQuestion: () => dispatch(nextQuestionAction()),
  pause: () => dispatch(pauseAction()),
  correctAnswer: (payload) => dispatch(correctAnswerAction(payload)),
});

GameQuestions.propTypes = {
  readQuestions: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchTriviaQuestions: PropTypes.func.isRequired,
  playerInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  nextQuestion: PropTypes.func.isRequired,
  correctAnswer: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
