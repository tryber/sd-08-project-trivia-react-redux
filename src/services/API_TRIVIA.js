async function fetchToken() {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const requestJSON = await request.json();
  const token = await requestJSON.token;
  return token;
}

const CINCO = 5;

async function fetchTrivia(num = CINCO, token) {
  const request = await fetch(`https://opentdb.com/api.php?amount=${num}&token=${token}`);
  const requestJSON = await request.json();
  return requestJSON;
}

export { fetchToken, fetchTrivia };
