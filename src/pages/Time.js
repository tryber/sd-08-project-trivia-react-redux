import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleSelected, startTimerAction } from '../redux/actions';

class Time extends React.Component {
  constructor() {
    super();
    this.timeSecond = this.timeSecond.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.reStartTimer = this.reStartTimer.bind(this);
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

  stopTimer() {
    clearInterval(this.setI);
    clearInterval(this.timeOut);
  }

  render() {
    const { selected, startTimer } = this.props;
    const { time } = this.state;
    if (selected) {
      this.stopTimer();
    }
    if (startTimer) {
      this.reStartTimer();
    }
    return (
      <h2>
        { time }
        {/* toggleSelectedProp timer chegar 0 */}
      </h2>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Time);

Time.propTypes = {
  selected: PropTypes.bool.isRequired,
  startTimer: PropTypes.bool.isRequired,
  startTimerProp: PropTypes.func.isRequired,
  toggleSelectedProp: PropTypes.func.isRequired,
};
