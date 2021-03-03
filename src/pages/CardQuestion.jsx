import React from 'react';
import PropTypes from 'prop-types';

class CardQuestion extends React.Component {
  render() {
    const { questions } = this.props;
    return (
      <div>
        <p data-testid="question-category">{questions[0].category}</p>
        <p data-testid="question-text">{questions[0].question}</p>
        <p data-testid="correct-answer">{questions[0].correct_answer}</p>
        <div data-testid="wrong-answer">
          {questions[0].incorrect_answers.map(
            (alternative) => <p key={ alternative }>{ alternative }</p>,
          )}
        </div>
      </div>
    );
  }
}

CardQuestion.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
};

export default CardQuestion;
