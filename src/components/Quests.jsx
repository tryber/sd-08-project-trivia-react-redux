import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateScore } from '../redux/actions';
import './css/Quests.css';
import Timer from './Timer';

class Quests extends React.Component {
  constructor() {
    super();

    this.state = {
      questNumber: 0,
      disableBtn: false,
      timer: 30,
      stopTimer: false,
    };

    this.encodeUtf8 = this.encodeUtf8.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickAnswers = this.handleClickAnswers.bind(this);
    this.timeChange = this.timeChange.bind(this);
    this.createNextBtn = this.createNextBtn.bind(this);
    this.saveScore = this.saveScore.bind(this);
  }

  componentDidMount() {
    const { scoreRedux } = this.props;
    localStorage.setItem('score', '0');
    scoreRedux('0');
  }

  encodeUtf8(s) {
    // adapatda da resposta a https://stackoverflow.com/questions/13356493/decode-utf-8-with-javascript
    const specialChars = {
      '&quot;': '"',
      '&#039;': '\'',
      '&amp;': '&',
      '&trade;': '™',
      '&Omicron;': 'ο',
      '&Sigma;': 'σ',
      '&Pi;': 'π',
      '&Nu;': 'ν',
    };
    const accentChar = {
      '&aacute;': 'á',
      '&auml;': 'ä',
      '&aring;': 'å',
      '&eacute;': 'é',
      '&iacute;': 'í',
      '&Uuml;': 'ü',
      '&ouml;': 'ö',
    };
    const decodeSpecialRegex = /&(quot|#039|amp|trade|Omicron|Sigma|Pi|Nu);/gi;
    const decodeAccentRegex = /&(aacute|auml|aring|eacute|iacute|Uuml|ouml);/gi;
    const stringUTF = unescape(encodeURIComponent(s));
    return stringUTF.replace(decodeSpecialRegex, (m) => specialChars[m])
      .replace(decodeAccentRegex, (m) => accentChar[m]);
  }

  handleClickNext() {
    const { questions } = this.props;
    const { questNumber } = this.state;
    let num;
    if (questNumber < questions.length) {
      num = questNumber + 1;
    } else { num = 0; }
    this.setState(() => ({
      questNumber: num,
      disableBtn: false,
      timer: 30,
      stopTimer: false,
    }));
  }

  saveScore(timer, diff, score) {
    const { scoreRedux } = this.props;
    const SUM_TEN = 10;
    let savedScore = localStorage.getItem('score');
    if (savedScore === null) savedScore = Number(score);

    const POINTS_HARD = 3;
    const POINTS_MEDIUM = 2;

    if (diff === 'hard') {
      const calc = SUM_TEN + (timer * POINTS_HARD);
      localStorage.setItem('score', calc + Number(savedScore));
    } else if (diff === 'medium') {
      const calc = SUM_TEN + (timer * POINTS_MEDIUM);
      localStorage.setItem('score', calc + Number(savedScore));
    } else {
      const calc = SUM_TEN + timer;
      localStorage.setItem('score', calc + Number(savedScore));
    }
    const setScore = localStorage.getItem('score');
    scoreRedux(setScore);
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.assertions += 1;
    state.player.score = Number(setScore);
    localStorage.setItem('state', JSON.stringify(state));
  }

  handleClickAnswers(answer, diff) {
    const { timer } = this.state;
    this.setState({
      disableBtn: true,
      stopTimer: true,
    });
    if (answer === 'correct-answer') this.saveScore(timer, diff);
  }

  timeChange() {
    const { timer } = this.state;
    this.setState({ timer: timer - 1 });
  }

  createNextBtn() {
    const { disableBtn } = this.state;
    if (disableBtn) {
      return (
        <button
          className="cool"
          type="button"
          onClick={ () => this.handleClickNext() }
          data-testid="btn-next"
        >
          PRÓXIMA
        </button>
      );
    }
  }

  render() {
    const { questions, score } = this.props;
    const { questNumber, disableBtn, timer, stopTimer } = this.state;
    if (questions.length > 0 && questions.length > questNumber) {
      const random = questions[questNumber].allAnswersRandom;
      const diff = questions[questNumber].difficulty;
      return (
        <div>
          <h2 data-testid="question-category">
            Categoria:
            { questions[questNumber].category }
          </h2>
          <h2 data-testid="question-text">
            { this.encodeUtf8(questions[questNumber].question) }
          </h2>
          <section className="answersDiv">
            {random.map((e, i) => (
              <button
                key={ i }
                type="button"
                data-testid={ e.dataTest }
                disabled={ disableBtn }
                onClick={ () => this.handleClickAnswers(e.dataTest, diff, score) }
                className={ e.dataTest.replace(/-[0-9]/i, '') }
              >
                { this.encodeUtf8(e.answer) }
              </button>

            )) }
          </section>
          <Timer
            timer={ timer }
            timeChange={ this.timeChange }
            stopTimer={ stopTimer }
            handleClickAnswers={ this.handleClickAnswers }
          />
          { this.createNextBtn() }
        </div>
      );
    }
    if (questNumber > 0 && questNumber === questions.length) {
      return (<Redirect to="/feedback" />);
    }
    return (<span>Loading</span>);
  }
}

Quests.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  score: PropTypes.number.isRequired,
  scoreRedux: PropTypes.func.isRequired,
};

Quests.defaultProps = {
  questions: [],
};

const mapStateToProps = (state) => ({
  questions: state.questions.results,
  score: state.update.score,
});

const mapDispatchToProps = (dispatch) => ({
  scoreRedux: (score) => dispatch(updateScore(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Quests);
