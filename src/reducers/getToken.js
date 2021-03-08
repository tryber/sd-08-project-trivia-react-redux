const initialState = {
  isFetching: false,
  error: '',
  token: '',
};

const getTokenReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'REQUEST':
    return ({
      ...state,
      isFetching: true,
    });
  case 'FAILED':
    return ({
      ...state,
      isFetching: false,
      error: action.payload,
    });
  case 'RECEIVE_TOKEN':
    return ({
      ...state,
      isFetching: false,
      token: action.payload,
    });

  default:
    return state;
  }
};

export default getTokenReducer;
