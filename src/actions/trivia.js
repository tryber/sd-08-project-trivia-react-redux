export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API = 'RECEIVE_API';

const requestApi = () => ({
  type: 'REQUEST_API',
});

const receiveApi = (json) => ({
  type: 'RECEIVE_API',
  payload: {
    json,
  },
});

export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestApi());
    const token = JSON.parse(localStorage.getItem('token'));
    return fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((quest) => dispatch(receiveApi(quest)));
  };
}
