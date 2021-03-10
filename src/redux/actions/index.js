// Action

export const LOGIN = 'LOGIN';
export const INPUT = 'INPUT';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const SCORE = 'SCORE';

export const login = (payload) => ({
  type: LOGIN,
  payload,
});

export const handleInput = (position, input) => ({
  type: INPUT,
  [position]: input,
});

// const requestToken = (token) => localStorage.setItem('token', token.token) && ({
//   type: REQUEST_TOKEN,
//   token,
//   // a: localStorage.setItem('token', token.token),
// });

export const handleScore = (score) => ({
  type: SCORE,
  score,
});

const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export function fetchToken() {
  return async (dispatch) => fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => response.json())
    .then((token) => dispatch({ type: REQUEST_TOKEN,
      token,
      a: localStorage.setItem('token', token.token) }));
  // .then((token) => dispatch(requestToken(token)))
}

export function fetchQuestions(token) {
  return async (dispatch) => fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
    .then((response) => response.json())
    .then((questions) => dispatch(getQuestions(questions)));
}
