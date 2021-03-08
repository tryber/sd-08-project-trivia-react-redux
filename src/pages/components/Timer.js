import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../styles/Timer.css';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.timer = this.timer.bind(this);

    this.state = {
      seconds: 30,
    };
  }

  componentDidMount() {
    this.timer();
  }

  timer() {
    const MIL = 1000;
    const timer = setInterval(() => {
      this.setState((previous) => ({
        seconds: previous.seconds - 1,
      }), () => {
        const { disableBtn } = this.props;
        const { seconds } = this.state;
        if (seconds === 0) {
          clearInterval(timer);
          disableBtn();
        }
        const { stop } = this.props;
        if (stop) {
          clearInterval(timer);
        }
      });
    }, MIL);
  }

  render() {
    const { seconds } = this.state;
    return (
      <div id="time" className="timer-controll">
        {seconds}
      </div>
    );
  }
}

Timer.propTypes = {
  disableBtn: PropTypes.func.isRequired,
  stop: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  stop: state.stopTimer.stop,
});

export default connect(mapStateToProps, null)(Timer);
