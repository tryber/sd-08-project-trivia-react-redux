import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameTimer from './GameTimer';
import { getPlayer, getPlayerRank } from '../actions';

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correctAnswerClass: '',
      incorrectAnswersClass: '',
      questionIndex: 0,
      nextBtn: false,
      answersBtn: false,
      timer: 30,
      answers: [],
      player: {
        name: '',
        assertions: 0,
        score: 0,
        gravaterEmail: '',
      },
    };
    this.nextQuestion = this.nextQuestion.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.handleQuestions = this.handleQuestions.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.renderAnswers = this.renderAnswers.bind(this);
    this.addScoreOnCorrect = this.addScoreOnCorrect.bind(this);
    this.addScoreOnWrong = this.addScoreOnWrong.bind(this);
    this.setStateAndLocalStorage = this.setStateAndLocalStorage.bind(this);
    this.setPlayerToState = this.setPlayerToState.bind(this);
  }

  componentDidMount() {
    const mSeconds = 1000;
    this.gameTimer = setInterval(() => this.startTimer(), mSeconds);
    this.setPlayerToState();
  }

  componentDidUpdate(prevProps, prevState) {
    const { gameState: { isFetching } } = this.props;
    const { gameState: { isFetching: prevIsFetching } } = prevProps;
    const { questionIndex } = this.state;
    const { questionIndex: prevQuestionIndex } = prevState;
    if (prevIsFetching && !isFetching) {
      const { gameState: { questions } } = this.props;
      const {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questions[questionIndex];
      this.getAnswers(correctAnswer, incorrectAnswers);
    }
    if (!isFetching && prevQuestionIndex !== questionIndex) {
      const { gameState: { questions } } = this.props;
      const {
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      } = questions[questionIndex];
      this.getAnswers(correctAnswer, incorrectAnswers);
    }
  }

  getAnswers(correctAnswer, incorrectAnswers) {
    const answers = incorrectAnswers.map((answer) => ({
      correct: false,
      text: answer,
    }));

    answers.push({
      correct: true,
      text: correctAnswer,
    });
    this.setState({ answers: this.randomizeAnswers(answers) });
  }

  setPlayerToState() {
    const { userState: { email, name } } = this.props;
    const { player } = this.state;
    this.setState({ player: { ...player, gravaterEmail: email, name } });
  }

  setStateAndLocalStorage(addPoints) {
    const { getPlayerAction } = this.props;
    this.setState(({ player: prevPlayer }) => ({ player: {
      ...prevPlayer,
      assertions: prevPlayer.assertions + 1,
      score: prevPlayer.score + addPoints,
    } }),
    () => {
      const { player } = this.state;
      localStorage.setItem('state', JSON.stringify({ player }));
      getPlayerAction(player);
    });
  }

  handleQuestions() {
    this.setState({
      correctAnswerClass: 'correct-answer',
      incorrectAnswersClass: 'incorrect-answers',
      nextBtn: true,
      answersBtn: true,
    });
  }

  startTimer() {
    const { timer } = this.state;
    if (timer > 0) {
      this.setState((prevState) => ({ timer: prevState.timer - 1 }));
    } else {
      clearInterval(this.gameTimer);
      this.handleQuestions();
    }
  }

  async nextQuestion() {
    const { questionIndex } = this.state;
    const totalQuestions = 4;
    this.setState({ nextBtn: false });
    if (questionIndex < totalQuestions) {
      this.setState(({ questionIndex: prevQuestionIndex }) => ({
        questionIndex: prevQuestionIndex + 1,
        correctAnswerClass: '',
        incorrectAnswersClass: '',
        answersBtn: false,
        timer: 30,
      }));
      const mSeconds = 1000;
      // this.gamerTimer --> criando uma "variavel" da classe com o nome gameTimer, tudo isso por casua do bind();
      this.gameTimer = setInterval(() => this.startTimer(), mSeconds);
    } else {
      const { history, getPlayerRankAction } = this.props;
      const { player: { name, score } } = this.state;
      const hash = localStorage.getItem('token');
      console.log(hash);
      const imagemGravatar = `https://www.gravatar.com/avatar/${hash}`;
      const playerRank = {
        name,
        picture: imagemGravatar,
        score,
      };
      await getPlayerRankAction(playerRank);
      const { rankingState } = this.props;
      localStorage.setItem('playersRanking', JSON.stringify(rankingState));
      history.push('/feedback');
    }
  }

  addScoreOnCorrect(difficulty) {
    const { timer } = this.state;
    const difficultyPointsData = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const { hard, medium, easy } = difficultyPointsData;

    let addPoints = 0;
    const basePoint = 10;
    // quebrar em pequanas funcoes

    // if (difficulty === 'hard') {
    //   addPoints += basePoint + (hard * timer);
    //   this.setStateAndLocalStorage(addPoints);
    // }
    // if (difficulty === 'medium') {
    //   addPoints += basePoint + (medium * timer);
    //   this.setStateAndLocalStorage(addPoints);
    // }
    // if (difficulty === 'easy') {
    //   addPoints += basePoint + (easy * timer);
    //   this.setStateAndLocalStorage(addPoints);
    // }

    switch (difficulty) {
    case 'hard':
      addPoints += basePoint + (hard * timer);
      this.setStateAndLocalStorage(addPoints);
      return;
    case 'medium':
      addPoints += basePoint + (medium * timer);
      this.setStateAndLocalStorage(addPoints);
      return;
    case 'easy':
      addPoints += basePoint + (easy * timer);
      this.setStateAndLocalStorage(addPoints);
      return;
    default:
      return null;
    }
  }

  randomizeAnswers(answers) {
    const randomize = 0.5;
    return answers.sort(() => Math.random() - randomize);
  }

  addScoreOnWrong() {
    const { getPlayerAction } = this.props;
    const { player } = this.state;
    localStorage.setItem('state', JSON.stringify({ player }));
    getPlayerAction(player);
  }

  renderAnswers(answers, difficulty) {
    const { correctAnswerClass, incorrectAnswersClass, answersBtn } = this.state;
    return (answers.map((answer, index) => {
      if (answer.correct) {
        return (
          <button
            type="button"
            data-testid="correct-answer"
            key="correct-answer"
            className={ correctAnswerClass }
            onClick={ () => {
              this.handleQuestions();
              clearInterval(this.gameTimer);
              this.addScoreOnCorrect(difficulty);
            } }
            disabled={ answersBtn }
          >
            { answer.text }
          </button>
        );
      }
      return (
        <button
          key={ index }
          type="button"
          data-testid={ `wrong-answer-${index}` }
          className={ incorrectAnswersClass }
          onClick={ () => {
            this.handleQuestions();
            clearInterval(this.gameTimer);
            this.addScoreOnWrong();
          } }
          disabled={ answersBtn }
        >
          { answer.text }
        </button>
      );
    }));
  }

  render() {
    const { gameState: { questions, isFetching } } = this.props;
    const { questionIndex, nextBtn, timer, answers } = this.state;
    if (!isFetching) {
      const { category,
        question,
        difficulty,
      } = questions[questionIndex];
      return (
        <div>
          <GameTimer timer={ timer } />
          <h2 data-testid="question-category">
            Categoria:
            { category }
          </h2>
          <h2 data-testid="question-text">
            Pergunta:
            { question }
          </h2>
          <div>
            { this.renderAnswers(answers, difficulty) }
          </div>
          <button
            type="button"
            className={ nextBtn ? 'next-btn-visible' : 'next-btn-visible-hidden' }
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Próxima
          </button>
        </div>
      );
    }
    return (
      <p>Loading...</p>
    );
  }
}

const mapStateToProps = (state) => ({
  gameState: state.game,
  userState: state.user,
  rankingState: state.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  getPlayerAction: (player) => dispatch(getPlayer(player)),
  getPlayerRankAction: (playerRank) => dispatch(getPlayerRank(playerRank)),
});

Questions.propTypes = {
  gameState: PropTypes.instanceOf(Object).isRequired,
  userState: PropTypes.instanceOf(Object).isRequired,
  rankingState: PropTypes.instanceOf(Array).isRequired,
  getPlayerAction: PropTypes.func.isRequired,
  getPlayerRankAction: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
