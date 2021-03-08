import { REQUEST_API, REQUEST_API_SUCESS, REQUEST_API_ERROR } from '../consts';

const INITIAL_STATE = {
  data: [],
  isFetching: false,
};

const fetchReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_API:
    return { ...state,
      isFetching: true,
    };
  case REQUEST_API_SUCESS:
    return { ...state,
      data: payload.data.results,
      isFetching: false,
    };
  case REQUEST_API_ERROR:
    return { ...state,
      error: payload.error,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default fetchReducer;
