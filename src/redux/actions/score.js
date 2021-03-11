import { ADD_SCORE, ADD_ASSERTIONS, RESET_SCORE } from './index';

export const actionScore = (score) => ({
  type: ADD_SCORE, payload: { score },
});

export const actionAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: { assertions },
});

export const actionRestScore = () => ({
  type: RESET_SCORE,
});
