import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleSelected, startTimerAction, sendTime } from '../redux/actions';

class Time extends React.Component {
  constructor() {
    super();
    this.timeSecond = this.timeSecond.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.reStartTimer = this.reStartTimer.bind(this);
    this.sendTime = this.sendTime.bind(this);
    this.state = {
      time: 30,
    };
  }

  componentDidMount() {
    this.timeSecond();
  }

  reStartTimer() {
    const { startTimerProp } = this.props;
    this.setState({ time: 30 });
    startTimerProp();
    this.timeSecond();
  }

  timeSecond() {
    const { toggleSelectedProp } = this.props;
    const oneSecond = 1000;
    this.setI = setInterval(() => {
      this.setState((state) => ({
        time: state.time - 1,
      }));
    }, oneSecond);
    const thirty = 30000;
    this.timeOut = setTimeout(() => {
      clearInterval(this.setI);
      toggleSelectedProp();
    }, thirty);
  }

  sendTime() {
    const { time } = this.state;
    const { sendTimeProp } = this.props;
    sendTimeProp(time);
  }

  stopTimer() {
    clearInterval(this.setI);
    clearInterval(this.timeOut);
  }

  render() {
    const { selected, startTimer } = this.props;
    const { time } = this.state;
    if (selected) {
      this.stopTimer();
      this.sendTime();
    }
    if (startTimer) {
      this.reStartTimer();
    }
    return (
      <div className="timer">
        <p>{time}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selected: state.game.selected,
  startTimer: state.game.startTimer,
});

const mapDispatchToProps = (dispatch) => ({
  toggleSelectedProp: () => dispatch(toggleSelected()),
  startTimerProp: () => dispatch(startTimerAction()),
  sendTimeProp: (time) => dispatch(sendTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);

Time.propTypes = {
  selected: PropTypes.bool.isRequired,
  startTimer: PropTypes.bool.isRequired,
  startTimerProp: PropTypes.func.isRequired,
  toggleSelectedProp: PropTypes.func.isRequired,
  sendTimeProp: PropTypes.func.isRequired,
};
