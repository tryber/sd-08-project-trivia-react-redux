import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerCount, stopCount } from '../actions/index';

const ONE_SECOND = 1000;
const FULLTIME = 30;
class Countdown extends React.Component {
  constructor() {
    super();

    this.counterd = this.counterd.bind(this);
  }

  componentDidMount() {
    this.counterd();
  }

  componentDidUpdate() {
    const { questions: { countdown: { decrement } } } = this.props;
    if (decrement === 0) { clearInterval(this.counterId); }
    if (decrement === FULLTIME) { this.counterd(); }
  }

  counterd() {
    const { countdownTimer, questions: { countdown: { decrement } } } = this.props;
    let decrementTimer = decrement;
    this.counterId = setInterval(() => {
      decrementTimer -= 1;
      countdownTimer(decrementTimer);
    }, ONE_SECOND);
  }

  render() {
    const { questions: { countdown: { decrement } } } = this.props;
    return (
      <h1>{decrement}</h1>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  countdownTimer: (decrementTimer) => dispatch(timerCount(decrementTimer)),
  stopCount: (bool) => dispatch(stopCount(bool)),
});

const mapStateToProps = (questions) => ({
  questions,
});

Countdown.propTypes = {
  countdownTimer: PropTypes.shape({
    questions: PropTypes.arrayOf(PropTypes.string.isRequired) }).isRequired,
  questions: PropTypes.shape({
    countdown: PropTypes.string.isRequired }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
