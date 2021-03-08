import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ONE_SECONDS = 1000;
const TIME = 30;

class CountTime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: TIME,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(
      () => this.increment(), ONE_SECONDS,
    );
  }

  reset() {
    this.setState({ seconds: TIME });
    this.startTimer();
  }

  increment() {
    const { seconds } = this.state;
    const { outOfTime, questionAnswered, setTimer } = this.props;
    if (seconds === 0) clearInterval(this.timer);
    if (seconds >= 1) {
      if (questionAnswered) {
        clearInterval(this.timer);
      } else {
        if (seconds === 1) outOfTime();
        this.setState((state) => ({ seconds: state.seconds - 1 }));
      }
      setTimer(seconds);
    }
  }

  render() {
    const { seconds } = this.state;
    const { reset } = this.props;
    if (reset) this.reset();
    return (
      <div>{seconds}</div>
    );
  }
}

CountTime.propTypes = {
  outOfTime: PropTypes.func.isRequired,
  questionAnswered: PropTypes.bool.isRequired,
  reset: PropTypes.bool.isRequired,
  setTimer: PropTypes.func.isRequired,
};

export default CountTime;
