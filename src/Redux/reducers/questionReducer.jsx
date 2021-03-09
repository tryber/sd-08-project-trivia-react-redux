const INITIAL_STATE = {
  results: [],
  isLoading: false,
};

const questions = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_QUESTION_SENT':
    return { ...state, isLoading: true };
  case 'REQUEST_QUESTION_SUCCESS':
    return { ...state, results: action.value.json, isLoading: false };
  default:
    return state;
  }
};

export default questions;
