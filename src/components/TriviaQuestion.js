import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Loading from './Loading';
import Question from './Question';
import Answers from './Answers';

import styles from '../styles/components/TriviaQuestion.module.css';

class TriviaQuestion extends Component {
  render() {
    const { questions } = this.props;

    if (!questions.length) return <Loading />;

    return (
      <div className={ styles.triviaQuestion }>
        <Question />
        <Answers />
      </div>
    );
  }
}

TriviaQuestion.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ game }) => ({
  questions: game.questions,
});

export default connect(mapStateToProps)(TriviaQuestion);
