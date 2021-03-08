import * as ActionTypes from '../common/ActionTypes';

export const updateScore = (value) => ({
  type: ActionTypes.GAME_UPDATE_SCORE,
  payload: value,
});

export const updateAssert = (value) => ({
  type: ActionTypes.GAME_UPDATE_ASSERT,
  payload: value,
});
