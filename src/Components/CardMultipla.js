import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actionss, { remountTimer, timerAction, totalAction } from '../Actions/index';
import '../css/acertoErrocss.css';
import Timer from './Timer';

class CardMultipla extends React.Component {
  constructor() {
    super();
    this.botaoacertoPoints = this.botaoacertoPoints.bind(this);
    this.botaoerradoPoints = this.botaoerradoPoints.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
    this.nextButton = this.nextButton.bind(this);
    this.mix = this.mix.bind(this);
    this.disableButtons = this.disableButtons.bind(this);

    this.state = {
      indice: 0,
      acertos: 0,
      click: false,
      green: '',
      red: '',
      answersToDisplay: [],
      correctAnswers: [],
      forceKey: 0,
      disable: false,
    };
  }

  componentDidMount() {
    const { reqPerguntas } = this.props;
    const token = localStorage.getItem('token');
    reqPerguntas(token).then(() => {
      const { perguntas } = this.props;
      const arr = perguntas[0];
      const answersToDisplay = [];
      const correctAnswers = [];
      arr.map((p) => {
        answersToDisplay.push(this.mix([...p.incorrect_answers, p.correct_answer]));
        correctAnswers.push(p.correct_answer);
        return true;
      });
      this.setState({
        answersToDisplay,
        correctAnswers,
        disable: false,
      });
    });
  }

  disableButtons(getDis) {
    if (getDis) {
      this.setState({ disable: true });
    }
    /* const wrongs = Array.from(document.getElementsByClassName('red'));
    wrongs.map((btn) => btn.disabled = true);
    // document.querySelector('.green').disabled = true; */
  }

  botaoacertoPoints() {
    const { shouldRemount } = this.props;
    const { addAcertos, countTimer } = this.props;
    const { click, acertos } = this.state;
    shouldRemount(true);
    const BASIS_SCORE = 10;
    const ONE = 1;

    const SCORE = BASIS_SCORE + (countTimer);
    this.saveToLocalStorage(acertos + SCORE, ONE);
    if (!click) {
      this.setState((state) => ({
        acertos: state.acertos + SCORE,
        click: true,
        green: 'green',
        red: 'red',
      }));
      addAcertos(acertos + SCORE);
    }
  }

  botaoerradoPoints() {
    const estado = JSON.parse(localStorage.getItem('state'));
    const { score } = estado.player;
    const { shouldRemount } = this.props;
    shouldRemount(true);
    this.setState(() => ({
      click: true,
      red: 'red',
      green: 'green',
    }));
    this.disableButtons();
    this.saveToLocalStorage(score, 0);
  }

  saveToLocalStorage(score, addAssertion) {
    const estado = JSON.parse(localStorage.getItem('state'));
    let { assertions } = estado.player;
    assertions += addAssertion;
    estado.player = { ...estado.player, score, assertions };
    console.log(estado.player);
    localStorage.setItem('state', JSON.stringify(estado));
  }

  nextButton() {
    const { indice, forceKey } = this.state;
    const { history, ajusta, shouldRemount } = this.props;
    const TIMER = 30;
    const INDEX_LIMITER = 4;
    if (indice < INDEX_LIMITER) {
      ajusta(TIMER);
      shouldRemount(true);
      this.setState((state) => ({
        click: false,
        indice: state.indice + 1,
        green: '',
        red: '',
        forceKey: forceKey + 1,
      }));
    } else {
      history.history.push('/feedback');
    }
  }

  mix(arr) {
    const RANDOM = 0.5;
    return arr.sort(() => Math.random() - RANDOM);
  }

  renderBtn() {
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ () => this.nextButton() }
      >
        {' '}
        Proximo
      </button>
    );
  }

  render() {
    const { perguntas, countTimer } = this.props;
    const arr = perguntas[0];
    const { indice, click, green, red, forceKey } = this.state;
    const { answersToDisplay, correctAnswers, disable } = this.state;
    const TWO = 2;
    const THREE = 3;

    return (

      <div>
        <Timer
          key={ forceKey }
          callback={ this.botaoerradoPoints }
          dis={ this.disableButtons }
        />
        <h1 data-testid="question-category">{ arr[indice].category }</h1>
        <p data-testid="question-text">{ arr[indice].question }</p>
        { answersToDisplay[indice] && answersToDisplay[indice].map((answer, i) => {
          if (answer === correctAnswers[indice]) {
            return (
              <button
                type="button"
                className={ green }
                onClick={ (e) => this.botaoacertoPoints(e) }
                key={ answer }
                disabled={ disable }
                data-testid="correct-answer"
              >
                { answer }
              </button>);
          }
          return (
            <button
              type="button"
              className={ red }
              onClick={ (e) => this.botaoerradoPoints(e) }
              key={ answer }
              disabled={ disable }
              data-testid={ `wrong-answer${i <= TWO ? i : THREE}` }
            >
              { answer }
            </button>);
        }) }

        { (click || countTimer === 0) && this.renderBtn() }
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  pontos: state.perguntasReducer.acertos,
  questions: state.perguntasReducer.questions,
  perguntas: state.reqApiReducer.results,
  countTimer: state.timerReducer.timer,
});

const mapDispatchToProps = (dispatch) => ({
  reqPerguntas: (token) => dispatch(actionss(token)),
  addAcertos: (pontos) => dispatch(totalAction(pontos)),
  ajusta: (time) => dispatch(timerAction(time)),
  shouldRemount: (op) => dispatch(remountTimer(op)),
});

CardMultipla.propTypes = {
  reqPerguntas: PropTypes.func.isRequired,
  addAcertos: PropTypes.func.isRequired,
  ajusta: PropTypes.func.isRequired,
  shouldRemount: PropTypes.func.isRequired,

  perguntas: PropTypes.arrayOf(PropTypes.string).isRequired,
  countTimer: PropTypes.number.isRequired,

  history: PropTypes.shape(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardMultipla);
