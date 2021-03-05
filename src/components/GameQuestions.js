import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  fetchTriviaQuestions as fetchTriviaQuestionsAction,
  finishQuestion as finishQuestionAction,
  nextQuestion as nextQuestionAction,
} from '../actions';
import Clock from './Clock';

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
  }

  handleAnswerClick() {
    const { finishQuestion } = this.props;
    finishQuestion();
  }

  handleNextClick() {
    const { nextQuestion, readQuestions } = this.props;
    const QUESTIONS_AMOUNT = 5;
    return readQuestions.currentQuestion < (QUESTIONS_AMOUNT - 1)
      ? nextQuestion() : this.setState({ redirect: true });
  }

  renderAnswers(answersArray) {
    const { readQuestions } = this.props;
    const allAnswers = answersArray;
    const allAnswersButtons = [];
    const CORRECT_ANSWER = '3';

    allAnswers.forEach((answer) => {
      if (answer[0] === CORRECT_ANSWER) {
        allAnswersButtons.push(
          <button
            disabled={ readQuestions.endQuestion }
            data-testid="correct-answer"
            className={ readQuestions.endQuestion ? 'correct-answer' : null }
            key="4"
            onClick={ () => this.handleAnswerClick() }
            type="button"
          >
            {answer[1]}
          </button>,
        );
      } else {
        allAnswersButtons.push(
          <button
            disabled={ readQuestions.endQuestion }
            data-testid={ `wrong-answer-${answer[0]}` }
            className={ readQuestions.endQuestion ? 'incorrect-answer' : null }
            key={ answer[0] }
            onClick={ () => this.handleAnswerClick() }
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
      { questions, currentQuestion, isFetching, endQuestion },
    } = this.props;
    const { redirect } = this.state;

    if (redirect) {
      return (<Redirect to="/feedback" />);
    }

 return (
      <div>
        {isFetching ? ('carregando2222') : (
          <>
            <h3 data-testid="question-category">
              { questions[currentQuestion].category }
            </h3>
            <h3 data-testid="question-text">
              { questions[currentQuestion].question }
            </h3>
            { this.renderAnswers(questions[currentQuestion].answers) }
            <Clock />
            { endQuestion && (
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
});

const mapDispatchToProps = (dispatch) => ({
  fetchTriviaQuestions: (questionsAmount, token) => {
    dispatch(fetchTriviaQuestionsAction(questionsAmount, token));
  },
  finishQuestion: () => dispatch(finishQuestionAction()),
  nextQuestion: () => dispatch(nextQuestionAction()),
});

GameQuestions.propTypes = {
  readQuestions: PropTypes.objectOf(PropTypes.any).isRequired,
  fetchTriviaQuestions: PropTypes.func.isRequired,
  finishQuestion: PropTypes.func.isRequired,
  nextQuestion: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestions);
