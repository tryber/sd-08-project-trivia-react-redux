import fetchQuestionsAPI from '../services/fetchQuestionsAPI';

export const LOGIN = 'LOGIN';
export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_REQUEST = 'FAILED_REQUEST';
export const SAVE = 'SAVE';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const UPDATE_SCORE = 'UPDATE_SCORE';

export const saveLoginInfo = ({ email, playerName }) => ({
  type: LOGIN,
  payload: { email, playerName },
});

export const updateScore = (score) => ({
  type: UPDATE_SCORE,
  payload: Number(score),
});

function getToken(json) {
  return {
    type: GET_TOKEN,
    payload: json.token,
  };
}

function failedRequest(error) {
  return { type: FAILED_REQUEST, payload: error };
}

export function saveConfig(obj) {
  return { type: SAVE, payload: obj };
}

export function saveQuestions(obj) {
  return { type: SAVE_QUESTIONS, payload: obj };
}

export function getQuestions(obj, token) {
  return async (dispatch) => {
    const questions = await fetchQuestionsAPI(obj, token);
    return dispatch(saveQuestions(questions));
  };
}

export function fetchToken() {
  return (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((r) => r.json()
      .then(
        (json) => dispatch(getToken(json)),
        (error) => dispatch(failedRequest(error)),
      ));
}
