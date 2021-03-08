import { QUESTIONS_REQUEST, QUESTIONS_REQUEST_SUCCESS,
  TOKEN_REQUEST, TOKEN_REQUEST_SUCCESS, UPDATE_SCORE,
  ADD_CORRECT_ANSWER, RESET_SCORE_AND_ANSWERS } from '../consts';

const INITIAL_STATE = {
  token: '',
  score: 0,
  isLoading: false,
  isLoadingQuestions: true,
  questions: [],
  id: 0,
  correctAnswers: 0,
};

const play = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TOKEN_REQUEST:
    return { ...state, isLoading: true };
  case TOKEN_REQUEST_SUCCESS:
    return { ...state, token: action.payload, isLoading: false };
  case UPDATE_SCORE:
    return { ...state, score: action.payload };
  case ADD_CORRECT_ANSWER:
    return { ...state, correctAnswers: state.correctAnswers + 1 };
  case QUESTIONS_REQUEST:
    return { ...state, isLoadingQuestions: true };
  case QUESTIONS_REQUEST_SUCCESS:
    return { ...state,
      isLoadingQuestions: false,
      questions: action.payload.questions,
    };
  case RESET_SCORE_AND_ANSWERS:
    return { ...state, ...action.payload };
  default:
    return state;
  }
};

export default play;
