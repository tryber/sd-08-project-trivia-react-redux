import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import CardQuestion from './CardQuestion';
import Time from './Time';
import { toggleSelected, startTimerAction } from '../redux/actions';

class Game extends React.Component {
  constructor() {
    super();
    this.handleCLick = this.handleCLick.bind(this);
    this.state = {
      questionIndex: 0,
    };
  }

  handleCLick() {
    const { history, questions } = this.props;
    const questionsSize = questions.length - 1;
    const { questionIndex } = this.state;
    const { toggleSelectedProp, nextQuestionProp } = this.props;
    if (questionIndex === questionsSize) {
      history.push('/feedback');
    }
    if (questionIndex < questionsSize) {
      toggleSelectedProp();
      nextQuestionProp();
      this.setState((previousState) => ({
        questionIndex: previousState.questionIndex + 1,
      }));
    }
  }

  mapQuestions(questions) {
    return questions.map((question) => {
      const questionInfo = {
        category: question.category,
        type: question.type,
        difficulty: question.difficulty,
        question: question.question,
      };
      const correctOption = [
        { option: question.correct_answer, className: 'correct-answer' },
      ];
      const wrongOptions = question.incorrect_answers.map((wrongOption) => ({
        option: wrongOption,
        className: 'wrong-answer',
      }));
      const options = [...correctOption, ...wrongOptions];
      const shuffleOptions = options;
      questionInfo.options = shuffleOptions;
      return questionInfo;
    });
  }

  render() {
    const { questionIndex } = this.state;
    const { questions, selected } = this.props;
    const shuffleOptions = this.mapQuestions(questions);
    return (
      <div>
        <Header />
        <Time />
        <CardQuestion questions={ shuffleOptions[questionIndex] } />
        {selected ? (
          <div className="button-flex">
            <button
              className="btn btn-success"
              type="button"
              data-testid="btn-next"
              onClick={ this.handleCLick }
            >
              Próximo
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.login.questions,
  selected: state.game.selected,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSelectedProp: () => dispatch(toggleSelected()),
  nextQuestionProp: () => dispatch(startTimerAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleSelectedProp: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  nextQuestionProp: PropTypes.func.isRequired,
  history: PropTypes.shape([]).isRequired,
};
