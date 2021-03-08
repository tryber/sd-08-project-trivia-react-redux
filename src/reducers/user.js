import { GET_USER, ADD_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  score: 0,
};

const user = (state = INITIAL_STATE, action) => {
  const { type, name, email, score } = action;
  switch (type) {
  case GET_USER:
    return {
      ...state,
      name,
      email,
    };
  case ADD_SCORE:
    return {
      ...state,
      score,
    };
  default:
    return state;
  }
};

export default user;
