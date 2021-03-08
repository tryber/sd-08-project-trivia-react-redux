import { INCREASE_SCORE, ADD_QUESTIONS, ADD_CATEGORIES, SELECT_CATEGORY, SELECT_TYPE,
  DECREASE_TIME, NEXT_QUESTION, RESTART_GAME, SELECT_DIFF } from './index';

export const increaseScore = (assert, difficulty) => ({
  type: INCREASE_SCORE,
  payload: {
    assert,
    difficulty,
  },
});

const addQuestions = (payload) => ({
  type: ADD_QUESTIONS,
  payload,
});

export const getQuestions = (questionsAmount, token,
  categoryId = '0', difficulty = 'All', type = 'All') => (
  async (dispatch) => {
    const url = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}${categoryId === '0' ? '' : `&category=${categoryId}`}${difficulty === 'All' ? '' : `&difficulty=${difficulty}`}${type === 'All' ? '' : `&type=${type}`}`;
    const data = await fetch(url);
    const { results } = await data.json();
    dispatch(addQuestions(results));
  }
);

export const decreaseTime = () => ({
  type: DECREASE_TIME,
});

export const nextQuestion = () => ({
  type: NEXT_QUESTION,
});

export const restartGame = () => ({
  type: RESTART_GAME,
});

const addCategories = (payload) => ({
  type: ADD_CATEGORIES,
  payload,
});

export const getCategories = () => async (dispatch) => {
  const url = 'https://opentdb.com/api_category.php';
  const data = await fetch(url);
  const { trivia_categories: triviaCategories } = await data.json();
  dispatch(addCategories(triviaCategories));
};

export const selectCategory = (payload) => ({
  type: SELECT_CATEGORY,
  payload,
});

export const selectDifficulty = (payload) => ({
  type: SELECT_DIFF,
  payload,
});

export const selectType = (payload) => ({
  type: SELECT_TYPE,
  payload,
});
