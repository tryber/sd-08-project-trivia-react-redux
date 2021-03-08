import React from 'react';
import PropTypes from 'prop-types';

const RANDOM_ORDER_NUMBER = 0.5;

// créditos da função ao site https://leocaseiro.com.br/shuffle-do-php-no-javascript/
function randOrd() {
  return (Math.round(Math.random()) - RANDOM_ORDER_NUMBER);
}

class Question extends React.Component {
  constructor(props) {
    super(props);
    const { question } = props;
    this.state = {
      alternatives: [question.correct_answer, ...question.incorrect_answers]
        .sort(randOrd),
    };
  }

  componentDidUpdate() {
    const { question } = this.props;
    const { alternatives } = this.state;
    if (!alternatives.includes(question.correct_answer)) {
      this.updateAlternatives(question);
    }
  }

  updateAlternatives(question) {
    this.setState({
      alternatives: [question.correct_answer, ...question.incorrect_answers]
        .sort(randOrd),
    });
  }

  render() {
    const { question, answerClick } = this.props;
    const { alternatives } = this.state;
    const correctAnswerIndex = alternatives.indexOf(question.correct_answer);
    return (
      <section>
        <h3 data-testid="question-category">
          Category:
          { question.category }
        </h3>
        <h4 data-testid="question-text">{ question.question }</h4>
        <div className="button-container">
          {alternatives.map((alternative, index) => (
            <button
              type="button"
              key={ index }
              className="alternative"
              data-testid={ (index === correctAnswerIndex)
                ? 'correct-answer' : `wrong-answer-${index}` }
              onClick={ (e) => answerClick(e, correctAnswerIndex) }
            >
              { alternative }
            </button>))}
        </div>
      </section>
    );
  }
}

Question.propTypes = {
  question: PropTypes.shape({
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    question: PropTypes.string,
  }).isRequired,
  answerClick: PropTypes.func.isRequired,
};

export default Question;
