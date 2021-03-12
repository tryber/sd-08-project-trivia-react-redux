import { QUESTIONS } from '../actions';

const INITIAL_STATE = '';

function questionsForTrivia(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case QUESTIONS:
    return payload.questions;
  default:
    return state;
  }
}

export default questionsForTrivia;
