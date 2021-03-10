import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { Redirect } from 'react-router';
import { fetchQuestions, handleScore } from '../redux/actions';

const ONE_SECOND = 1000;
class GameScreenBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      assertions: 0,
      score: 0,
      position: 0,
      clicked: false,
      seconds: 30,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), ONE_SECOND);
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([]));
    }
    return localStorage.getItem('ranking');
  }

  tick() {
    const { seconds } = this.state;
    if (seconds === 0) {
      this.setState({
        seconds: 0,
        clicked: true,
      });
    } else {
      this.setState({
        seconds: seconds - 1,
      });
    }
  }

  score(difficulty) {
    console.log(difficulty);
    const minPoint = 10;
    const difficultyMultiplier = 3;
    const { score, seconds, assertions } = this.state;
    const { handScore, name, gravatarEmail } = this.props;
    const assertionResult = score + minPoint + (seconds * 1) > 0
      ? assertions + 1 : assertions;

    if (difficulty === 'easy' && seconds > 0) {
      this.setState({
        score: score + minPoint + (seconds * 1),
        assertions: score + minPoint + (seconds * 1) > 0 ? assertions + 1 : assertions,
      });
      console.log(score + minPoint + (seconds * 1));
      handScore(score + minPoint + (seconds * 1));
      return localStorage.setItem('state',
        JSON.stringify({ player:
          { name,
            assertions: assertionResult,
            score: score + minPoint + (seconds * 1),
            gravatarEmail,
          } }));
    }
    if (difficulty === 'medium' && seconds > 0) {
      this.setState({
        score: score + minPoint + (seconds * 2),
        assertions: score + minPoint + (seconds * 1) > 0 ? assertions + 1 : assertions,
      });
      console.log(score + minPoint + (seconds * 1));
      handScore(score + minPoint + (seconds * 2));
      return localStorage.setItem('state',
        JSON.stringify({ player:
          { name,
            assertions: assertionResult,
            score: score + minPoint + (seconds * 2),
            gravatarEmail,
          } }));
    }
    if (difficulty === 'hard' && seconds > 0) {
      this.setState({
        score: score + minPoint + (seconds * difficultyMultiplier),
        assertions: score + minPoint + (seconds * 1) > 0 ? assertions + 1 : assertions,
      });
      console.log(score + minPoint + (seconds * 1));
      handScore(score + minPoint + (seconds * 1));
      return localStorage.setItem('state',
        JSON.stringify({ player:
          { name,
            assertions: assertionResult,
            score: score + minPoint + (seconds * 1),
            gravatarEmail,
          } }));
    }
    this.setState({
      score,
      assertions,
    });
    console.log(score + minPoint + (seconds * 1));
    handScore(score + minPoint + (seconds * 1));
    return localStorage.setItem('state',
      JSON.stringify({ player:
        { name,
          assertions,
          score: score + minPoint + (seconds * 1),
          gravatarEmail,
        } }));
  }

  handleClick(difficulty) {
    const { clicked } = this.state;
    console.log(difficulty);
    if (difficulty === '0') {
      const { score, assertions } = this.state;
      const { name, gravatarEmail } = this.props;
      this.setState({
        clicked: !clicked,
      });
      return localStorage.setItem('state',
        JSON.stringify({ player:
        { name,
          assertions,
          score,
          gravatarEmail,
        } }));
    }
    this.setState({
      clicked: !clicked,
    });
    this.score(difficulty);
  }

  nextQuestion() {
    const { position, redirect, score } = this.state;
    const { name, gravatarEmail } = this.props;
    const hash = md5(gravatarEmail).toString();
    const src = `https://www.gravatar.com/avatar/${hash}`;
    const FIFTH_QUESTION = 4;
    console.log(position);
    if (position === FIFTH_QUESTION) {
      setTimeout(() => {
        const rank = JSON.parse(localStorage.getItem('ranking'));
        console.log(rank);
        const player = { name, score, picture: src };
        rank.push(player);
        localStorage.setItem('ranking', JSON.stringify(rank));
      }, 1);
      return this.setState({
        redirect: !redirect,
      });
    }
    this.setState({
      position: position + 1,
      clicked: false,
      seconds: 30,
    });
  }

  render() {
    const { position, clicked, seconds, redirect } = this.state;
    const { questions } = this.props;
    // console.log(questions);
    if (redirect) {
      return (
        <Redirect to="/feedbackscreen" />
      );
    }
    return (
      <div>
        <div>
          Seconds:
          {' '}
          {seconds}
        </div>
        <div>
          <div
            data-testid="question-category"
          >
            {questions.results[position].category}
          </div>
          <div
            data-testid="question-text"
          >
            {questions.results[position].question}
          </div>
          <form>
            <button
              type="button"
              data-testid="correct-answer"
              className={ !clicked ? 'default' : 'correct-answer' }
              onClick={ (e) => this.handleClick(e.target.value) }
              disabled={ clicked }
              value={ questions.results[position].difficulty }
            >
              {questions.results[position].correct_answer}
            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${0}` }
              className={ !clicked ? 'default' : 'wrong-answer' }
              onClick={ (e) => this.handleClick(e.target.value) }
              disabled={ clicked }
              value={ 0 }
            >
              {questions.results[position].incorrect_answers[0]}
            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${1}` }
              className={ !clicked ? 'default' : 'wrong-answer' }
              onClick={ (e) => this.handleClick(e.target.value) }
              disabled={ clicked }
              value={ 0 }
            >
              {questions.results[position].incorrect_answers[1]}
            </button>
            <button
              type="button"
              data-testid={ `wrong-answer-${2}` }
              className={ !clicked ? 'default' : 'wrong-answer' }
              onClick={ (e) => this.handleClick(e.target.value) }
              disabled={ clicked }
              value={ 0 }
            >
              {questions.results[position].incorrect_answers[2]}
            </button>
            <button
              type="button"
              className={ !clicked ? 'next-question-btn-not-visible'
                : 'next-question-btn-visible' }
              data-testid="btn-next"
              onClick={ () => this.nextQuestion() }
            >
              Próxima
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
  name: state.name,
  gravatarEmail: state.email,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuest: (token) => dispatch(fetchQuestions(token)),
  handScore: (score) => dispatch(handleScore(score)),
});

GameScreenBody.propTypes = {
  questions: PropTypes.object,
}.isRequired;
// teste fix
export default connect(mapStateToProps, mapDispatchToProps)(GameScreenBody);
