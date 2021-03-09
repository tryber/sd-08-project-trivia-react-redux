import { REQUEST_API,
  REQUEST_API_SUCCESS,
  REQUEST_API_ERROR }
  from '../actions';

const INITIAL_STATE = {
  data: [],
};

function fetchAPI(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case REQUEST_API:
    return { ...state, isFetching: payload.isFetching };
  case REQUEST_API_SUCCESS:
    return { ...state, isFetching: payload.isFetching, data: payload.data };
  case REQUEST_API_ERROR:
    return { ...state, isFetching: payload.isFetching, error: payload.error };
  default:
    return state;
  }
}

export default fetchAPI;
