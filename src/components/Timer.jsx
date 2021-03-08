import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  componentDidMount() {
    let INTERVAL = '1000';
    this.myInterval = setInterval(() => {
      const { timer, timeChange, stopTimer, handleClickAnswers } = this.props;
      if (timer === 0 || stopTimer) {
        INTERVAL = '0';
        handleClickAnswers();
      } else {
        timeChange();
      }
    }, parseInt(INTERVAL, 10));
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  render() {
    const { timer } = this.props;

    return (
      <section className="timerDiv">
        <p>{ `Tempo: ${timer}`}</p>
      </section>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  timeChange: PropTypes.func.isRequired,
  stopTimer: PropTypes.bool.isRequired,
  handleClickAnswers: PropTypes.func.isRequired,
};

export default Timer;
