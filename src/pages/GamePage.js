import React, { Component } from 'react';
import Header from '../components/Header';
import getGameQuestions from '../services/getGameQuestions';
import optionsAnswers from '../services/utils';

class GamePage extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
    this.saveQuestions = this.saveQuestions.bind(this);
  }

  async componentDidMount() {
    const { results } = await getGameQuestions();
    this.saveQuestions(results);
  }

  async saveQuestions(results) {
    await this.setState({ questions: results });
  }

  render() {
    const { questions } = this.state;
    let answers = [];
    if (questions.length > 0) {
      answers = optionsAnswers(
        questions[0].correct_answer,
        questions[0].incorrect_answers,
      );
    }
    return (
      <div>
        <Header />
        {questions.length > 0 && (
          <div>
            <h2 data-testid="question-category">{questions[0].category}</h2>
            <div data-testid="question-text">{questions[0].question}</div>
            {answers.map((answer, index) => (answer.isCorrect ? (
              <button type="button" key={ index } data-testid="correct-answer">
                {answer.correctAnswer}
              </button>
            ) : (
              <button
                type="button"
                key={ index }
                data-testid={ `wrong-answer-${answer.index}` }
              >
                {answer.answer}
              </button>
            )))}
          </div>
        )}
      </div>
    );
  }
}

export default GamePage;
