export default async function getQuestions(number, token) {
  const endpoint = `https://opentdb.com/api.php?amount=${number}&token=${token}`;
  const questions = await fetch(endpoint);
  const questionsJson = await questions.json();
  return questionsJson;
}
