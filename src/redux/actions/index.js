export const API_SUCCESS = 'API_SUCCESS';
export const API_FAIL = 'API_FAIL';
export const QUESTIONS_REQUEST = 'QUESTIONS_REQUEST';
export const QUESTIONS_SUCCESS = 'QUESTIONS_SUCCESS';
export const QUESTIONS_ERROR = 'QUESTIONS_ERROR';
export const INCREASE_SCORE = 'INCREASE_SCORE';

// seria legal a gente separar as funções getToken e getQuestions?

const requestApiSuccess = (api) => ({
  type: API_SUCCESS,
  payload: {
    api,
  },
});

const requestApiFail = (error) => ({
  type: API_FAIL,
  payload: {
    error,
  },
});

export const questionsRequest = () => ({
  type: QUESTIONS_REQUEST,
});

export const questionsSuccess = (questions) => ({
  type: QUESTIONS_SUCCESS,
  questions,
});

export const questionsError = (error) => ({
  type: QUESTIONS_ERROR,
  error,
});

export const increaseScore = (score) => ({
  type: INCREASE_SCORE,
  score,
});

export const fetchAPI = () => async (dispatch) => {
  try {
    const tokenRequest = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenReturn = await tokenRequest.json();
    localStorage.setItem('token', tokenReturn.token);
    dispatch(requestApiSuccess());
  } catch (error) {
    dispatch(requestApiFail(error));
  }
};

export const triviaAPI = (token) => async (dispatch) => {
  const questionRequest = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questionsReturn = await questionRequest.json();
  try {
    dispatch(questionsSuccess(questionsReturn));
  } catch (error) {
    dispatch(questionsError(error));
  }
};
