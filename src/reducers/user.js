import { SAVE_USER } from '../services/consts';

const INITIAL_STATE = {
  email: '',
  name: '',
  hash: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER:
    return { ...state, email: action.email, name: action.name, hash: action.hash };
  default:
    return state;
  }
};

export default user;
