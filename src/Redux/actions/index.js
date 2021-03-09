import getTriviaAPI from '../services/fetchAPI';

export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_API = 'REQUEST_API';
export const REQUEST_API_SUCCESS = 'REQUEST_API_SUCCESS';
export const REQUEST_API_ERROR = 'REQUEST_API_ERROR';

const requestSuccess = (token) => ({
  type: REQUEST_TOKEN,
  payload: {
    token,
  },
});

const getFetchAPI = () => (
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const fetchToken = () => async (dispatch) => {
  const token = await getFetchAPI();
  dispatch(requestSuccess(token.token));
};

const requestTriviaAPI = () => ({
  type: REQUEST_API,
  payload: {
    isFetching: true,
  },
});

const requestTriviaAPISuccess = (data) => ({
  type: REQUEST_API_SUCCESS,
  payload: {
    isFetching: false,
    data,
  },
});

const requestTriviaAPIError = (error) => ({
  type: REQUEST_API_ERROR,
  payload: {
    isFetching: false,
    error,
  },
});

export const fetchTriviaAPI = (token) => async (dispatch) => {
  dispatch(requestTriviaAPI());
  try {
    const data = await getTriviaAPI(token);
    dispatch(requestTriviaAPISuccess(data.results));
  } catch (error) {
    dispatch(requestTriviaAPIError(error));
  }
};

export default { fetchToken, fetchTriviaAPI };
