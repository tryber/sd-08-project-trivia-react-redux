import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchAPI, correctAnswer, hasAnswered, answerFalse } from '../actions';
import shuffle from '../shuffle';
import Header from '../components/Header';
import Timer from '../components/Timer';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: 0,
    };
    this.handleCorrect = this.handleCorrect.bind(this);
    this.handleIncorrect = this.handleIncorrect.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      const { getQuestions } = this.props;
      await getQuestions(token);
    }
  }

  // source: https://stackoverflow.com/a/42182294/14424360
  decode(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }

  handleCorrect() {
    const { correctAction, player, toggleHasAnswered, timer } = this.props;
    const storePlaceholder = { difficulty: 1, baseScore: 10 };
    const { difficulty, baseScore } = storePlaceholder;
    const answerScore = baseScore + (timer * difficulty);

    localStorage.setItem('state', JSON.stringify({
      player: {
        ...player,
        score: player.score + answerScore,
        assertions: player.assertions + 1,
      },
    }));

    toggleHasAnswered();
    correctAction(answerScore);
  }

  nextQuestion() {
    const lastQuestion = 4;
    const { question } = this.state;
    const { history, toggleHasAnsweredFalse } = this.props;
    if (question === lastQuestion) {
      history.push('/feedback');
    } else {
      toggleHasAnsweredFalse();
      this.setState({
        question: question + 1,
      });
    }
  }

  handleIncorrect() {
    const { toggleHasAnswered, player } = this.props;

    localStorage.setItem('state', JSON.stringify({
      player: {
        ...player,
      },
    }));

    toggleHasAnswered();
  }

  render() {
    const { results, redirect, questionAnswered, timer } = this.props;
    const { question } = this.state;
    const token = localStorage.getItem('token');

    if (timer === 0) { this.handleIncorrect(); }

    if (redirect && !token) { return <Redirect to="/" />; }

    if (!results) {
      return (
        <>
          <Header />
          <article>
            <p>Carregando...</p>
          </article>
        </>
      );
    }

    const answers = shuffle([
      ...results[question].incorrect_answers.map((answer, i) => (
        <button
          className={ `${questionAnswered ? 'incorrect ' : ''}answer` }
          type="button"
          key={ i }
          onClick={ questionAnswered ? null : this.handleIncorrect }
          data-testid={ `wrong-answer-${i}` }
          disabled={ questionAnswered }
        >
          { this.decode(answer) }
        </button>
      )),
      (
        <button
          className={ `${questionAnswered ? 'correct ' : ''}answer` }
          type="button"
          key={ results[question].incorrect_answers.length }
          onClick={ questionAnswered ? null : this.handleCorrect }
          data-testid="correct-answer"
          disabled={ questionAnswered }
        >
          { this.decode(results[question].correct_answer) }
        </button>
      ),
    ]);

    return (
      <>
        <Header />
        <article className="game-container">
          <h2 data-testid="question-category">
            { this.decode(results[question].category) }
          </h2>
          <p data-testid="question-text">{ this.decode(results[question].question) }</p>
          {answers}
          <button
            className="answer"
            key="next-question"
            data-testid="btn-next"
            type="button"
            hidden={ !questionAnswered }
            onClick={ this.nextQuestion }
          >
            Next Question
          </button>
          <p>
            {'Tempo restante: '}
            <Timer />
          </p>
        </article>
      </>
    );
  }
}

Game.propTypes = {
  correctAction: PropTypes.func.isRequired,
  getQuestions: PropTypes.func.isRequired,
  toggleHasAnsweredFalse: PropTypes.func.isRequired,
  questionAnswered: PropTypes.bool.isRequired,
  player: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ).isRequired,
  redirect: PropTypes.bool.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  toggleHasAnswered: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  timer: PropTypes.number.isRequired,
};

Game.defaultProps = {
  results: null,
};

const mapDispatchToProps = (dispatch) => ({
  correctAction: (score) => dispatch(correctAnswer(score)),
  getQuestions: (token) => dispatch(fetchAPI(token)),
  toggleHasAnswered: () => dispatch(hasAnswered()),
  toggleHasAnsweredFalse: () => dispatch(answerFalse()),
});

const mapStateToProps = (state) => ({
  questionAnswered: state.playerReducer.hasAnswered,
  player: state.playerReducer.player,
  results: state.trivia.data.results,
  redirect: !state.trivia.hasToken,
  timer: state.playerReducer.timerUpdate,
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
