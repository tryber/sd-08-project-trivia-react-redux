import * as ActionTypes from '../common/ActionTypes';

const INITIAL_STATE = {
  score: 0,
  assert: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ActionTypes.GAME_UPDATE_SCORE:
    return { ...state, score: state.score + action.payload };
  case ActionTypes.GAME_UPDATE_ASSERT:
    return { ...state, assert: state.assert + action.payload };

  default:
    return state;
  }
}
