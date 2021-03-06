import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { connect } from 'react-redux';
import { actionScore } from '../../redux/actions';

const ONE_SECOND = 1000;

class CardGame extends Component {
  constructor(props) {
    super(props);

    this.changeColor = this.changeColor.bind(this);
    this.clearColorAndEnableButtonQuestion = this.clearColorAndEnableButtonQuestion
      .bind(this);

    this.state = {
      bt1: '',
      bt2: '',
      bt3: '',
      bt4: '',
      bt5: '',
      bt6: '',
      timer: 30,
      score: 0,
      rightAnswers: 0,
      disableButtons: false,
      showButton: false,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    this.clearTimer();
  }

  clearTimer() {
    const { timer, disableButtons } = this.state;
    if (timer === 0 || disableButtons) {
      clearInterval(this.intervalId);
    }
  }

  sumScore(id) {
    const { element: { difficulty } } = this.props;
    const { timer } = this.state;
    const diff = {
      hard: 3, medium: 2, easy: 1,
    };
    const TEN = 10;
    if (id === 'correct') {
      const score = TEN + (timer * diff[difficulty]);
      this.setState((prevState) => ({
        score: prevState.score + score,
        rightAnswers: prevState.rightAnswers + 1,
      }));
    }
  }

  changeColor({ target }) {
    if (target.name === 'bt1' || target.name === 'bt5') {
      this.sumScore(target.id);
      this.setState({
        [target.name]: 'green',
        bt2: 'red',
        bt3: 'red',
        bt4: 'red',
        bt6: 'red',
        disableButtons: true,
        showButton: true,
      });
    } else {
      this.setState({
        [target.name]: 'red',
        bt2: 'red',
        bt3: 'red',
        bt4: 'red',
        bt6: 'red',
        bt1: 'green',
        bt5: 'green',
        disableButtons: true,
        showButton: true,
      });
    }
  }

  clearColorAndEnableButtonQuestion() {
    this.setState({
      bt1: '',
      bt2: '',
      bt3: '',
      bt4: '',
      bt5: '',
      bt6: '',
      disableButtons: false,
    });
  }

  buttonDisabledValidity() {
    const { timer, disableButtons } = this.state;
    if (timer === 0 || disableButtons) return true;
  }

  createButtonNextQuestion() {
    const { showButton } = this.state;
    const { changeCount } = this.props;
    if (showButton) {
      return (
        <button
          type="button"
          data-testid="btn-next"
          onClick={ () => changeCount(this.clearColorAndEnableButtonQuestion) }
        >
          Next Question

        </button>
      );
    }
  }

  render() {
    const element = this.props;
    const { saveScore } = this.props;

    const { bt1, bt2, bt3, bt4, bt5, bt6, timer, score, rightAnswers } = this.state;
    const { category, correct_answer: correctAnswer,
      incorrect_answers: incorrectAnswers, question, type } = element.element;
    saveScore(score, rightAnswers);// função que muda o valor no state
    if (type === 'multiple') {
      return (
        <section className="question-card">
          {timer}
          <h1 data-testid="question-category">
            {category}
          </h1>
          <section>
            <div data-testid="question-text">
              {question}
            </div>
            <div className="buttonsGroup">
              <button
                name="bt1"
                type="button"
                id="correct"
                data-testid="correct-answer"
                className={ bt1 }
                disabled={ this.buttonDisabledValidity() }
                onClick={ this.changeColor }
              >
                {correctAnswer}
              </button>
              <button
                name="bt2"
                type="button"
                data-testid="wrong-answer-"
                className={ bt2 }
                onClick={ this.changeColor }
                disabled={ this.buttonDisabledValidity() }
              >
                {incorrectAnswers[0]}
              </button>
              <button
                name="bt3"
                type="button"
                data-testid="wrong-answer-"
                className={ bt3 }
                onClick={ this.changeColor }
                disabled={ this.buttonDisabledValidity() }
              >
                {incorrectAnswers[1]}
              </button>
              <button
                name="bt4"
                type="button"
                data-testid="wrong-answer-"
                className={ bt4 }
                onClick={ this.changeColor }
                disabled={ this.buttonDisabledValidity() }
              >
                {incorrectAnswers[2]}
              </button>
              { this.createButtonNextQuestion()}
            </div>
          </section>
        </section>
      );
    }

    return (
      <section className="question-card">
        {timer}
        <h1 data-testid="question-category">
          {category}
        </h1>
        <div data-testid="question-text">
          {question}
        </div>
        <button
          name="bt5"
          type="button"
          id="correct"
          data-testid="correct-answer"
          className={ bt5 }
          onClick={ this.changeColor }
          disabled={ this.buttonDisabledValidity() }
        >
          {correctAnswer}
        </button>
        <button
          name="bt6"
          type="button"
          data-testid="wrong-answer-"
          className={ bt6 }
          onClick={ this.changeColor }
          disabled={ this.buttonDisabledValidity() }
        >
          {incorrectAnswers}
        </button>
        { this.createButtonNextQuestion()}

      </section>
    );
  }
}

CardGame.propTypes = {
  element: PropTypes.shape({
    category: PropTypes.string,
    correct_answer: PropTypes.string,
    difficulty: PropTypes.string,
    incorrect_answers: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  saveScore: PropTypes.func.isRequired,
  changeCount: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveScore: (score, rightAnswers) => dispatch(actionScore(score, rightAnswers)),
});

export default connect(null, mapDispatchToProps)(CardGame);
