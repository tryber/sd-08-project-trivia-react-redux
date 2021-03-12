const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';

export const getToken = () => fetch(URL_TOKEN).then((response) => (
  response.json()
    .then((json) => json.token)
));

export default getToken;
