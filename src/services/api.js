// const fetch = require('node-fetch');

export async function getToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request').then((data) => data.json());
  return response.token;
}
// https://trybecourse.slack.com/archives/C01A9A2N93R/p1614959745465500?thread_ts=1614957955.461300&cid=C01A9A2N93R
function encodeUtf8(str) {
  const stringUTF = unescape(encodeURIComponent(str));
  return stringUTF.replace(/&quot;|&#039;/gi, '\'');
}

const newArray = (results) => results.map((element) => ({
  category: encodeUtf8(element.category),
  type: element.type,
  difficulty: element.difficulty,
  question: encodeUtf8(element.question),
  allAnswer: [...element.incorrect_answers
    .map((answer) => [encodeUtf8(answer), 'wrong-answer-']),
  [element.correct_answer, 'correct-answer']]
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value),
  correctAnswer: element.correct_answer,
  incorrectAnswers: [...element.incorrect_answers],
}));

export async function getQuiz() {
  const token = await getToken();
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`).then((data) => data.json());
  const { results } = response;
  const newArrayObject = newArray(results);
  return newArrayObject;
}

console.log();
