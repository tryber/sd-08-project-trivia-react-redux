export const getToken = async () => {
  const request = await fetch('https://opentdb.com/api_token.php?command=request');
  const resultJson = await request.json();
  return resultJson;
};

export const getQuestions = async (token) => {
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const resultJson = await request.json();
  return resultJson;
};
