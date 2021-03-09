export const GET_LOGIN = 'GET_LOGIN';

export const GET_SCORE = 'GET_SCORE';
export const HANDLE_UPDATE_CORRECT_ANSWERS = 'HANDLE_UPDATE_CORRECT_ANSWERS';

export const HANDLE_RESET_STORE = 'HANDLE_RESET_STORE';

export const setLogin = (email, name) => ({
  type: GET_LOGIN,
  email,
  name,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  payload: score,
});

export const handleUpdateCorrectAnswers = () => ({
  type: HANDLE_UPDATE_CORRECT_ANSWERS,
});

export const handleResetStore = () => ({
  type: HANDLE_RESET_STORE,
});
