// const fetch = require('node-fetch');

export const getToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request').then((data) => data.json());
  return response.token;
};
// https://trybecourse.slack.com/archives/C01A9A2N93R/p1614959745465500?thread_ts=1614957955.461300&cid=C01A9A2N93R
const encodeUtf8 = (str) => {
  const stringUTF = unescape(encodeURIComponent(str));
  return stringUTF.replace(/&quot;|&#039;/gi, '\'');
};

const newArray = (element) => [...element.incorrect_answers
  .map((answer) => [encodeUtf8(answer), 'wrong-answer-']),
[encodeUtf8(element.correct_answer), 'correct-answer']];

const shuffleArray = (array) => array.map((a) => ({ sort: Math.random(), value: a }))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

const newResults = (results) => results.map((element) => ({
  category: encodeUtf8(element.category),
  question: encodeUtf8(element.question),
  type: element.type,
  difficulty: element.difficulty,
  allAnswer: shuffleArray(newArray(element)),
  correctAnswer: element.correct_answer,
  incorrectAnswers: [...element.incorrect_answers],
}));

export const getQuiz = async () => {
  const token = await getToken();
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`).then((data) => data.json());
  const { results } = response;
  const newArrayObject = newResults(results);
  console.log(newArrayObject);
  return newArrayObject;
};

export async function getGravatar(hash) {
  const response = await fetch(`https://www.gravatar.com/avatar/${hash}`);
  return response.url;
}
