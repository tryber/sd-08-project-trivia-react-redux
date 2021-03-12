import getToken from './apis/getToken';

export default async function getGame() {
  let token = localStorage.getItem('token');

  if (token === null) {
    token = await getToken().token;
    localStorage.setItem('token', token);
  }
  const ENDPOINT = 'https://opentdb.com/api.php?';
  const AMOUNT_OPTION = 'amount=5';
  const TOKEN_OPTION = `&token=${token}`;
  const FETCH_URL = `${ENDPOINT}${AMOUNT_OPTION}${TOKEN_OPTION}`;
  return fetch(FETCH_URL)
    .then((response) => response.json())
    .catch((error) => error);
}
