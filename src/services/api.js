export async function getToken() {
  const url = 'https://opentdb.com/api_token.php?command=request';
  const requestReturn = await fetch(url);
  const requestObject = await requestReturn.json();
  return requestObject;
}

export async function getQuestions(questionsAmount, token) {
  const url = `https://opentdb.com/api.php?amount=${questionsAmount}&token=${token}`;
  const requestReturn = await fetch(url);
  const requestObject = await requestReturn.json();
  return requestObject;
}
