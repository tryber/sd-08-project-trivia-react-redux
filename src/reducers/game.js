import {
  COUNTDOWN,
  CORRECT_ANSWER,
  PAUSE,
  NEXT_QUESTION,
  RESET_GAME,
  REQUEST_TRIVIA_QUESTIONS,
  REQUEST_TRIVIA_QUESTIONS_SUCCESS,
  REQUEST_TRIVIA_QUESTIONS_ERROR,
} from '../actions';

const INITIAL_STATE = {
  isFetching: true,
  timer: 30,
  pause: false,
  currentQuestion: 0,
  assertions: 0,
  score: 0,
};

const gameReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_TRIVIA_QUESTIONS:
    return { ...state, isFetching: payload.isFetching };
  case REQUEST_TRIVIA_QUESTIONS_SUCCESS:
    return {
      ...state,
      questions: payload.questions,
      isFetching: payload.isFetching,
    };
  case REQUEST_TRIVIA_QUESTIONS_ERROR:
    return { ...state, error: payload.error, isFetching: payload.isFetching };
  case COUNTDOWN:
    return { ...state, timer: state.timer - 1 };
  case CORRECT_ANSWER:
    return {
      ...state,
      assertions: state.assertions + 1,
      score: state.score + payload,
    };
  case PAUSE:
    return { ...state, pause: true };
  case NEXT_QUESTION:
    return {
      ...state,
      currentQuestion: state.currentQuestion + 1,
      timer: 30,
      pause: false,
    };
  case RESET_GAME:
    return { ...state, ...INITIAL_STATE };
  default:
    return state;
  }
};

export default gameReducer;
