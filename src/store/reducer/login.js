import { LOGIN } from '../consts';

const INITIAL_STATE = {
  username: '',
  email: '',
};

const loginReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOGIN:
    return { ...state,
      email: payload.email,
      username: payload.username,
    };
  default:
    return state;
  }
};

export default loginReducer;
