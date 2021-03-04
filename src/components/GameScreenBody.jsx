import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from '../redux/actions';

class GameScreenBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // category: {},
      // type: '',
      // difficulty: '',
      // question: '',
      // correct_answer: '',
      // incorrect_answers: [],
      position: 0,
      clicked: false,
    };
  }

  componentDidMount() {
    const { fetchQuest } = this.props;
    const tk = localStorage.getItem('token');
    console.log(tk);
    fetchQuest(tk);
  }

  handleClick() {
    const { clicked } = this.state;
    // console.log(clicked);
    this.setState({
      clicked: !clicked,
    });
  }

  render() {
    const { position, clicked } = this.state;
    const { questions } = this.props;
    console.log(questions);
    return (
      <div>
        <div>
          <div
            data-testid="question-category"
          >
            {questions.length && questions.results[position].category}

          </div>
          <div
            data-testid="question-text"
          >
            {questions.length && questions.results[position].question}

          </div>
          <form>
            <button
              type="button"
              data-testid="correct-answer"
              className={ !clicked ? 'default' : 'correct-answer' }
              onClick={ () => this.handleClick() }
            >
              {questions.length && questions.results[position].correct_answer}
            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${0}` }
              className={ !clicked ? 'default' : 'wrong-answer' }
              onClick={ () => this.handleClick() }
            >
              {questions.length && questions.results[position].incorrect_answers[0]}
            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${1}` }
              className={ !clicked ? 'default' : 'wrong-answer' }
              onClick={ () => this.handleClick() }
            >
              {questions.length && questions.results[position].incorrect_answers[1]}
            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${2}` }
              className={ !clicked ? 'default' : 'wrong-answer' }
              onClick={ () => this.handleClick() }
            >
              {questions.length && questions.results[position].incorrect_answers[2]}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token.token,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuest: (token) => dispatch(fetchQuestions(token)),
});

GameScreenBody.propTypes = {
  questions: PropTypes.object,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(GameScreenBody);
