import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../App.css';

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      questionNumber: 0,
      disabled: false,
      invisible: true,
      time: 30,
      dificuldade: {
        hard: 3,
        medium: 2,
        easy: 1,
      },
      totalScore: 0,
    };
    this.mainReder = this.mainRender.bind(this);
    this.disabledAnswers = this.disabledAnswers.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.timer = this.timer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.correctAnswer = this.correctAnswer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(this.timer, ONE_SECOND);
  }

  disabledAnswers() {
    this.setState({
      disabled: true,
      invisible: false,
    });
    clearInterval(this.intervalId);
  }

  nextQuestion() {
    const { questionNumber } = this.state;
    const { history } = this.props;
    const four = 4;
    this.setState({
      questionNumber: questionNumber + 1,
      disabled: false,
      invisible: true,
    });
    if (questionNumber === four) return history.push('/feedback');
  }

  timer() {
    const { time } = this.state;
    const newTime = time - 1;
    this.setState({
      time: newTime,
    });
    if (newTime === 0) { this.disabledAnswers(); }
  }

  resetTimer() {
    this.setState({
      time: 30,
    });
    const ONE_SECOND = 1000;
    this.intervalId = setInterval(this.timer, ONE_SECOND);
  }

  correctAnswer() {
    const { time, dificuldade, questionNumber, totalScore } = this.state;
    const { questions } = this.props;
    const hardCore = questions.results[questionNumber].difficulty;
    const ten = 10;
    const score = totalScore + ten + (time * dificuldade[hardCore]);
    this.setState({
      totalScore: score,
    });
    const localValue = JSON.parse(localStorage.getItem('state'));
    localValue.player.score = score;
    localValue.player.assertions += 1;
    localStorage.setItem('state', JSON.stringify(localValue));
  }

  mainRender() {
    const { questionNumber, disabled, time } = this.state;
    const { questions } = this.props;
    const dorEsofrimento = questions.results;
    const question = dorEsofrimento[questionNumber];
    const audioRight = new Audio('/certa-resposta.mp3');
    const audioWrong = new Audio('/faustao-errou.mp3');
    const questionsList = [...question.incorrect_answers, question.correct_answer];
    const questionsListOrder = questionsList.sort();
    console.log(questionsListOrder);
    return (
      <main>
        <p>{time}</p>
        <p data-testid="question-category">{ question.category }</p>
        <p data-testid="question-text">{question.question}</p>
        {questionsListOrder.map((quest, index) => {
          if (quest === question.correct_answer) {
            console.log(quest);
            return (
              <button
                className="correct-answer"
                disabled={ disabled }
                data-testid="correct-answer"
                type="button"
                key={ quest }
                onClick={ () => {
                  this.disabledAnswers(); this.correctAnswer(); audioRight.play();
                } }
              >
                {quest}
              </button>
            );
          }
          console.log(quest);
          return (
            <button
              className="wrong-answer"
              disabled={ disabled }
              data-testid={ `wrong-answer-${index}` }
              key={ quest }
              type="button"
              onClick={ () => { this.disabledAnswers(); audioWrong.play(); } }
            >
              {quest}
            </button>
          );
        })}
      </main>
    );
  }

  feedbackAudio() {
    const { questionNumber } = this.state;
    const { questions } = this.props;
    const questionsLength = questions.results.length;
    const audioBadScore = new Audio('/funk-do-naruto.mp3');
    const audioGoodScore = new Audio('/fausto-fera.mp3');
    const audioPerfectScore = new Audio('/um-milhao.mp3');
    if (questionsLength - 1 === questionNumber) {
      const localValue = JSON.parse(localStorage.getItem('state'));
      if (localValue.player.assertions <= 2) {
        audioBadScore.play();
      } else if (localValue.player.assertions < questionsLength) {
        audioGoodScore.play();
      } else {
        audioPerfectScore.play();
      }
    }
  }

  render() {
    const { invisible, totalScore } = this.state;
    const { loading } = this.props;
    return (
      <div>
        <Header score={ totalScore } />
        <div>
          {(loading) ? <p>loading...</p> : this.mainRender()}
        </div>
        <button
          onClick={
            () => { this.nextQuestion(); this.resetTimer(); this.feedbackAudio(); }
          }
          hidden={ invisible }
          data-testid="btn-next"
          type="button"
        >
          Próxima

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.allQuestions,
  loading: state.question.loading,
});

Questions.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Questions);
