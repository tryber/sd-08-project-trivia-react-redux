import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timer as setResetTimer, setCurrentTime } from '../redux/actions/timerAction';

const TIMER_TRIVIA = 30;

class Timer extends React.Component {
  constructor() {
    super();
    this.state = {
      time: TIMER_TRIVIA,
    };
    this.startTimer = this.startTimer.bind(this);
    this.restTimer = this.restTimer.bind(this);
  }

  componentDidMount() {
    const { setFuncTimer, setTime: setActualTime } = this.props;
    const { time } = this.state;
    this.startTimer();
    setFuncTimer(this.restTimer);
    setActualTime(time);
  }

  componentDidUpdate(__prevProps, prevState) {
    const { setTime: setActualTime } = this.props;
    const { time } = this.state;
    if (time !== prevState.time) {
      setActualTime(time);
    }
    this.stopTimer();
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  restTimer() {
    this.setState({ time: TIMER_TRIVIA });
    this.startTimer();
  }

  stopTimer() {
    const { stateUpdate, answeredTheQuestion } = this.props;
    const { time } = this.state;
    if (answeredTheQuestion) {
      clearInterval(this.myInterval);
    } else if (time === 0) {
      stateUpdate('answeredTheQuestion', true);
      stateUpdate('rightAnswer', 'wrong');
      clearInterval(this.myInterval);
    }
  }

  startTimer() {
    const oneSecond = 1000;
    this.myInterval = setInterval(() => {
      // this.stopTimer();
      this.setState((state) => ({
        time: state.time - 1,
      }));
    }, oneSecond);
  }

  render() {
    const { time } = this.state;
    return (
      <div>{ time }</div>
    );
  }
}

Timer.propTypes = {
  setFuncTimer: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  stateUpdate: PropTypes.func.isRequired,
  answeredTheQuestion: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setFuncTimer: (callback) => dispatch(setResetTimer(callback)),
  setTime: (timer) => dispatch(setCurrentTime(timer)),
});

export default connect(null, mapDispatchToProps)(Timer);
