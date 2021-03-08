function configToString(configObj) {
  const { category, difficulty, type, amount } = configObj;

  const amountString = `amount=${amount}`;

  let categoryString = '';
  if (category !== '') categoryString = `&category=${category}`;

  let difficultyString = '';
  if (difficulty !== '') difficultyString = `&difficulty=${difficulty}`;

  let typeString = '';
  if (type !== '') typeString = `&type=${type}`;

  return `${amountString}${categoryString}${difficultyString}${typeString}`;
}

function buildAnswers(correct, incorrect) {
  const correctAnswer = [{ answer: correct, dataTest: 'correct-answer' }];
  const incorrectAnswer = incorrect
    .map((e, i) => ({ answer: e, dataTest: `wrong-answer-${i}` }));
  const answers = [...correctAnswer, ...incorrectAnswer];
  return answers;
}

function shuffleAnswers(answers) {
  // função adaptada de "https://stackoverflow.com/users/464744/blender"
  for (let j, x, i = answers.length;
    i;
    j = parseInt(Math.random() * i, 10),
    x = answers[i -= 1],
    answers[i] = answers[j],
    answers[j] = x);
  return answers;
}

function generateRandomAnswers(answerFromApi) {
  const { correct_answer: ca, incorrect_answers: ia } = answerFromApi;
  const allAnswers = buildAnswers(ca, ia);
  const allAnswersRandom = shuffleAnswers(allAnswers);
  return {
    ...answerFromApi,
    allAnswersRandom,
  };
}

function processAnswers(objFromApi) {
  const { results } = objFromApi;
  const processedResults = results.map(generateRandomAnswers);
  return { ...objFromApi, results: processedResults };
}

export default async function fetchQuestionsAPI(configObj, token) {
  const customQuery = configToString(configObj);
  const tokenString = `&token=${token}`;
  const fetchUrl = `https://opentdb.com/api.php?${customQuery}${tokenString}`;
  const questionsJson = await fetch(fetchUrl);
  const questions = await questionsJson.json();
  return processAnswers(questions);
}
