import { SEND_SCORE, RETURN_LOGIN } from '../actions';

const INITIAL_STATE = {
  score: 0,
  correctAnswers: 0,
};

export default function scoreReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SEND_SCORE: {
    const getLocalS = JSON.parse(localStorage.getItem('state'));
    const previousScore = getLocalS.player.score;
    getLocalS.player.score = previousScore + action.payload.score;

    const previousAssertion = getLocalS.player.assertions;
    getLocalS.player.assertions = previousAssertion + 1;
    localStorage.setItem('state', JSON.stringify(getLocalS));
    return {
      ...state,
      score: state.score + action.payload.score,
      correctAnswers: state.correctAnswers + 1,
    };
  }
  case RETURN_LOGIN:
    return INITIAL_STATE;
  default:
    return state;
  }
}
