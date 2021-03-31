import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { connect } from 'react-redux';
import { actionScore, actionAssertions } from '../../redux/actions';
import Question from './Question';

const ONE_SECOND = 1000;
const DIFFICULTY = { hard: 3, medium: 2, easy: 1 };
const TEN = 10;

class CardGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'correct-answer': '',
      'wrong-answer-': '',
      timer: 30,
      disabledButtonsAnswers: false,
      showButtonNext: false,
    };
    this.handleClickAnswers = this.handleClickAnswers.bind(this);
    this.changeColorsAnswersButtons = this.changeColorsAnswersButtons.bind(this);
    this.changeShowNextButton = this.changeShowNextButton.bind(this);
    this.EnableAnswersButtons = this.EnableAnswersButtons.bind(this);
    this.clearColorsAnswersButtons = this.clearColorsAnswersButtons.bind(this);
    this.clearColorAndEnableButtonQuestion = this.clearColorAndEnableButtonQuestion
      .bind(this);
  }

  componentDidMount() { // Muda o horário do timer
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer - 1,
      }));
    }, ONE_SECOND);
  }

  componentDidUpdate() { // desmonta o relógio
    const { timer, disabledButtonsAnswers } = this.state;
    if (timer === 0 || disabledButtonsAnswers) { // condição para desmontar o times limpando o intervalo
      clearInterval(this.intervalId);
    }
  }

  // Funções relacionadas ao clique em algum dos botões de respostas
  sumScore() { // soma o valor do score e salva na store um botão de respostas é clicado
    const { element: { difficulty }, score, saveScoreStore } = this.props;
    const { timer } = this.state;
    const points = TEN + (timer * DIFFICULTY[difficulty]);
    const newScore = score + points;
    saveScoreStore(newScore);
  }

  sumAssertions() { // soma quantidade de perguntas acertada se salvar no store quando um botão de respostas é clicado
    const { saveAssertionsStore, assertions } = this.props;
    const newAssertions = assertions + 1;
    saveAssertionsStore(newAssertions);
  }

  changeColorsAnswersButtons() { // Essas função alterara as cores do botões de repostas quando um deles é clicado.
    this.setState({
      'wrong-answer-': 'red',
      'correct-answer': 'green',
    });
  }

  changeShowNextButton() { // Mostra o botão de próximo quando um botão de respostas é clicado
    this.setState({
      showButtonNext: true,
    });
  }

  changeDisabledAnswersButtons() { // Desabilita os botões de respostas quando um botão de respostas é clicado
    this.setState({
      disabledButtonsAnswers: true,
    });
  }

  handleClickAnswers({ target: { name } }) { // função que gerência qualquer click em um dos botões da resposta
    if (name === 'correct-answer') {
      this.sumScore();
      this.sumAssertions();
    }
    this.changeColorsAnswersButtons();
    this.changeShowNextButton();
    this.changeDisabledAnswersButtons();
  }

  // Funções que envolvem o botão de próxima pergunta
  showNextQuestionButton() { // função que mostra o next question quando um botão de respostas é clicado
    this.setState({
      disabledButtonsAnswers: true,
      showButtonNext: true,
    });
  }

  clearColorsAnswersButtons() { // função que resta as cores dos botões  quando o botão next question é clicado
    this.setState({
      'correct-answer': '',
      'wrong-answer-': '',
    });
  }

  EnableAnswersButtons() { // função que habilita os botões de respostas quando o botão next question é clicado
    this.setState({
      disabledButtonsAnswers: false,
    });
  }

  clearColorAndEnableButtonQuestion() { // chamas as duas funções acima após o botão next question ser clicado
    this.EnableAnswersButtons();
    this.clearColorsAnswersButtons();
  }

  // Funções Gerais
  buttonsAnswersDisabledValidity() { // essa função desabilita os botões das resposta quando o valor do timer é zero ou disabledButtonsAnswers é alterado para o verdadeiro no state do componente
    const { timer, disabledButtonsAnswers } = this.state;
    if (timer === 0 || disabledButtonsAnswers) return true;
  }

  createButtonNextQuestion() { // essa função é chamada dentro do render, ela mostra o botão quando o valor showButtonNext é alterado no state pelo click em algum dos botões de resposta
    const { showButtonNext } = this.state;
    const { changeCount } = this.props;
    if (showButtonNext) {
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

  savePlayerLocalStorage() { // salva dos dados no localStorage a cada pergunta respondida
    const { name, email, score, assertions } = this.props;
    const state = {
      player: {
        name,
        assertions,
        score,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    this.savePlayerLocalStorage(); // Função que salva os dados do jogados no localStorage
    const element = this.props;
    const { timer, 'correct-answer': correct,
      'wrong-answer-': incorrect } = this.state;
    const { category, allAnswer, question } = element.element;
    console.log(allAnswer);
    return (
      <section>
        <Question
          category={ category }
          allAnswer={ allAnswer }
          question={ question }
          timer={ timer }
          correct={ correct }
          incorrect={ incorrect }
          handleClickAnswers={ this.handleClickAnswers } // Aqui é aonde é passado a função que gerência os cliques nas respostas
          buttonsAnswersDisabledValidity={ this.buttonsAnswersDisabledValidity() } // Aqui é aonde é resolvida a função que habita ou botão conforme regra de negocio da função
        />
        {this.createButtonNextQuestion()}
        { /* essa função retorna um valor booleano que
        irá fazer o botão próximo aparecer ou não
        que será mudando quando algum dos botões das resposta for apertado */}
      </section>
    );
  }
}

CardGame.propTypes = {
  element: PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    allAnswer: PropTypes.arrayOf(Array),
  }).isRequired,
  saveScoreStore: PropTypes.func.isRequired,
  changeCount: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  saveAssertionsStore: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.user.name,
  email: state.user.email,
  score: state.score.score,
  assertions: state.score.assertions,
});

const mapDispatchToProps = (dispatch) => ({
  saveScoreStore: (score) => dispatch(actionScore(score)),
  saveAssertionsStore: (assertions) => dispatch(actionAssertions(assertions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardGame);
