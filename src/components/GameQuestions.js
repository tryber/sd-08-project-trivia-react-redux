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
  // test

  componentDidMount() {
    const { fetchTriviaQuestions } = this.props;
    const triviaToken = JSON.parse(localStorage.getItem('token'));
    const QUESTIONS_AMOUNT = 5;
    fetchTriviaQuestions(QUESTIONS_AMOUNT, triviaToken);
  }

  handleCorrectAnswerClick() {
    const { pause, correctAnswer } = this.props;
    pause();
    correctAnswer(2);
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
            {answer[1]}
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
            {answer[1]}
          </button>,
        );
      }
    });

    return (
      <div>
        { allAnswersButtons.map((answer) => (answer)) }
      </div>
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
      <div>
        {isFetching
          ? <Loading />
          : (
            <>
              <h3 data-testid="question-category">
                { questions[currentQuestion].category }
              </h3>
              <h3 data-testid="question-text">
                { questions[currentQuestion].question }
              </h3>
              { this.renderAnswers(questions[currentQuestion].answers) }
              <Clock />
              { paused && (
                <button
                  data-testid="btn-next"
                  type="button"
                  onClick={ this.handleNextClick.bind(this) }
                >
                  Próxima
                </button>) }
            </>
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
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
  nextQuestion: PropTypes.func.isRequired,
  correctAnswer: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
