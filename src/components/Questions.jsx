import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import NextButton from './NextButton';
import { getQuestions as getQuestionsAction,
  increaseScore as increaseScoreAction } from '../actions/game';

import './Questions.css';

class Questions extends React.Component {
  constructor() {
    super();
    this.state = {
      answered: false,
      order: [],
      question: -1,
    };
    this.answerQuestion = this.answerQuestion.bind(this);
    this.shuffleQuestions = this.shuffleQuestions.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    const questionsAmount = 5;
    const { getQuestions, settings: { selectedCategory, difficulty, type } } = this.props;
    getQuestions(questionsAmount, token, selectedCategory, difficulty, type);
  }

  componentDidUpdate() {
    const { questions, questionPos } = this.props;
    const { incorrect_answers: incorrectAnswers } = questions[questionPos];
    const { question } = this.state;
    if (questionPos !== question) this.shuffleQuestions(incorrectAnswers);
  }

  answerQuestion({ target }) {
    const { value } = target;
    const { increaseScore, questions, questionPos } = this.props;
    const { difficulty, correct_answer: correctAnswer } = questions[questionPos];
    const isCorrect = value === correctAnswer ? 1 : 0;
    increaseScore(isCorrect, difficulty);
    this.setState({
      answered: true,
    });
  }

  shuffleQuestions(incorrect) {
    const aux = [...Array(incorrect.length + 1).keys()];
    const order = [];
    for (let index = 0; index < incorrect.length + 1; index += 1) {
      const pos = Math.floor(Math.random() * aux.length);
      order.push(...aux.splice(pos, 1));
    }

    this.setState(({ question }) => ({
      answered: false,
      order,
      question: question + 1,
    }));
  }

  render() {
    const { questions, timer, questionPos } = this.props;
    const { answered, order, question: questionState } = this.state;

    if (questions.length === 0) return <div />;
    if (questionPos !== questionState) return <div />;

    const { category, question, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers } = questions[questionPos];
    const shuffledQuestions = order.map((pos) => {
      if (pos !== 0) return incorrectAnswers[pos - 1];
      return correctAnswer;
    });

    let countIncorrect = 0;
    return (
      <section>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        { shuffledQuestions
          .map((answer, index) => {
            if (answer !== correctAnswer) countIncorrect += 1;
            return (
              <button
                type="button"
                key={ index }
                disabled={ timer === 0 }
                className={ (answered
                  && ((answer === correctAnswer && 'correct') || 'incorrect')) || '' }
                data-testid={ answer === correctAnswer ? 'correct-answer'
                  : `wrong-answer-${countIncorrect - 1}` }
                onClick={ this.answerQuestion }
                value={ answer }
              >
                {answer}
              </button>
            );
          })}
        { (answered || timer === 0) && <NextButton />}
      </section>
    );
  }
}

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  timer: PropTypes.number.isRequired,
  getQuestions: PropTypes.func.isRequired,
  increaseScore: PropTypes.func.isRequired,
  questionPos: PropTypes.number.isRequired,
  settings: PropTypes.shape({
    selectedCategory: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  questions: state.game.questions,
  timer: state.game.timer,
  questionPos: state.game.questionPos,
  settings: state.game.settings,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (amount, token, category, difficulty, type) => dispatch(
    getQuestionsAction(amount, token, category, difficulty, type),
  ),
  increaseScore: (score, diff) => dispatch(increaseScoreAction(score, diff)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
