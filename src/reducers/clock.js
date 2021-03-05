import { COUNTDOWN, FINISH_QUESTION } from '../actions';

const INITIAL_STATE = {
  timer: 30,
};

const clockCount = (state = INITIAL_STATE, { type }) => {
  switch (type) {
  case COUNTDOWN:
    return { ...state, timer: state.timer - 1 };
  case FINISH_QUESTION:
    return { ...state, timer: null };
  default:
    return state;
  }
};

export default clockCount;
