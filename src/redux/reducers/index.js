import { combineReducers } from 'redux';
import {
  CORRECT_ANSWER,
  CURRENT_SCORE,
  REQUEST_API_TRIVIA,
  REQUEST_ERROR,
  RESCUE_TIME,
  NEXT_QUESTION,
  PLAYER_NAME,
  PLAYER_EMAIL,
  PLAYER_ASSERTIONS,
} from '../action';

const INITIAL_STATE = {
  questions: [],
  currentQuestion: 0,
  correctAnswer: false,
  currentScore: 0,
  rescueTime: 0,
  difficulty: 'easy',
  name: '',
  email: '',
  assertions: 0,
};

const reducerRequestApiTrivia = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API_TRIVIA:
    return { ...state, questions: action.payload };
  case REQUEST_ERROR:
    return { ...state, questions: action.payload };
  case CORRECT_ANSWER:
    return { ...state, correctAnswer: true };
  case RESCUE_TIME:
    return { ...state, rescueTime: action.payload };
  case CURRENT_SCORE:
    return { ...state, currentScore: state.currentScore + action.payload };
  case NEXT_QUESTION:
    return { ...state,
      currentQuestion: state.currentQuestion + 1,
      correctAnswer: false,
      rescueTime: 0 };
  case PLAYER_NAME:
    return { ...state, name: action.payload };
  case PLAYER_EMAIL:
    return { ...state, email: action.payload };
  case PLAYER_ASSERTIONS:
    return { ...state, assertions: state.assertions + 1 };
  default:
    return state;
  }
};

const rootReducer = combineReducers({
  reducerRequestApiTrivia,
});

export default rootReducer;
