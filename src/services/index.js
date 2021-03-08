const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const getToken = () => {
  const url = `${URL_TOKEN}`;
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data.token);
};

export const getAnswers = (path) => {
  const url = `https://opentdb.com/api.php?amount=5&token=${path}`;
  return fetch(url).then((response) => response.json());
};
