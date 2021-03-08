export const requestTriviaToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const data = await response.json();
  const { token } = data;
  return token;
};

export const requestTriviaQuestion = async (token, amount) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&encode=urlLegacy&token=${token}`);
  const data = await response.json();
  return data;
};
