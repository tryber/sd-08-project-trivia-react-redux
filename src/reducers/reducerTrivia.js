import INITIAL_STATE from './initialState';

import {
  QUESTIONS,
  TOKEN_USER,
} from '../actions';

export default function reducerTrivia(state = INITIAL_STATE, action) {
  switch (action.type) {
  case TOKEN_USER:
    return {
      ...state,
      name: action.name,
      email: action.email,
    };
  case QUESTIONS:
    return {
      ...state,
      questions: action.result,
    };
  default:
    return state;
  }
}
