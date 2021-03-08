import { COUNTDOWN, CLEAR_COUNT } from '../actions';

const INITIAL_STATE = { decrement: 30, clearcount: false };

function countdown(state = INITIAL_STATE, { type, decrement, clearcount }) {
  switch (type) {
  case COUNTDOWN:
    return { ...state, decrement };
  case CLEAR_COUNT:
    return { ...state, clearcount };
  default:
    return state;
  }
}

export default countdown;
