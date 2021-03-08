const GET_QUESTIONS = 'GET_QUESTIONS';
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const FAILED_QUESTIONS = 'FAILED_QUESTIONS';

const INITIAL_STATE = {
  isFetching: true,
  questions: [],
  error: '',
};

export default function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_QUESTIONS:
    return { ...state, isFetching: false, questions: action.payload };
  case REQUEST_QUESTIONS:
    return { ...state, isFetching: true };
  case FAILED_QUESTIONS:
    return { ...state, isFetching: false, error: action.payload };
  default:
    return state;
  }
}
