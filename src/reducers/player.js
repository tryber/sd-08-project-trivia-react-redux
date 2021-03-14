import INITIAL_STATE from './initialState';

import {
  DATES_USER,
  TOKEN_USER,
  SCORE,
  ASSERTIONS,
  QUESTIONS,
} from '../actions';

/// dessestruturara action
export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DATES_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
      score: action.score,
      assertions: action.assertions,
    };
  case TOKEN_USER:
    return {
      ...state,
      token: action.token,
    };
  case SCORE:
    return {
      ...state,
      score: action.score,
    };
  case ASSERTIONS:
    return {
      ...state,
      assertions: action.assertions,
    };
  case QUESTIONS:
    return {
      ...state,
      // assertions: action.assertions,
      gravatar: action.gravatar,
      questions: action.result,
    };
  default:
    return state;
  }
}
