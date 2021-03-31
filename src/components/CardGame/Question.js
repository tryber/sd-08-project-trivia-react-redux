import React from 'react';
import PropTypes from 'prop-types';
import ButtonsAnswers from './ButtonsAnswers';

class Question extends React.Component {
  render() {
    const { timer,
      category,
      question,
      allAnswer,
      correct,
      incorrect,
      handleClickAnswers,
      buttonsAnswersDisabledValidity } = this.props;
    return (
      <section>
        {timer}
        <h1 data-testid="question-category">
          {category}
        </h1>

        <div data-testid="question-text">
          {question}
        </div>
        <br />
        <span>Answers</span>
        <br />
        <br />
        {allAnswer.map((answer, index) => (
          <ButtonsAnswers
            key={ index }
            name={ answer[1] }
            dataTestId={ answer[1] }
            className={ answer[1] === 'correct-answer' ? correct : incorrect }
            buttonsAnswersDisabledValidity={ buttonsAnswersDisabledValidity }
            handleClickAnswers={ handleClickAnswers }
            answer={ answer[0] }
          />
        ))}

      </section>

    );
  }
}

Question.propTypes = {
  timer: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  allAnswer: PropTypes.arrayOf.isRequired,
  correct: PropTypes.string.isRequired,
  incorrect: PropTypes.string.isRequired,
  handleClickAnswers: PropTypes.func.isRequired,
  buttonsAnswersDisabledValidity: PropTypes.bool.isRequired,
};

export default Question;
