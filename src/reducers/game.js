import { INCREASE_SCORE, ADD_QUESTIONS,
  DECREASE_TIME, NEXT_QUESTION, RESTART_GAME,
  ADD_CATEGORIES, SELECT_CATEGORY, SELECT_DIFF, SELECT_TYPE } from '../actions';

const INITIAL_STATE = {
  assertions: 0,
  score: 0,
  questions: [],
  timer: 30,
  questionPos: 0,
  categories: [],
  settings: {
    selectedCategory: '0',
    difficulty: 'All',
    type: 'All',
  },
};

const scoreDifficulty = { easy: 1, medium: 2, hard: 3 };
const TEN = 10;
const scoreToBeAdded = (assert, diff, timer) => assert
  * (TEN + (timer * scoreDifficulty[diff]));

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INCREASE_SCORE:
    return { ...state,
      assertions: state.assertions + action.payload.assert,
      score: state.score
      + scoreToBeAdded(action.payload.assert, action.payload.difficulty, state.timer) };
  case ADD_QUESTIONS:
    return { ...state, questions: [...state.questions, ...action.payload] };
  case DECREASE_TIME:
    return { ...state, timer: state.timer - 1 };
  case NEXT_QUESTION:
    return { ...state, questionPos: state.questionPos + 1, timer: 30 };
  case RESTART_GAME:
    return { ...INITIAL_STATE, settings: state.settings };
  case ADD_CATEGORIES:
    return { ...state, categories: action.payload };
  case SELECT_CATEGORY:
    return { ...state,
      settings: { ...state.settings, selectedCategory: action.payload } };
  case SELECT_DIFF:
    return { ...state, settings: { ...state.settings, difficulty: action.payload } };
  case SELECT_TYPE:
    return { ...state, settings: { ...state.settings, type: action.payload } };
  default:
    return state;
  }
};

export default gameReducer;
