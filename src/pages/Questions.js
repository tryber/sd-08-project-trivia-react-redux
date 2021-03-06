import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { actionLoadedQuestions } from '../actions/triviaActions';

const THIRTY_SECONDS = 30000;
const FIVE_SECONDS = 5000;
const HALF_SECOND = 500;

class Questions extends Component {
  constructor() {
    super();
    this.state = {
      token: localStorage.getItem('token'),
      currentQuestion: 0,
      goToFeedback: false,
      startTimer: 0,
      isTimeout: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.startTime = this.startTime.bind(this);
    this.showTime = this.showTime.bind(this);
    this.showTime = this.showTime.bind(this);
  }

  componentDidMount() {
    const { loadedQuestions } = this.props;
    const { token } = this.state;
    loadedQuestions(token);
  }

  //   useEffect(() => {
  //     const timer = setInterval(() => { // Creates an interval which will update the current data every minute
  //     // This will trigger a rerender every component that uses the useDate hook.
  //     setDate(new Date());
  //   }, 60 * 1000);
  //   return () => {
  //     clearInterval(timer); // Return a funtion to clear the timer so that it will stop being called on unmount
  //   }
  // }, []);

  handleClick() {
    const { currentQuestion } = this.state;
    const { resultQuestions = [] } = this.props;
    const amountAnswers = resultQuestions.length - 1;
    this.startTime();
    this.setState({ isTimeout: false });

    if (currentQuestion < amountAnswers) {
      this.setState({ currentQuestion: currentQuestion + 1 });
    } else {
      this.setState({ goToFeedback: true });
    }
  }

  startTime() {
    const now = Date.now();
    this.setState({ startTimer: now });
    console.log(now);
  }

  showTime() {
    const { startTimer } = this.state;
    const now = Date.now();
    console.log(now);
    return now - startTimer;
  }

  // https://stackoverflow.com/a/42182294/14424360
  decode(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  }
  // const [counter, setCounter] = React.useState(60);
  // useEffect(() => {
  //   counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  // }, [counter]);

  render() {
    let showAnswers = window.setTimeout(() => (
      console.log('Mostra as respostas')), FIVE_SECONDS);
    const initialTimer = setTimeout(() => {
      this.setState({ isTimeout: true });
      console.log('Trava as questões');
      showAnswers = window.setTimeout(() => (
        console.log('Mostra as respostas')), FIVE_SECONDS);
    }, THIRTY_SECONDS);
    const { resultQuestions = [] } = this.props;
    const { currentQuestion, goToFeedback, isTimeout } = this.state;
    if (goToFeedback) { return <Redirect to="/feedback" />; }
    if (!resultQuestions.length) {
      return <div>carregando...</div>;
    }
    return (
      <div>
        {() => this.startTimer()}
        <Header />
        <div>
          <h1
            data-testid="question-category"
          >
            {this.decode(resultQuestions[currentQuestion].category)}
          </h1>
          <h1
            data-testid="question-text"
          >
            {this.decode(resultQuestions[currentQuestion].question)}
          </h1>
          <h2>
            {this.decode(setInterval(this.showTime()), HALF_SECOND)}
          </h2>
          {console.log('Zera os timer')}
          { window.clearTimeout(initialTimer)}
          { window.clearTimeout(showAnswers)}
          {initialTimer }
          {/* =  setTimeout(() =>{
      this.setState({ isTimeout: true })
      console.log('Trava as questões')
       showAnswers = window.setTimeout(() =>( console.log('Mostra as respostas')) , FIVE_SECONDS);
   } ,THIRTY_SECONDS)} */}
          <button
            type="button"
            data-testid="correct-answer"
            disabled={ isTimeout }
          >
            {this.decode(resultQuestions[currentQuestion].correct_answer)}
          </button>
          {resultQuestions[currentQuestion].incorrect_answers.map((e, i) => {
            const datatestid = `wrong-answer-${i}`;
            return (
              <button
                key={ i }
                type="button"
                data-testid={ datatestid }
                disabled={ isTimeout }
              >
                {e}

              </button>
            );
          })}
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.handleClick }
        >
          Próxima
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  resultQuestions: state.reducerTrivia.questions,
});

const mapDispatchToProps = (dispatch) => ({
  loadedQuestions: (token) => dispatch(actionLoadedQuestions(token)),
});

Questions.propTypes = {
  resultQuestions: PropTypes.arrayOf.isRequired,
  loadedQuestions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
