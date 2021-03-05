import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchAPITrivia } from '../../../store/actions/index';

class GameQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questIndex: 0,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    const { fetchAPI } = this.props;
    await fetchAPI(token);
  }

  randomizeArray(array) {
    const HALF = 0.5;
    array.sort(() => HALF - Math.random());
  }

  nextQuestion() { // Meramente para testar as perguntas
    const { questIndex } = this.state;
    this.setState({ questIndex: questIndex + 1 });
  }

  renderButton(option, dataTestid, key) {
    return (
      <button
        key={ key }
        type="button"
        data-testid={ dataTestid }
        onClick={ this.nextQuestion }
      >
        { option }
      </button>
    );
  }

  render() {
    const { questIndex } = this.state;
    const { questions } = this.props;
    if (!questions.length) return <div> Carregando... </div>;
    const { category,
      question,
      correct_answer: correctAnswer,
      incorrect_answers: wrongAnswers } = questions[questIndex];
    const allAnswers = [correctAnswer, ...wrongAnswers]; // Cria um array com todas as possiveis respostas
    const array = [];
    allAnswers.map(
      (option, index) => (option === correctAnswer
        ? array.push(this.renderButton(option, 'correct-answer', index))
        : array.push(this.renderButton(option, `wrong-answer-${index - 1}`, index))),
    );
    return (
      <section>
        <span data-testid="question-category">
          {category}
        </span>
        <p data-testid="question-text">
          {question}
        </p>
        { this.randomizeArray(array) /* randomiza o array */ }
        { array.map((reactElement, index) => (
          <div key={ index }>
            { reactElement }
          </div>
        ))}
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  questions: state.question.data });

const mapDispatchToProps = (dispatch) => ({
  fetchAPI: (token) => dispatch(fetchAPITrivia(token)) });

GameQuestion.propTypes = {
  fetchAPI: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameQuestion);
