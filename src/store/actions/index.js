import { LOGIN, REQUEST_API, REQUEST_API_SUCESS, REQUEST_API_ERROR } from '../consts';
import { requestTriviaQuestion } from '../../services/API';

export const loginAction = (email, username) => ({
  type: LOGIN,
  payload: {
    email,
    username,
  },
});

export const requireAPITrivia = () => ({
  type: REQUEST_API,
  payload: {
    isFetching: true,
  },
});

export const requireAPITriviaSucess = (data) => ({
  type: REQUEST_API_SUCESS,
  payload: {
    data,
    isFetching: false,
  },
});

export const requireAPITriviaError = (error) => ({
  type: REQUEST_API_ERROR,
  payload: {
    error,
    isFetching: false,
  },
});

export const fetchAPITrivia = (token) => async (dispatch) => {
  dispatch(requireAPITrivia());
  try {
    const numberQuestion = 5;
    const data = await requestTriviaQuestion(token, numberQuestion);
    dispatch(requireAPITriviaSucess(data));
  } catch (error) {
    dispatch(requireAPITriviaError(error));
  }
};
