import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Timer from './Timer';

import styles from '../styles/components/Question.module.css';

class Question extends Component {
  render() {
    const { questions, currentQuestionIndex } = this.props;
    const currentQuestion = questions[currentQuestionIndex];

    const { category, question } = currentQuestion;

    return (
      <div className={ styles.questionContainer }>
        <div>
          <p className={ styles.category } data-testid="question-category">
            { atob(category) }
          </p>
          <p className={ styles.question } data-testid="question-text">
            { atob(question) }
          </p>
        </div>
        <Timer />
      </div>
    );
  }
}

Question.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
};

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
  currentQuestionIndex: game.currentQuestionIndex,
});

export default connect(mapStateToProps)(Question);
