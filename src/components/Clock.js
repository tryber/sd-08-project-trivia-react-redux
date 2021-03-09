import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  countDown as countDownAction,
  pause as pauseAction,
} from '../actions';

class Clock extends Component {
  componentDidMount() {
    this.Clock();
  }

  componentWillUnmount() {
    clearInterval(this.Clock);
  }

  Clock() {
    const thousand = 1000;
    setInterval(() => {
      const { timer, pause, paused, countDown } = this.props;
      if (timer > 0 && !paused) {
        countDown();
      }
      if (timer === 0 && !paused) {
        pause();
      }
    }, thousand);
  }

  nextQuestion() {
    this.Clock();
  }

  render() {
    const ten = 10;
    const { timer } = this.props;

    return (
      <div>
        {timer === 0 ? (
          <h3>Tempo esgotado :- \ </h3>
        ) : (
          <h3>
            Timer:
            {timer < ten ? `0${timer}` : timer}
          </h3>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  timer: state.gameReducer.timer,
  paused: state.gameReducer.pause,
});

const mapDispatchToProps = (dispatch) => ({
  countDown: () => dispatch(countDownAction()),
  pause: () => dispatch(pauseAction()),
});

Clock.propTypes = {
  timer: PropTypes.number,
  countDown: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
};

Clock.defaultProps = {
  timer: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(Clock);
