const tokenEndpoint = 'https://opentdb.com/api_token.php?command=request';

async function fetchApiToken() {
  const result = await fetch(tokenEndpoint).then((response) => response.json());
  // console.log(result);
  return result;
}

export default fetchApiToken;
