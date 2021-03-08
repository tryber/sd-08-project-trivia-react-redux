import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ButtonNextQuestion extends React.Component {
  render() {
    const {
      totalNumberOfQuestions,
      currentQuestionNumber,
      updateQuestion,
      resetTimer,
      stateUpdate,
    } = this.props;
    if (totalNumberOfQuestions === currentQuestionNumber) {
      return (
        <Link to="/feedback">
          <button data-testid="btn-next" type="button">Feedback</button>
        </Link>
      );
    }
    return (
      <button
        onClick={ () => {
          updateQuestion();
          resetTimer();
          stateUpdate('rightAnswer', '');
        } }
        data-testid="btn-next"
        type="button"
      >
        Próximo
      </button>
    );
  }
}

ButtonNextQuestion.propTypes = {
  totalNumberOfQuestions: PropTypes.number.isRequired,
  currentQuestionNumber: PropTypes.number.isRequired,
  updateQuestion: PropTypes.func.isRequired,
  resetTimer: PropTypes.func.isRequired,
  stateUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ timer }) => ({
  resetTimer: timer.funcRestTimer,
});

export default connect(mapStateToProps, null)(ButtonNextQuestion);
