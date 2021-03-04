import INITIAL_STATE from './initialState';
import { USER_EMAIL, FETCH_GRAVATA } from '../actions/index';

export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case USER_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}
