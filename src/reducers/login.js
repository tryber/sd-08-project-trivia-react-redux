import { GET_LOGIN } from '../actions';

const initialState = {
  email: '',
};
const login = (state = initialState, action) => {
  switch (action.type) {
  case GET_LOGIN:
    return ({
      ...state,
      email: action.email,
      name: action.name,
    });
  default:
    return state;
  }
};

export default login;
