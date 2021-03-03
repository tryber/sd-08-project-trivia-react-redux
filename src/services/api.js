export default async function fetchTriviaToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const requestReturn = await fetch(url);
  const requestObject = await requestReturn.json();
  return requestObject;
}
