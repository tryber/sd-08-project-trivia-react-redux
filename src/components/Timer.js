import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../store/ducks/game';
import { Creators as TimerActions } from '../store/ducks/timer';

import styles from '../styles/components/Timer.module.css';

class Timer extends Component {
  componentDidMount() {
    const { startTimer } = this.props;
    startTimer();
  }

  render() {
    const { count } = this.props;
    return (
      <div className={ styles.timer }>{ count }</div>
    );
  }
}

Timer.propTypes = {
  count: PropTypes.number.isRequired,
  startTimer: PropTypes.func.isRequired,
};

const mapStateToProps = ({ timer }) => ({
  count: timer.count,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ ...GameActions, ...TimerActions }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
