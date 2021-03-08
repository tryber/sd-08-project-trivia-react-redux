const TRIVIA_API = 'https://opentdb.com/api_token.php?command=request';

const getResponse = (response) => (
  response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
);

const getToken = () => (
  fetch(TRIVIA_API)
    .then((response) => getResponse(response))
);

export default getToken;
