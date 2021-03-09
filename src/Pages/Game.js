import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { triviaAPI } from '../redux/actions';

import '../styles/game.css';

const TOTAL_QUESTIONS = 5;
const HARD_QUESTION_DIFFICULTY = 3;
const MEDIUM_QUESTION_DIFFICULTY = 2;
const EASY_QUESTION_DIFFICULTY = 1;
const SECONDS = 1000;

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
      counter: 30,
      buttonClass: false,
      click: 0,
      disabled: false,
      nextButtonEnabled: false,
      questionAnswered: false,
    };
    this.timer = this.timer.bind(this);
    this.setScore = this.setScore.bind(this);
    this.saveScore = this.saveScore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleButtonClass = this.handleButtonClass.bind(this);
    this.endGame = this.endGame.bind(this);
  }

  componentDidMount() {
    this.timer();
    this.saveScore();
    this.fetchAPI();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  setScore(userAnswer) {
    console.log(userAnswer);
    const { counter, count } = this.state;
    const { questions } = this.props;

    const { difficulty } = questions[count];
    let scoreByDifficulty = 0;
    const fixedScore = 10;

    if (difficulty === 'easy') scoreByDifficulty = EASY_QUESTION_DIFFICULTY;
    if (difficulty === 'medium') scoreByDifficulty = MEDIUM_QUESTION_DIFFICULTY;
    if (difficulty === 'hard') scoreByDifficulty = HARD_QUESTION_DIFFICULTY;

    const score = (fixedScore + (counter * scoreByDifficulty));

    if (userAnswer === 'correct') {
      const assertion = 1;
      this.saveScore(score, assertion);
    }
  }

  timer() {
    this.myInterval = setInterval(() => {
      const { questionAnswered, counter } = this.state;
      if (questionAnswered === false && counter > 0) {
        this.setState({
          counter: counter - 1,
        });
      } else {
        this.setState({
          buttonClass: true,
          disabled: true,
          nextButtonEnabled: true,
        });
      }
    }, SECONDS);
  }

  saveScore(score = 0, assertion = 0) {
    const playerLocalStorage = localStorage.getItem('state');
    const playerObj = JSON.parse(playerLocalStorage);
    playerObj.player.score += score;
    playerObj.player.assertions += assertion;
    localStorage.setItem('state', JSON.stringify(playerObj));
  }

  handleClick() {
    this.setState((previousState) => ({
      count: previousState.count + 1,
      counter: 30,
      buttonClass: false,
      nextButtonEnabled: false,
      questionAnswered: false,
      disabled: false,
      click: previousState.click + 1,
    }));
  }

  handleButtonClass({ target }) {
    this.setState({
      buttonClass: true,
      nextButtonEnabled: true,
      questionAnswered: true,
    }, () => {
      const btnClass = target.className;
      console.log(target.className);
      this.setScore(btnClass);
    });
  }

  endGame(name, score, url) {
    const { click } = this.state;
    const { history } = this.props;
    const nextQuestion = click + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      let rankLocalStorage = JSON.parse(localStorage.getItem('ranking'));
      if (rankLocalStorage === null) {
        rankLocalStorage = [{ name, score, url }];
        localStorage.setItem('ranking', JSON.stringify(rankLocalStorage));
      } else {
        rankLocalStorage = [...rankLocalStorage, { name, score, url }];
        localStorage.setItem('ranking', JSON.stringify(rankLocalStorage));
      }
      history.push('/feedback');
    }
  }

  fetchAPI() {
    const { dispatchQuestions } = this.props;
    const token = localStorage.getItem('token');
    dispatchQuestions(token);
  }

  render() {
    const {
      count,
      counter,
      buttonClass,
      disabled,
      nextButtonEnabled,
    } = this.state;
    const { success, questions } = this.props;

    let correctAnswer = '';
    let options = '';

    if (success === true) {
      correctAnswer = questions[count].correct_answer;
      options = [...questions[count].incorrect_answers, correctAnswer].sort();
    }

    const player = JSON.parse(localStorage.getItem('state'));

    return (
      <main>
        <header className="header-feedback">
          <div className="name-gravatar">
            <img
              src="https://www.gravatar.com/avatar/U2FsdGVkX1/0pruu96nX+mxAf7RfQMQkMZtZkuRzURjq4qlGV8CuxdxxfiNbXApZ"
              alt="logo-gravatar"
              data-testid="header-profile-picture"
            />
            <p data-testid="header-player-name">{player.player.name}</p>
          </div>
          <p data-testid="header-score">{`Score: ${player.player.score}`}</p>
        </header>

        <span>{counter}</span>
        { success ? (
          <section>
            <h2 data-testid="question-category">
              { questions[count].category }
            </h2>

            <p data-testid="question-text">
              { questions[count].question }
            </p>

            {options.map((option, index) => (
              <section key={ index }>
                <button
                  type="button"
                  data-testid={ option === correctAnswer ? 'correct-answer'
                    : `wrong-answer${index}` }
                  disabled={ disabled }
                  onClick={ (event) => {
                    this.handleButtonClass(event);
                  } }
                  className={ option === correctAnswer ? `${buttonClass ? 'correct' : ''}`
                    : `${buttonClass ? 'wrong' : ''}` }
                >
                  {option}
                </button>
              </section>
            ))}

            {nextButtonEnabled ? (
              <button
                data-testid="btn-next"
                type="button"
                onClick={ () => {
                  this.handleClick();
                  this.endGame(player.player.name,
                    player.player.score, player.player.gravatarEmail);
                } }
              >
                Próxima
              </button>
            ) : null }
          </section>
        ) : <span>Loading...</span>}
      </main>
    );
  }
}

Game.propTypes = {
  questions: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  success: PropTypes.bool.isRequired,
  dispatchQuestions: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  success: state.triviaReducer.success,
  questions: state.triviaReducer.questions.results,
});

const mapDispacthToProps = (dispatch) => ({
  dispatchQuestions: (token) => dispatch(triviaAPI(token)),
});

export default connect(mapStateToProps, mapDispacthToProps)(Game);

/*
materiais consultados
  https://github.com/jamesqquick/Build-A-Quiz-App-With-HTML-CSS-and-JavaScript
  https://github.com/ruvictor/quizz-react
  https://github.com/cfleschhut/react-redux-trivia-quiz-game
  https://github.com/jriall/react-redux-quiz-app
  https://github.com/weibenfalk/react-quiz
  https://www.youtube.com/watch?v=tEefDoWz0PI&list=PLEVTJcDnFDm9lpEEHTftRa9JSRV4jY_p9&index=21
*/
