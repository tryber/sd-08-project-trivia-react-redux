import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import {
  apiGetQuestion, playerAssertionsAction, UpdatePlayerScore } from '../Redux/actions';
import '../styles/global.css';

const interval = 1000;
let acertos = 0;
let score = 0;
const acerto = 'certo';
const erro = 'errado';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      time: 30,
      nextButton: false,
      // answers: [],
      // questions: [],

    };
    this.handleColor = this.handleColor.bind(this);
    this.handleClickErro = this.handleClickErro.bind(this);
    this.setCountdown = this.setCountdown.bind(this);
    this.handleScore = this.handleScore.bind(this);
    this.nextQuestionButton = this.nextQuestionButton.bind(this);
  }

  componentDidMount() {
    this.setCountdown();
  }

  componentDidUpdate() {
    this.clearTime();
  }

  setCountdown() {
    this.myVar = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time - 1,
      }));
    }, interval);
  }

  clearTime() {
    const { time } = this.state;
    if (time === 0) {
      clearInterval(this.myVar);
    }
  }

  async nextQuestionButton() {
    const { questionIndex } = this.state;
    const allQuestions = 4;
    if (questionIndex >= allQuestions) {
      const { history } = this.props;
      history.push('/feedback');
    }
    this.setState((prevState) => ({
      questionIndex: prevState.questionIndex + 1,
      time: 30,
    }));
  }

  handleScore(value) {
    const { questions, playerScore } = this.props;
    const { time, questionIndex } = this.state;
    const pointsRule = 10;
    const HARD = 3;
    const MEDIUM = 2;
    const EASY = 1;
    const { difficulty } = questions.results[questionIndex];
    let questionLevel;
    switch (difficulty) {
    case 'hard':
      questionLevel = HARD;
      break;
    case 'medium':
      questionLevel = MEDIUM;
      break;
    case 'easy':
      questionLevel = EASY;
      break;
    default:
    }
    console.log(value);
    if (value === 'certo') {
      score = pointsRule + (time * questionLevel);
      playerScore(score);
      this.setState({ nextButton: true });
    } else {
      score = 0;
      playerScore(score);
      this.setState({ nextButton: true });
    }
  }

  handleClickErro() {
    const botaoErrado = document.getElementsByClassName('questions__button--redColor');
    for (let i = 0; i < botaoErrado.length; i += 1) {
      botaoErrado[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const botaoCerto = document.getElementById('botao-certo');
    botaoCerto.style.border = '3px solid rgb(6, 240, 15)';
    this.handleScore(erro);
  }

  handleColor() {
    const { playerAssertions } = this.props;
    const botaoErrado = document.getElementsByClassName('questions__button--redColor');
    for (let i = 0; i < botaoErrado.length; i += 1) {
      botaoErrado[i].style.border = '3px solid rgb(255, 0, 0)';
    }
    const botaoCerto = document.getElementById('botao-certo');
    botaoCerto.style.border = '3px solid rgb(6, 240, 15)';
    acertos += 1;
    playerAssertions(acertos);
    this.handleScore(acerto);
  }

  render() {
    const { questions } = this.props;
    const { questionIndex, time, nextButton } = this.state;
    const finishedTime = time === 0;
    // const allQuestions = 4;

    // if (questionIndex === allQuestions) return <Redirect to="/feedback" />;

    if (questions.isLoading) {
      return (
        <h3>Gerando Perguntas...</h3>
      );
    }
    return (
      <div>
        <h3 data-testid="question-category">
          Categoria:
          { questions.results[questionIndex].category }
        </h3>
        <div>
          <h4>Pergunta</h4>
          <p data-testid="question-text">{ questions.results[questionIndex].question }</p>
        </div>
        <div>
          <h5>Opções</h5>
          <button
            disabled={ finishedTime }
            type="button"
            data-testid="correct-answer"
            className="questions__button--greenColor"
            onClick={ this.handleColor }
            id="botao-certo"
          >
            { questions.results[questionIndex].correct_answer }
          </button>
          { questions.results[questionIndex].incorrect_answers.map((text, index) => (
            <button
              disabled={ finishedTime }
              key={ index }
              type="button"
              data-testid={ `wrong-answer-${index}` }
              className="questions__button--redColor"
              id="resposta-errada"
              onClick={ () => {
                this.handleClickErro();
              } }
            >
              {text}
            </button>))}
        </div>
        <span>{time}</span>
        {nextButton && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ () => {
              this.nextQuestionButton();
            } }
          >
            Próxima
          </button>)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions,
  player: state.player,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestion: (value) => dispatch(apiGetQuestion(value)),
  playerScore: (value) => dispatch(UpdatePlayerScore(value)),
  playerAssertions: (value) => dispatch(playerAssertionsAction(value)),
});

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  playerScore: PropTypes.number.isRequired,
  playerAssertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Questions));
