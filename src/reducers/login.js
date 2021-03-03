import { SAVE_INPUT_VALUE,
  REQUEST_TRIVIA_TOKEN,
  REQUEST_TRIVIA_TOKEN_SUCCESS,
  REQUEST_TRIVIA_TOKEN_ERROR,
} from '../actions';

const INITIAL_STATE = {};

const loginReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case SAVE_INPUT_VALUE:
    return { ...state, ...payload };
  case REQUEST_TRIVIA_TOKEN:
    return { ...state, isFetching: payload.isFetching };
  case REQUEST_TRIVIA_TOKEN_SUCCESS:
    return { ...state, token: payload.token, isFetching: payload.isFetching };
  case REQUEST_TRIVIA_TOKEN_ERROR:
    return { ...state, error: payload.error, isFetching: payload.isFetching };
  default:
    return state;
  }
};

export default loginReducer;
