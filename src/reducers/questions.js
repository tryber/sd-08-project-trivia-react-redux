import { RECEIVE_QUESTIONS } from '../actions/fetchQuestions';

const initialState = {
  questions: [],
  loading: true,
};

const questions = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_QUESTIONS:
    console.log(action.payload);
    return ({
      // ...state,
      questions: action.payload.results,
      loading: false,
    });
  default:
    return state;
  }
};

export default questions;
