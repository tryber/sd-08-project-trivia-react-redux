import { REQUEST_TOKEN, RESET_STORE } from '../actions';

const INITIAL_STATE = {

};

const reducerToken = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_TOKEN:
    return ({
      ...state, id: payload });
  case RESET_STORE:
    return ({ ...INITIAL_STATE });
  default:
    return state;
  }
};
export default reducerToken;
