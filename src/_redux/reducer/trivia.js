import {
  ADD_QUESTIONS,
  ADD_SCORE,
  ADD_SHUFFLED_ARRAY,
  SHUFFLE,
  SELECT_CATEGORY,
  SELECT_DIFFICULTY,
  SELECT_TYPE,
  GET_CATEGORIES,
  REQUEST_FAIL,
  REQUEST_START,
} from '../action';

const INITIAL_STATE = {
  categories: [{ id: '', name: 'Any Category' }],
  category: '',
  difficulty: '',
  questions: [],
  score: 0,
  shuffle: true,
  shuffledArray: [],
  type: '',
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_SCORE:
    return { ...state, score: action.score };
  case ADD_QUESTIONS:
    return { ...state, questions: action.questions };
  case SHUFFLE:
    return { ...state, shuffle: action.boolean };
  case ADD_SHUFFLED_ARRAY:
    return { ...state, shuffledArray: action.array };
  case SELECT_CATEGORY:
    return { ...state, category: action.category };
  case SELECT_DIFFICULTY:
    return { ...state, difficulty: action.difficulty };
  case SELECT_TYPE:
    return { ...state, type: action.type_ };
  case GET_CATEGORIES:
    return {
      ...state,
      categories: state.categories.concat(action.categories),
      isFetching: false,
    };
  case REQUEST_START:
    return { ...state, isFetching: true };
  case REQUEST_FAIL:
    return { ...state, isFetching: false, error: action.error };
  default:
    return state;
  }
};

export default triviaReducer;
