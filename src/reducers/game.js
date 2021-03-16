import { LOGIN, FETCHQUESTIONS, ASSERTIONS_SCORE } from '../actions';

const initialState = {
  email: '',
  name: '',
  questions: [],
  loading: true,
  score: 0,
  assertions: 0,
};
export default function game(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.value.email,
      name: action.value.name,
    };
  case FETCHQUESTIONS:
    return {
      ...state,
      questions: action.questions,
      loading: false,
    };
  case ASSERTIONS_SCORE:
    return {
      ...state,
      assertions: action.value.assertions,
      score: action.value.score,
    };
  default:
    return state;
  }
}
