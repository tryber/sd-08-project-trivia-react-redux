import { SAVED_USER } from '../actions';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVED_USER:
    return { ...state, email: action.user.email, name: action.user.name };
  default:
    return state;
  }
};

export default user;
