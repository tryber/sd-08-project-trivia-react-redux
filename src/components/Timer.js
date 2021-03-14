import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { contador } from '../actions';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      timer: 30,
      countingDown: false,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    const { time } = this.props;
    const { countingDown } = this.state;
    const ONE_SECOND = 1000;
    if (!countingDown) {
      this.setState({ countingDown: true });
      const answerTimer = setInterval(() => {
        const { answered } = this.props;
        const { timer } = this.state;
        if (answered) {
          clearInterval(answerTimer);
          return;
        }
        if (timer > 0) {
          this.setState({ timer: timer - (ONE_SECOND / ONE_SECOND) },
            () => {
            });
          time(timer, countingDown);

          return;
        }
        clearInterval(answerTimer);
      }, ONE_SECOND);
    }
  }

  render() {
    return (
      <div>
        Tempo:
        {' '}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  time: (timer, countof) => dispatch(contador(timer, countof)),
});

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  answered: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(Timer);
