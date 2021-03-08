export const REQUEST_API = 'REQUEST_API';
export const GET_API = 'GET_API';
export const FAILED_API = 'FAILED_API';
export const GET_TOKEN = 'GET_TOKEN';
export const CLEAR_TOKEN = 'CLEAR_TOKEN';

export const LOGIN = 'LOGIN';

export const CORRECT = 'CORRECT';
export const HAS_ANSWERED_TRUE = 'HAS_ANSWERED_TRUE';
export const HAS_ANSWERED_FALSE = 'HAS_ANSWERED_FALSE';
export const TIMER_UPDATE = 'TIMER_UPDATE';

export const loginAction = (name, email) => ({
  type: LOGIN,
  payload: {
    name,
    email,
  },
});

export const correctAnswer = (score) => ({
  type: CORRECT,
  payload: score,
});

export const hasAnswered = () => ({
  type: HAS_ANSWERED_TRUE,
});

export const answerFalse = () => ({
  type: HAS_ANSWERED_FALSE,
});

export const updateTimer = (newValue) => ({
  type: TIMER_UPDATE,
  payload: newValue,
});

function getAPI(json) {
  return { type: GET_API, payload: json };
}

function getToken(json) {
  return { type: GET_TOKEN, payload: json };
}

function requestAPI() {
  return { type: REQUEST_API };
}

function failedAPI(error) {
  return { type: FAILED_API, payload: error };
}

export function fetchToken() {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());

      const tokenResponse = await fetch('https://opentdb.com/api_token.php?command=request');
      const tokenJson = await tokenResponse.json();

      dispatch(getToken(tokenJson));
      localStorage.setItem('token', tokenJson.token);

      const triviaResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${tokenJson.token}`);
      const triviaJson = await triviaResponse.json();

      return dispatch(getAPI(triviaJson));
    } catch (error) {
      dispatch(failedAPI(error));
    }
  };
}

export function fetchAPI(token) {
  return async (dispatch) => {
    try {
      dispatch(requestAPI());
      const triviaResponse = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
      const triviaJson = await triviaResponse.json();

      return dispatch(getAPI(triviaJson));
    } catch (error) {
      dispatch(failedAPI(error));
    }
  };
}

export function clearToken() {
  return {
    type: CLEAR_TOKEN,
  };
}
