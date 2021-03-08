import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, connect } from 'react-redux';
import { updateTimer } from '../actions';

function Timer(props) {
  const TIMER_FREQUENCY_MS = 1000;
  const INITIAL_TIMER_VALUE = 30;
  const [counter, setCounter] = React.useState(INITIAL_TIMER_VALUE);

  const hasAnswered = useSelector((state) => state.playerReducer.hasAnswered);
  const { updateTimer: sendUpdate } = props;

  React.useEffect(() => {
    if (counter > 0 && !hasAnswered) {
      setTimeout(() => setCounter(counter - 1), TIMER_FREQUENCY_MS);
      sendUpdate(counter);
    } else {
      sendUpdate(counter);
      setCounter(INITIAL_TIMER_VALUE);
    }
  }, [counter, hasAnswered, sendUpdate]);

  return (
    <span>{counter}</span>
  );
}

Timer.propTypes = {
  updateTimer: PropTypes.func.isRequired,
};

const mapDispatch = {
  updateTimer,
};

export default connect(null, mapDispatch)(Timer);
