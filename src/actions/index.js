import * as ActionTypes from '../common/ActionTypes';

export const updateScore = (value) => ({
  type: ActionTypes.GAME_UPDATE_SCORE,
  payload: value,
});

export const updateAssert = (value) => ({
  type: ActionTypes.GAME_UPDATE_ASSERT,
  payload: value,
});

export const gameMatchReset = () => ({
  type: ActionTypes.GAME_MATCH_RESET,
});

export const gameMatchUpdate = (assert, score) => ({
  type: ActionTypes.GAME_MATCH_UPDATE,
  payload: {
    assert,
    score,
  },
});
