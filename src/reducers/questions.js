const INITIAL_STATE = {
  data: {},
  isFetching: false,
};

function Questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_QUESTION':
    return { ...state, isFetching: true };
  case 'RECEIVE_QUESTION':
    return { ...state, data: action.objectQuestion, isFetching: false };
  default:
    return state;
  }
}

export default Questions;
