import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toggleSelected, sendScore } from '../redux/actions';

class CardQuestion extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.calcScore = this.calcScore.bind(this);
  }

  handleClick(className) {
    const { toggleSelectedProp } = this.props;
    toggleSelectedProp();

    if (className === 'correct-answer') {
      this.calcScore();
    }
  }

  calcScore() {
    const {
      questions: { difficulty },
      timer,
      sendScoreProp,
    } = this.props;
    let mult = 0;
    const THREE = 3;
    if (difficulty === 'easy') mult = 1;
    if (difficulty === 'medium') mult = 2;
    if (difficulty === 'hard') mult = THREE;
    const TEN = 10;
    const score = TEN + timer * mult;

    sendScoreProp(score);
  }

  render() {
    const { questions, selected } = this.props;
    const { category, question, options } = questions;
    return (
      <div className="question">
        <h1 data-testid="question-category">{category}</h1>
        <h2 data-testid="question-text">{question}</h2>
        {options.map((alternatives) => (
          <button
            type="button"
            key={ alternatives.option }
            data-testid={ alternatives.className }
            disabled={ selected }
            className={
              selected
                ? `btn-question ${alternatives.className}`
                : 'alternative-button btn-question'
            }
            onClick={ () => this.handleClick(alternatives.className) }
          >
            {alternatives.option}
          </button>
        ))}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleSelectedProp: () => dispatch(toggleSelected()),
  sendScoreProp: (score) => dispatch(sendScore(score)),
});

const mapStateToProps = (state) => ({
  selected: state.game.selected,
  timer: state.game.timeLeft,
});

CardQuestion.propTypes = {
  questions: PropTypes.shape().isRequired,
  toggleSelectedProp: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
  sendScoreProp: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CardQuestion);
