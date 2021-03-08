import getCategoriesFromAPI from '../../services/TriviaAPICategories';

export const SAVE_USER = 'SAVE_USER';
export const ADD_QUESTIONS = 'ADD_QUESTIONS';
export const ADD_SCORE = 'ADD_SCORE';
export const SHUFFLE = 'SHUFFLE';
export const ADD_SHUFFLED_ARRAY = 'ADD_SHUFFLED_ARRAY';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_DIFFICULTY = 'SELECT_DIFFICULTY';
export const SELECT_TYPE = 'SELECT_TYPE';
export const GET_CATEGORIES = 'GET_CATEGORIES';
export const REQUEST_START = 'REQUEST_START';
export const REQUEST_FAIL = 'REQUEST_FAIL';

export const saveUserData = (user) => ({
  type: SAVE_USER,
  user,
});

export const saveQuestions = (questions) => ({
  type: ADD_QUESTIONS,
  questions,
});

export const storeScore = (score) => ({
  type: ADD_SCORE,
  score,
});

export const willShuffle = (boolean) => ({
  type: SHUFFLE,
  boolean,
});

export const saveShuffledArray = (array) => ({
  type: ADD_SHUFFLED_ARRAY,
  array,
});

export const selectCategory = (category) => ({
  type: SELECT_CATEGORY,
  category,
});

export const selectDifficulty = (difficulty) => ({
  type: SELECT_DIFFICULTY,
  difficulty,
});

export const selectType = (type_) => ({
  type: SELECT_TYPE,
  type_,
});

const requestStart = () => ({
  type: REQUEST_START,
});

const requestFail = (error) => ({
  type: REQUEST_FAIL,
  error,
});

const requestCategories = (categories) => ({
  type: GET_CATEGORIES,
  categories,
});

export const getCategoriesAPI = () => async (dispatch) => {
  dispatch(requestStart());
  try {
    const categories = await getCategoriesFromAPI();

    dispatch(requestCategories(categories));
  } catch (error) {
    dispatch(requestFail(error));
  }
};
