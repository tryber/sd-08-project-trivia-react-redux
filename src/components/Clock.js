import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  countDown as countDownAction,
  finishQuestion as finishQuestionAction,
} from '../actions';

class Clock extends Component {
  componentDidMount() {
    this.Clock();
  }

  componentWillUnmount() {
    clearInterval(this.Clock);
  }

  Clock() {
    const thousand = 1000;
    setInterval(() => {
      const { timer, countDown, finishQuestion } = this.props;
      if (timer > 0) {
        countDown();
      }
      if (timer === 0) {
        finishQuestion();
        clearInterval(this.Clock);
      }
    }, thousand);
  }

  nextQuestion() {
    this.Clock();
  }

  render() {
    const ten = 10;
    const { timer } = this.props;

    return (
      <div>
        {timer === null ? (
          <h1>Tempo esgotado :- \ </h1>
        ) : (
          <h1>
            Tempo Restante:
            {timer < ten ? `0${timer}` : timer}
          </h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.gameReducer.timer,
});

});
const mapDispatchToProps = (dispatch) => ({
  finishQuestion: () => dispatch(finishQuestionAction()),
  countDown: () => dispatch(countDownAction()),
});

Clock.propTypes = {
  timer: PropTypes.number,
  finishQuestion: PropTypes.func.isRequired,
  countDown: PropTypes.func.isRequired,
};

Clock.defaultProps = {
  timer: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
