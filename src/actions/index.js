import { ADD_CORRECT_ANSWER, TOKEN_REQUEST,
  TOKEN_REQUEST_SUCCESS, UPDATE_SCORE, urlToken,
  QUESTIONS_REQUEST_SUCCESS, QUESTIONS_REQUEST,
  urlQuestions, HALF_SHUFFLE, RESET_SCORE_AND_ANSWERS } from '../consts';

export const login = (value) => ({ type: 'LOGIN', payload: value });
export const logout = (value) => ({ type: 'LOGOUT', payload: value });

const apiFetchTokenRequest = () => ({
  type: TOKEN_REQUEST,
});

const apiFetchTokenSuccess = (token) => ({
  type: TOKEN_REQUEST_SUCCESS,
  payload: token,
});

export const updateScoreAction = (score) => ({ type: UPDATE_SCORE, payload: score });
export const addCorrectAnswerAction = () => ({ type: ADD_CORRECT_ANSWER });
export const updateScore = (score) => ({ type: UPDATE_SCORE, payload: score });
export const resetScoreAndAnswerAction = () => (
  { type: RESET_SCORE_AND_ANSWERS, payload: { score: 0, correctAnswers: 0 } });

export const apiFetchQuestionsRequest = () => ({
  type: QUESTIONS_REQUEST,
});

export const apiFetchQuestionsSuccess = (questions) => ({
  type: QUESTIONS_REQUEST_SUCCESS,
  payload: { questions },
});

export const fetchApiQuestions = (token) => (dispatch) => {
  dispatch(apiFetchQuestionsRequest());
  return fetch(urlQuestions(token))
    .then((json) => json.json())
    .then((data) => dispatch(apiFetchQuestionsSuccess(data)))
    .catch((error) => console.log(error));
};

export const fetchApiToken = () => (dispatch) => {
  let token = '';
  dispatch(apiFetchTokenRequest());
  return fetch(urlToken)
    .then((response) => response.json())
    .then((data) => {
      dispatch(apiFetchTokenSuccess(data.token));
      localStorage.token = data.token;
      token = data.token;
    })
    .then(() => dispatch(apiFetchQuestionsRequest()))
    .then(() => fetch(urlQuestions(token)))
    .then((json) => json.json())
    .then((data) => data.results.map((question) => {
      const answers = [...question.incorrect_answers, question.correct_answer]
        .map((answer, index, arr) => {
          if (index === arr.length - 1) return { text: answer, isCorrect: true };
          return { text: answer, isCorrect: false };
        }).sort(() => Math.random() - HALF_SHUFFLE);
      return { ...question, answers };
    }))
    .then((data) => dispatch(apiFetchQuestionsSuccess(data)))
    .catch((error) => console.log(error));
};
