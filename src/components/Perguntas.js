import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../App.css';
import PropTypes from 'prop-types';
import { userAssertion, userScore } from '../actions';

const TRINTA = 30;
const DEZ = 10;
const MIL = 1000;
const ZERO_CINCO = 0.5;

class Perguntas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      shouldRedirect: false,
      right: '',
      wrong: '',
      hide: true,
      timer: 30,
      state: {
        player: {
          name: '',
          assertions: '',
          score: '',
          gravatarEmail: '',
        },
      },

    };
    this.hundleButton = this.hundleButton.bind(this);
    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(() => this.tick(), MIL);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getPerguntas(position) {
    console.log('chamou o get');
    const { perguntasState } = this.props;
    const { right, wrong, timer } = this.state;

    if (perguntasState === undefined) {
      return <p>Loading ...</p>;
    }
    const alternativas = perguntasState.results[position]
      .incorrect_answers.map((e, index) => ({
        correct: false,
        text: e,
        datatestid: `wrong-answer-${index}`,
      }));
    alternativas.push({
      correct: true,
      text: perguntasState.results[position].correct_answer,
      datatestid: 'correct-answer',

    });
    const result = perguntasState !== undefined

    && (
      <div>
        <p data-testid="question-category">
          {perguntasState !== undefined
            ? perguntasState.results[position].category : 'Loading'}
        </p>
        <p data-testid="question-text">
          {perguntasState !== undefined
            ? perguntasState.results[position].question : 'Loading'}
        </p>
        { alternativas !== undefined
          ? alternativas.sort(() => ZERO_CINCO - Math.random()).map((e, index) => (
            <div key={ index }>

              <button
                disabled={ !timer === !0 }
                type="button"
                className={ `null, ${e.correct === true ? right : wrong}` }
                onClick={ () => this.correctAnswerHandler(e, alternativas) }
                data-testid={ e.correct ? 'correct-answer' : `wrong-answer-${index}` }
              >
                {e.text}

              </button>
            </div>
          )) : 'Loading'}
      </div>);
    return result;
  }

  tick() {
    const { timer } = this.state;
    if (timer === 0) {
      clearInterval(this.interval);
      this.setState({
        timer: 0,
        hide: false,
      });
    } else {
      this.setState({
        timer: timer - 1,
      });
    }
  }

  startTimer() {
    this.interval = setInterval(this.tick, MIL);
    this.setState({ });
  }

  reset() {
    this.setState({ timer: 30 });
    clearInterval(this.interval);
  }

  // stopTimer() {
  //   clearInterval(this.interval);
  //   this.setState({ });
  // }

  endOfthegame() {
    const { position } = this.state;
    const { perguntasState } = this.props;
    const alternativas = perguntasState
      .results[position].incorrect_answers.map((e, index) => ({
        correct: false,
        text: e,
        datatestid: `wrong-answer-${index}`,
      }));
    console.log(alternativas.length);
    alternativas.push({
      correct: true,
      text: perguntasState.results[position].correct_answer,
      datatestid: 'correct-answer',

    });
    if (alternativas.length > position) {
      this.setState({ position: position + 1,
        right: '',
        wrong: '',
        hide: true,
      });
    } else {
      this.setState({
        shouldRedirect: true,
      });
    }
  }

  async storageHandle() {
    await this.scoreHandler();
    this.savePlayer();
  }

  storageAssertionHandler() {
    this.savePlayer();
  }

  answersHandler(e) {
    const { timer } = this.state;
    console.log(timer);
    console.log(e);
    this.reset();
    if (e.correct === true) {
      this.setState({
        right: 'right-answer',
        wrong: 'wrong-answer',
        hide: false,

      });
      this.storageHandle();
    }

    this.setState({
      right: 'right-answer',
      wrong: 'wrong-answer',
      hide: false,
    });
    this.savePlayer();
  }

  hundleButton() {
    this.endOfthegame();
    this.reset();
    this.startTimer();
    // clearInterval(this.interval)
  }

  scoreHandler() {
    const { ScoreFunc, perguntasState } = this.props;
    const { position } = this.state;

    const EASY = 1;
    const MEDIUM = 2;
    const HARD = 3;

    const questionLevel = perguntasState.results[position].difficulty;

    let difficulty = 0;
    if (questionLevel === 'easy') difficulty = EASY;
    if (questionLevel === 'medium') difficulty = MEDIUM;
    if (questionLevel === 'hard') difficulty = HARD;

    const { timer } = this.state;
    const TimeLeft = TRINTA - timer;
    const soma = DEZ + (TimeLeft) * (difficulty);
    ScoreFunc(soma);
    this.assertionHandler();
  }

  assertionHandler() {
    const { AssertionFunc } = this.props;
    const acertos = 1;
    AssertionFunc(acertos);
  }

  correctAnswerHandler(e) {
    this.answersHandler(e);
  }

  savePlayer() {
    const { name, email, scoreState, scoreAssertions } = this.props;

    this.setState({
      state: {
        player: {
          name,
          assertions: scoreAssertions,
          score: scoreState,
          gravatarEmail: email,
        } },

    }, () => {
      const { state } = this.state;
      localStorage.setItem('state', JSON.stringify(state));
      console.log(name);
    });
  }

  render() {
    const { position, shouldRedirect, hide, timer } = this.state;
    // console.log(timer)
    if (shouldRedirect) {
      return <Redirect to="/feedback" />;
    }

    return (
      <div>
        <div>
          {timer}
        </div>
        {this.getPerguntas(position) }

        <div />
        <button
          type="button"
          data-testid="btn-next"
          className={ `null, ${hide ? 'hidden' : 'null'} ` }
          onClick={ () => this.hundleButton() }
        >
          Próximo
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ScoreFunc: (value) => dispatch(userScore(value)),
  AssertionFunc: (value) => dispatch(userAssertion(value)),
});

const mapStateToProps = (state) => ({
  perguntasState: state.perguntaReducers.pergunta,
  loadingState: state.perguntaReducers.loading,
  email: state.login.email,
  name: state.login.name,
  scoreState: state.scoreP.score,
  scoreAssertions: state.assertionReducer.assertion,
});

Perguntas.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  scoreState: PropTypes.number.isRequired,
  scoreAssertions: PropTypes.number.isRequired,
  AssertionFunc: PropTypes.func.isRequired,
  ScoreFunc: PropTypes.func.isRequired,
  perguntasState: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Perguntas);
