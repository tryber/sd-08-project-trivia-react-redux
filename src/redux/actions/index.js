import md5 from 'crypto-js/md5';

export const FIRST_LOGIN = 'FIRST_LOGIN';
export const TOGGLE_SELECTED = 'TOGGLE_SELECTED';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const SEND_TIME = 'SEND_TIME';
export const SEND_SCORE = 'SEND_SCORE';
export const RETURN_LOGIN = 'RETURN_LOGIN';
export const SET_CUSTOM_SETTINGS = 'SET_CUSTOM_SETTINGS';

export const actionFirstLogin = (state, questions) => ({
  type: FIRST_LOGIN,
  state,
  questions,
});

function requestTokenId() {
  return fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((data) => data.token);
}

function requestQuestions(token, settings) {
  const { amount, category, difficulty, type } = settings;
  const path = `https://opentdb.com/api.php?amount=${amount}${category === 'any' ? '' : `&category=${category}`}${difficulty === 'any' ? '' : `&difficulty=${difficulty}`}${type === 'any' ? '' : `&type=${type}`}&token=${token}`;
  return fetch(path)
    .then((response) => response.json())
    .then((data) => data);
}

export function requestToken(name, email, score, assertions, settings) {
  const errorCode = 3;
  if (localStorage.token === undefined) {
    return async (dispatch) => {
      const token = await requestTokenId();
      const questions = await requestQuestions(token, settings);
      const gravatarEmail = md5(email).toString();
      const state = {
        name,
        assertions,
        score,
        gravatarEmail,
      };
      localStorage.setItem('token', JSON.stringify(token));
      localStorage.setItem('state', JSON.stringify({ player: state }));
      dispatch(actionFirstLogin(state, questions));
    };
  }
  return async (dispatch) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const questions = await requestQuestions(token, settings);
    if (questions.response_code === errorCode) {
      const newToken = await requestTokenId();
      const questionsNewToken = await requestQuestions(newToken, settings);
      const gravatarEmail = md5(email).toString();
      const state = {
        name,
        assertions,
        score,
        gravatarEmail,
      };
      localStorage.setItem('token', JSON.stringify(newToken));
      localStorage.setItem('state', JSON.stringify({ player: state }));
      dispatch(actionFirstLogin(state, questionsNewToken));
    } else {
      const questionsNoErrorCode = await requestQuestions(token, settings);
      const gravatarEmail = md5(email).toString();
      const state = {
        name,
        assertions,
        score,
        gravatarEmail,
      };
      localStorage.setItem('state', JSON.stringify({ player: state }));
      dispatch(actionFirstLogin(state, questionsNoErrorCode));
    }
  };
}

export const toggleSelected = () => ({
  type: TOGGLE_SELECTED,
});

export const startTimerAction = () => ({
  type: NEXT_QUESTION,
});

export const sendTime = (time) => ({
  type: SEND_TIME,
  payload: { time },
});

export const sendScore = (score) => ({
  type: SEND_SCORE,
  payload: { score },
});

export const actionReturnLogin = () => ({
  type: RETURN_LOGIN,
});

export const updateSettings = (settings) => ({
  type: SET_CUSTOM_SETTINGS,
  payload: settings,
});
