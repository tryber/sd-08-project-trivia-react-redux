import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../../components/Header';

const MAX_NUMBER_FIRST = 4;
const MAX_NUMBER = 3;
class Play extends React.Component {
  constructor() {
    super();
    this.state = {
      // isclickedFalse1: false,
      // isclikedFalse2: false,
      // isClickedFalse3: false,
      // isClickedTrue: false,
      isDisabled: false,
    };
    this.createMultipleQuestions = this.createMultipleQuestions.bind(this);
    this.ramdomizeAnswers = this.ramdomizeAnswers.bind(this);
    this.renderType = this.renderType.bind(this);
  }

  ramdomizeAnswers() {
    const positions = [];
    positions.push(Math.round(Math.random() * MAX_NUMBER_FIRST));
    while (positions.length < MAX_NUMBER_FIRST) {
      const number = Math.round(Math.random() * MAX_NUMBER);
      if (!positions.includes(number)) {
        positions.push(number);
      }
    }
    return positions;
  }

  disable(event) {
    console.log('teste');
    if (event && event.target.name === 'correct-answer') {
      this.setState({ isClickedTrue: true });
    } else {
      this.setState({ classButtonAnswer: 'false-answer' });
    }
  }

  createMultipleQuestions() {
    const { data } = this.props;

    const positions = this.ramdomizeAnswers();

    const incorrectAnswers = data.results[0].incorrect_answers.map(
      (incorrectAnswer, index) => ({
        content: incorrectAnswer,
        status: `wrong-answer-${index}`,
        flag: false,
      }),
    );

    const correctAnswer = { content: data.results[0].correct_answer,
      status: 'correct-answer',
      flag: true,
    };

    const allAnswers = [...incorrectAnswers, correctAnswer];
    const styleCorrect = {
      border: '3px solid rgb(6, 240, 15)',
    };

    const styleWrong = {
      border: '3px solid rgb(255,0,0)',
    };

    return (
      <div>

        {allAnswers.map((answer, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ answer[positions[index]].status }
            // onClick={ this.alterClass }
            style={ styleCorrect }
            name={ answer[positions[index]].status }
          >
            {allAnswers[positions[0]].content}
          </button>
        ))}
        <button
          type="button"
          data-testid={ allAnswers && allAnswers[positions[0]].status }
          // onClick={ this.alterClass }
          style={ styleCorrect }
          name={ allAnswers && allAnswers[positions[0]].status }
        >
          {allAnswers[positions[0]].content}
        </button>
        <button
          type="button"
          data-testid={ allAnswers && allAnswers[positions[1]].status }
          name={ allAnswers && allAnswers[positions[1]].status }
        >
          {allAnswers[positions[1]].content}
        </button>
        <button
          type="button"
          data-testid={ allAnswers && allAnswers[positions[2]].status }
          name={ allAnswers && allAnswers[positions[2]].status }
        >
          {allAnswers[positions[2]].content}
        </button>
        <button
          type="button"
          data-testid={ allAnswers && allAnswers[positions[3]].status }
          name={ allAnswers && allAnswers[positions[3]].status }
        >
          {allAnswers[positions[3]].content}
        </button>
      </div>
    );
  }

  renderType() {
    const { data } = this.props;
    if (data.results[0].type === 'multiple') {
      return (
        this.createMultipleQuestions()
      );
    }
    return (
      <div>
        <button type="button" data-testid="correct-answer" onClick={ this.alterClass }>Verdadeiro</button>
        <button type="button" data-testid="wrong-answer-0" onClick={ this.alterClass }>Falso</button>
      </div>
    );
  }

  renderQuestions() {
    const { data, isFetching } = this.props;

    if (isFetching !== true) {
      return (
        <div className="container">
          <span data-testid="question-category">
            {
              data.results && data.results[0].category
            }
          </span>
          <div className="container-questions-answers">
            <div className="questions">
              <p data-testid="question-text">
                {
                  data.results && data.results[0].question
                }
              </p>
            </div>
            <div className="answers" />
          </div>
          <div className="container-timer-button">
            <div className="timer" />
            <div className="container-button">
              {this.renderType()}
            </div>
          </div>
        </div>
      );
    }
    return (<div>Loading...</div>);
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderQuestions()}
      </div>
    );
  }
}

Play.propTypes = {
  data: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.questions.data,
  isFetching: state.questions.isFetching,
});

export default connect(mapStateToProps)(Play);

// class MyHeader extends React.Component {
//   render() {
//     const mystyle = {
//       color: "white",
//       backgroundColor: "DodgerBlue",
//       padding: "10px",
//       fontFamily: "Arial"
//     };
//     return (
//       <div>
//       <h1 style={mystyle}>Hello Style!</h1>
//       <p>Add a little style!</p>
//       </div>
//     );
//   }
// }
