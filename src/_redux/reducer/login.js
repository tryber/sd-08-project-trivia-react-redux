import {
  SAVE_USER,
} from '../action';

const INITIAL_STATE_USER = {
  email: '',
  name: '',
};

export default function login(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      email: action.user.email,
      name: action.user.name,
    };
  default:
    return state;
  }
}
