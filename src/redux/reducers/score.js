import { ADD_SCORE, ADD_ASSERTIONS, RESET_SCORE } from '../actions';

const INITIAL_STATE = { score: 0, assertions: 0 };

const score = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return { ...state, score: action.payload.score };
  case ADD_ASSERTIONS:
    return { ...state, assertions: action.payload.assertions };
  case RESET_SCORE:
    return { ...state, score: 0 };
  default:
    return state;
  }
};

export default score;
