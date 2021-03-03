import fetchTriviaToken from '../services/api';

export const SAVE_INPUT_VALUE = 'SAVE_INPUT_VALUE';
export const REQUEST_TRIVIA_TOKEN = 'REQUEST_TRIVIA_TOKEN';
export const REQUEST_TRIVIA_TOKEN_SUCCESS = 'REQUEST_TRIVIA_TOKEN_SUCCESS';
export const REQUEST_TRIVIA_TOKEN_ERROR = 'REQUEST_TRIVIA_TOKEN_ERROR';

export const saveInputValues = (payload) => ({
  type: SAVE_INPUT_VALUE,
  payload,
});

export const requestTriviaToken = () => ({
  type: REQUEST_TRIVIA_TOKEN,
  payload: {
    isFetching: true,
  },
});

export const requestTriviaTokenSuccess = (token) => ({
  type: REQUEST_TRIVIA_TOKEN_SUCCESS,
  payload: {
    token,
    isFetching: false,
  },
});

export const requestTriviaTokenError = (error) => ({
  type: REQUEST_TRIVIA_TOKEN_ERROR,
  payload: {
    error,
    isFetching: false,
  },
});

export const getTriviaToken = () => async (dispatch) => {
  dispatch(requestTriviaToken());
  try {
    const tokenResponse = await fetchTriviaToken();
    localStorage.setItem('token', JSON.stringify(tokenResponse.token));
    dispatch(requestTriviaTokenSuccess(tokenResponse.token));
  } catch (error) {
    dispatch(requestTriviaTokenError(error));
  }
};
