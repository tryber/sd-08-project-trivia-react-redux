import {
  SAVE_USER,
} from '../action';

const INITIAL_STATE_USER = {
  name: '',
  email: '',
};

export default function login(state = INITIAL_STATE_USER, action) {
  switch (action.type) {
  case SAVE_USER:
    return {
      ...state,
      name: action.user.name,
      email: action.user.email,
    };
  default:
    return state;
  }
}
