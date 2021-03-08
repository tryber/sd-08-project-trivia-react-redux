import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import updateTimer from '../store/actions/updateTimer.actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      countingDown: false,
    };

    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const { countingDown } = this.state;
    const ONE_SECOND = 1000;
    if (!countingDown) {
      this.setState({ countingDown: true });
      const answerTimer = setInterval(() => {
        const { timeLeft, updateTimerReducer, answered, timeExpired } = this.props;
        if (answered) {
          clearInterval(answerTimer);
          return;
        }
        if (timeLeft > 0) {
          const newTime = timeLeft - 1;
          updateTimerReducer(newTime);
          return;
        }
        clearInterval(answerTimer);
        timeExpired();
      }, ONE_SECOND);
    }
  }

  render() {
    const { timeLeft } = this.props;
    return (
      <div className="Timer">
        Tempo:
        {' '}
        {timeLeft}
      </div>
    );
  }
}

Timer.propTypes = {
  timeExpired: PropTypes.func.isRequired,
  updateTimerReducer: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
  answered: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  timeLeft: state.updateTimeLeft.timeLeft,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimerReducer: (time) => dispatch(updateTimer(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
