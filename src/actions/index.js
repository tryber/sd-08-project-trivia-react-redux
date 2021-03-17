export const SAVED_USER = 'SAVED_USER';
export const SAVED_INPUT = 'SAVED_INPUT';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const GET_TOKEN = 'GET_TOKEN';
export const FAILED_TOKEN = 'FAILED_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const GET_PLAYER = 'GET_PLAYER';
export const GET_PLAYER_RANK = 'GET_PLAYER_RANK';

export const savedUser = (user) => ({
  type: SAVED_USER,
  user,
});

export const requestToken = () => ({
  type: REQUEST_TOKEN,
});

export const receiveToken = (token) => console.log(token) || ({
  type: GET_TOKEN,
  token,
});

export const failedToken = (error) => ({
  type: FAILED_TOKEN,
  payload: {
    error,
  },
});

export const fetchToken = () => (dispatch) => {
  dispatch(requestToken());
  fetch('https://opentdb.com/api_token.php?command=request')
    .then((data) => data.json())
    .then(
      (json) => dispatch(receiveToken(json)),
    )
    .then((json) => localStorage.setItem('token', json.token)) // Guardando o Token no LocalStorage assim que a API retorna
    .catch((error) => dispatch(failedToken(error)));
};

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
});

export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export function fetchQuestions() {
  return async (dispatch, getStore) => {
    dispatch(requestQuestions());
    try {
      const myToken = localStorage.getItem('token');
      const endpoint = `https://opentdb.com/api.php?amount=5&token=${myToken}`;
      const result = await fetch(endpoint).then((response) => response.json());
      dispatch(receiveQuestions(result.results));
      console.log(getStore());
    } catch (error) {
      return console.error(`ERROR Fetch Qeustions ${error}`);
    }
  };
}

export const getPlayer = (player) => ({
  type: GET_PLAYER,
  player,
});

export const getPlayerRank = (playerRank) => ({
  type: GET_PLAYER_RANK,
  playerRank,
});
