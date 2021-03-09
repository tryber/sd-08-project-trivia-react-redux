export const GET_LOGIN = 'GET_LOGIN';

export const GET_SCORE = 'GET_SCORE';
export const HANDLE_UPDATE_CORRECT_ANSWERS = 'HANDLE_UPDATE_CORRECT_ANSWERS';

export const setLogin = (email, name) => ({
  type: GET_LOGIN,
  email,
  name,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  score,
});

export const handleUpdateCorrectAnswers = () => ({
  type: HANDLE_UPDATE_CORRECT_ANSWERS,
});
