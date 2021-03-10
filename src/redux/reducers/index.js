// Reducers

import { LOGIN, INPUT, REQUEST_TOKEN, GET_QUESTIONS, SCORE } from '../actions';

const initialState = {
  email: '',
  name: '',
  token: '',
  questions: [],
  score: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
  case INPUT:
    return {
      ...state,
      [Object.keys(action)[1]]: Object.values(action)[1],
    };
  case LOGIN:
    return {
      ...state,
    };
  case REQUEST_TOKEN:
    return {
      ...state,
      token: action.token,
    };
  case GET_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
    };
  case SCORE:
    return {
      ...state,
      score: action.score,
    };
  default:
    return state;
  }
}

export default reducer;
