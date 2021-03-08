// import { LOGIN } from '../actions/login';

const INITIAL_STATE = {
  score: 0,
  userr: {
    name: '',
    email: '',
  } };

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, userr: action.user };
  case 'FEEDBACK':
    return { ...state, score: action.feed };
  default:
    return state;
  }
};

export default user;
