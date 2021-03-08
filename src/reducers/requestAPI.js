import { CLEAR_TOKEN } from '../actions';

const INITIAL_STATE = {
  hasToken: false,
  isFetching: false,
  token: {},
  data: {},
  error: '',
  alternatives: [],
};

export default function requestTokenReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_API':
    return { ...state, isFetching: true };
  case 'GET_TOKEN':
    return { ...state, token: action.payload, isFetching: false, hasToken: true };
  case 'GET_API':
    return { ...state, data: action.payload, isFetching: false };
  case 'FAILED_API':
    return { ...state, error: action.payload, isFetching: false };
  case CLEAR_TOKEN:
    return { ...state, token: {}, hasToken: false };
  default:
    return state;
  }
}
