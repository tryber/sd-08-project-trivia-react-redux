import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// import { changeState } from '../actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      number: 0,
      hidden: true,
      timer: 30,
      red: '',
      green: '',
      score: 0,
      assertions: 0,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.cronometro = this.cronometro.bind(this);
    this.changeQuestion = this.changeQuestion.bind(this);
    this.scoreCalculator = this.scoreCalculator.bind(this);
  }

  componentDidMount() {
    const seg = 1000;
    setInterval(this.cronometro, seg);
  }

  cronometro() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((anterior) => ({
        ...anterior,
        timer: anterior.timer - 1,
      }));
    } else {
      this.setState({
        timer: 0,
        lock: true,
      });
    }
  }

  changeQuestion() {
    let { number } = this.state;
    const { history } = this.props;
    const maxQuestionsLenght = 4;
    if (number < maxQuestionsLenght) {
      this.setState({ green: '',
        red: '',
        number: number += 1,
        hidden: true,
        timer: 30,
        lock: false,
      });
    } else {
      history.push('./feedback');
    }
  }

  scoreCalculator() {
    const { timer, number } = this.state;
    let { assertions, score } = this.state;
    const { difficulty, name, gravatarEmail, feedback } = this.props;
    const pointCount = 10;
    const hard = 3;
    const medium = 2;
    const easy = 1;
    let difficultyCalculator = 0;
    if (difficulty[number] === 'easy') {
      difficultyCalculator = easy;
    } else if (difficulty[number] === 'medium') {
      difficultyCalculator = medium;
    } else {
      difficultyCalculator = hard;
    }

    score += pointCount + (timer * difficultyCalculator);
    this.setState({ score,
      assertions: assertions += 1,
    });
    const obj = { player: { name,
      assertions,
      score,
      gravatarEmail } };
    const player = JSON.stringify(obj);
    localStorage.setItem('state', player);
    feedback(score);
  }

  renderQuestion() {
    const { questions, wrongAnswers,
      correctsAnswers, categories, difficulty } = this.props;
    const { number, lock, timer } = this.state;
    const { green, red, hidden } = this.state;
    const question1 = questions[number];
    const answer = correctsAnswers[number];
    const wrongs = wrongAnswers[number];
    const category = categories[number];
    return (
      <div>
        <div>{timer}</div>
        <h2 data-testid="question-category">
          {' '}
          Categoria :
          {' '}
          {category}

        </h2>
        {' '}
        <h2 data-testid="question-category">
          {' '}
          Dificuldade :
          {' '}
          {difficulty[number]}

        </h2>
        <h1 data-testid="question-text">{question1}</h1>

        <button
          type="button"
          disabled={ lock }
          onClick={ () => {
            this.setState({ green: 'green',
              red: 'red',
              hidden: false,
            }, () => this.scoreCalculator());
          } }
          data-testid="correct-answer"
          className={ green }
        >
          {answer}

        </button>

        {wrongs && wrongs.map((item, index) => (
          <button
            type="button"
            key={ item }
            data-testid={ `wrong-answer-${index}` }
            className={ red }
            onClick={ () => {
              this.setState({ green: 'green',
                red: 'red',
                hidden: false,
              });
            } }
          >
            {item}
          </button>
        ))}
        <button
          hidden={ hidden }
          type="button"
          data-testid="btn-next"
          onClick={ this.changeQuestion }
        >
          Próxima
        </button>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderQuestion()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  correctsAnswers: state.login.userr.correctsAnswers,
  wrongAnswers: state.login.userr.wrongAnswers,
  categories: state.login.userr.categories,
  questions: state.login.userr.questions,
  difficulty: state.login.userr.difficulty,
  name: state.login.userr.name,
  gravatarEmail: state.login.userr.email,
});

Game.propTypes = {
  questions: PropTypes.shape.isRequired,
  wrongAnswers: PropTypes.shape.isRequired,
  categories: PropTypes.shape.isRequired,
  correctsAnswers: PropTypes.shape.isRequired,
  difficulty: PropTypes.shape.isRequired,
  history: PropTypes.string.isRequired,
  feedback: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  feedback: (feed) => dispatch({ type: 'FEEDBACK', feed }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
