import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import shuffle from '../../services/Randomizers';
import './mainGame.css';

class MainGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionNumber: 0,
      questionAnswered: false,
    };
    this.arrayOfQuestions = this.arrayOfQuestions.bind(this);
    this.incorrectQuestions = this.incorrectQuestions.bind(this);
    this.borderCorrect = this.borderCorrect.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.borderWrong = this.borderWrong.bind(this);
    this.handleWrong = this.handleWrong.bind(this);
  }

  borderCorrect() {
    const { questionAnswered } = this.state;
    if (questionAnswered) {
      return 'correct-answer';
    }
    return 'answer-button';
  }

  handleCorrect() {
    this.setState({
      questionAnswered: true,
    });
  }

  borderWrong() {
    const { questionAnswered } = this.state;
    if (questionAnswered) {
      return 'wrong-answer';
    }
    return 'answer-button';
  }

  handleWrong() {
    this.setState({
      questionAnswered: true,
    });
  }

  incorrectQuestions(incorrects) {
    return incorrects.map((e, index) => (
      <button
        data-testid={ `wrong-answer-${index}` }
        key={ `wrong-answer-${index}` }
        type="button"
        className={ this.borderWrong() }
        onClick={ this.handleWrong }
      >
        {e}
      </button>
    ));
  }

  arrayOfQuestions({ correct_answer: correct, incorrect_answers: incorrects }) {
    const { questionAnswered } = this.state;
    const correctAnswer = (
      <button
        data-testid="correct-answer"
        key="correct-answer"
        type="button"
        className={ this.borderCorrect() }
        onClick={ this.handleCorrect }
      >
        {correct}
      </button>);
    const array = [correctAnswer, ...this.incorrectQuestions(incorrects)];
    if (!questionAnswered) {
      shuffle(array);
    }
    return array;
  }

  render() {
    const { questionNumber } = this.state;
    const { pQuestions } = this.props;
    console.log(pQuestions);
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
      </main>
    );
  }
}

MainGame.propTypes = {
  pQuestions: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string.isRequired,
    correct_answer: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  })).isRequired,
};

function mapStateToProps({ triviaGame }) {
  return {
    pQuestions: triviaGame.questions.results,
    pLoading: triviaGame.isLoading,
  };
}

export default connect(mapStateToProps)(MainGame);
