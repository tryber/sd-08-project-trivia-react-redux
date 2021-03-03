// Reducers

import { LOGIN, INPUT, REQUEST_TOKEN } from '../actions';

const initialState = {
  email: '',
  name: '',
  token: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case INPUT:
    return {
      ...state,
      [Object.keys(action)[1]]: Object.values(action)[1],
    };
  case LOGIN:
    return {
      ...state,
    };
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  default:
    return state;
  }
}

export default reducer;
