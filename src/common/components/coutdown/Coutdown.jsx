import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { currentTimer, stopTime } from '../../../store/actions/coutdown';

class Coutdown extends Component {
  constructor(props) {
    super(props);
    const { initialTime } = this.props;
    this.state = {
      coutdownTimer: initialTime,
    };

    this.setTimer = this.setTimer.bind(this);
  }

  componentDidMount() {
    const ONE_SECOND = 1000;
    this.timeInterval = setInterval(() => this.setTimer(), ONE_SECOND);
  }

  componentDidUpdate() {
    this.verifyTimer();
    console.log('atualizou');
  }

  setTimer() {
    const { coutdownTimer } = this.state;
    this.setState({ coutdownTimer: coutdownTimer - 1 });
  }

  verifyTimer() {
    const { coutdownTimer } = this.state;
    const { stop, setReduxTimer } = this.props;
    if (coutdownTimer === 0 && !stop) return this.clearTimer();
    if (stop) {
      setReduxTimer(coutdownTimer);
      clearInterval(this.timeInterval);
    }
  }

  clearTimer() {
    const { setStop } = this.props;
    setStop(true);
    clearInterval(this.timeInterval);
  }

  render() {
    const { coutdownTimer } = this.state;
    return (
      <span>{ coutdownTimer }</span>
    );
  }
}

const mapStateToProps = (state) => ({
  stop: state.coutdown.stop,
  initialTime: state.coutdown.initialTime,
});

const mapDispacthToProps = (dispatch) => ({
  setReduxTimer: (time) => dispatch(currentTimer(time)),
  setStop: (bool) => dispatch(stopTime(bool)),
});

Coutdown.propTypes = {
  stop: PropTypes.bool.isRequired,
  setStop: PropTypes.func.isRequired,
  setReduxTimer: PropTypes.func.isRequired,
  initialTime: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispacthToProps)(Coutdown);
