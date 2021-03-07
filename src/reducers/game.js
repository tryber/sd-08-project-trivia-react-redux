import * as ActionTypes from '../common/ActionTypes';

const INITIAL_STATE = {
  score: 0,
  assert: 0,
  lastgame: {
    assert: 0,
    score: 0,
  },
};

const RESET_LAST_GAME = {
  assert: 0,
  score: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ActionTypes.GAME_UPDATE_SCORE:
    return { ...state, score: state.score + action.payload };
  case ActionTypes.GAME_UPDATE_ASSERT:
    return { ...state, assert: state.assert + action.payload };
  case ActionTypes.GAME_MATCH_RESET:
    return { ...state, lastgame: { ...RESET_LAST_GAME } };
  case ActionTypes.GAME_MATCH_UPDATE:
    return { ...state,
      lastgame: {
        ...state.lastgame,
        ...action.payload,
      },
    };

  default:
    return state;
  }
}
