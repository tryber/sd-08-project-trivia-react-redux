import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MS_TO_S = 1000;
const CHECK_TIME_OVER_PERIOD = 500;

class CardQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      response: '',
    };
    this.answerClick = this.answerClick.bind(this);
    this.next = this.next.bind(this);
  }

  componentDidUpdate() {
    this.timeOver();
  }

  answerClick(userAnswer) {
    const { handleLocalStoreUpdate, question, timerStop, timerTime } = this.props;
    this.setState({ disabled: true });
    handleLocalStoreUpdate(userAnswer, question, (timerTime() / MS_TO_S));
    timerStop();
  }

  next() {
    const { handleNext, timerReset, timerStart } = this.props;
    this.setState({ response: '', disabled: false });
    handleNext();
    timerReset();
    timerStart();
  }

  timeOver() {
    const check = setInterval(() => {
      const { question, timeOut } = this.props;
      if (timeOut) {
        const wrongAnswer = question.answers
          .find(({ isCorrect }) => !isCorrect).text;
        // this.answerClick(wrongAnswer);
        this.setState({ response: wrongAnswer, disabled: true });
        clearInterval(check);
      }
    }, CHECK_TIME_OVER_PERIOD);
  }

  decode(texto) {
    const txt = document.createElement('textarea');
    txt.innerHTML = texto;
    return txt.value;
  }

  styleOnclick(response, text) {
    const { question } = this.props;
    if (response === '') {
      return { border: 'null' };
    }
    if (text === question.correct_answer) {
      return { border: '3px solid rgb(6, 240, 15)' };
    }
    return { border: '3px solid rgb(255, 0, 0)' };
  }

  render() {
    const { question } = this.props;
    const { disabled, response } = this.state;
    let wrongCounter = 0;
    return (
      <>
        { this.timeOver() }
        <h3 data-testid="question-category">{ question.category }</h3>
        <p data-testid="question-text">
          { this.decode(question.question) }
        </p>
        <div>
          { question.answers.map(({ text, isCorrect }) => {
            const dataId = () => {
              let testId = 'correct-answer';
              if (!isCorrect) {
                testId = `wrong-answer-${wrongCounter}`;
                wrongCounter += 1;
              }
              return testId;
            };
            return (
              <button
                type="button"
                className="answer-button"
                onClick={ (e) => {
                  this.setState({
                    response: e.target.value,
                  }, () => this.answerClick(text));
                } }
                value={ text }
                disabled={ disabled }
                data-testid={ dataId() }
                key={ text }
                style={ this.styleOnclick(response, text) }
              >
                { this.decode(text) }
              </button>
            );
          }) }
        </div>
        { disabled && (
          <button
            type="button"
            onClick={ this.next }
            className="next-button"
            data-testid="btn-next"
          >
            Next
          </button>
        ) }
      </>
    );
  }
}

CardQuestion.propTypes = {
  question: PropTypes.shape({
    category: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    answers: PropTypes.arrayOf(PropTypes.object).isRequired,
    correct_answer: PropTypes.string.isRequired,
  }).isRequired,
  handleLocalStoreUpdate: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
  timerStop: PropTypes.func.isRequired,
  timerReset: PropTypes.func.isRequired,
  timerStart: PropTypes.func.isRequired,
  timerTime: PropTypes.func.isRequired,
  timeOut: PropTypes.bool.isRequired,
};

export default CardQuestion;
