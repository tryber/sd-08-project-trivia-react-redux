import * as fetchToken from '../actions';

const INITIAL_STATE = {
  token: [],
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case fetchToken.REQUEST_TOKEN:
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
};

export default tokenReducer;
