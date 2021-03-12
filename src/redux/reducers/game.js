import { TIMES_OVER } from '../actions';

const INITIAL_STATE = {
  timesOver: 30,
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TIMES_OVER:
    return {
      ...state,
      time: action.time,
    };
  default:
    return state;
  }
}
