import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getQuestions from '../../actions/question';
import { getAPIQuestions } from '../../services/trivia';
import './styles.css';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      correct: '',
      wrong: '',
    };

    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  onClick() {
    this.setState({
      correct: 'correct',
      wrong: 'wrong',
    });
  }

  async fetchQuestions() {
    const { sendQuestions } = this.props;
    const result = await getAPIQuestions();
    sendQuestions(result);
  }

  render() {
    const { correct, wrong } = this.state;
    const counter = 0;
    const { question } = this.props;
    if (!question.length) return <p>Loading...</p>;
    const answers = [question[counter].correct_answer,
      ...question[counter].incorrect_answers];
    return (
      <div>
        <p data-testid="question-category">{question[counter].category}</p>
        <p data-testid="question-text">{question[counter].question}</p>
        { (answers.length === 2)
          ? (
            <div>
              <button
                type="button"
                data-testid="correct-answer"
                onClick={ this.onClick }
                className={ correct }
              >
                {answers[0]}
              </button>
              <button
                type="button"
                data-testid="wrong-answer"
                onClick={ this.onClick }
                className={ wrong }
              >
                {answers[1]}
              </button>
            </div>
          )
          : answers.map((answer, index) => {
            if (answer === answers[0]) {
              return (
                <button
                  key={ index }
                  type="button"
                  data-testid="correct-answer"
                  onClick={ this.onClick }
                  className={ correct }
                >
                  {answer}
                </button>);
            }
            return (
              <button
                key={ index }
                type="button"
                data-testid="wrong-answer"
                onClick={ this.onClick }
                className={ wrong }
              >
                {answer}
              </button>);
          })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  question: state.question,
});

const mapDispatchToProps = (dispatch) => ({
  sendQuestions: (payload) => dispatch(getQuestions(payload)),
});

Question.propTypes = {
  sendQuestions: PropTypes.func.isRequired,
  question: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
