import { GET_SCORE, HANDLE_UPDATE_CORRECT_ANSWERS } from '../actions';

const INITIAL_STATE = {
  score: 0,
  correctAnswers: 0,
};

const score = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_SCORE:
    return {
      ...state,
      score: payload,
    };
  case HANDLE_UPDATE_CORRECT_ANSWERS:
    return {
      ...state,
      correctAnswers: state.correctAnswers + 1,
    };
  default:
    return state;
  }
};

export default score;
