export async function getUserToken() {
  try {
    const token = await fetch('https://opentdb.com/api_token.php?command=request')
      .then((data) => data.json());
    return token.token;
  } catch (error) {
    throw new Error(error);
  }
}

export function getQuestions(numberOfQuestions, token) {
  const questions = fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`)
    .then((allQuestions) => allQuestions.json())
    .catch((error) => { throw new Error(error); });
  return questions;
}
