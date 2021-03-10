import { SAVE_QUESTIONS, SAVE_TIME, RESET_TIMER, UNRESET } from '../actions';

const INITIAL_STATE = {
  isLoading: true,
  questions: {
    response_code: null,
    results: [{
      category: '',
      correct_answer: '',
      difficulty: '',
      incorrect_answers: [''],
      question: '',
      type: 'none',
    }],
  },
  timer: 30,
  reseted: true,
};

export default function triviaGame(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case SAVE_QUESTIONS:
    return {
      ...state,
      questions: payload.questions,
    };
  case SAVE_TIME:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case RESET_TIMER:
    return {
      ...state,
      timer: 30,
      reseted: true,
    };
  case UNRESET:
    return {
      ...state,
      reseted: false,
    };
  default:
    return state;
  }
}
