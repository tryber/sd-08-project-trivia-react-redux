export function optionsAnswers(correctAnswer, wrongAnswers) {
  const wrongOptions = [];
  wrongAnswers.forEach((item, index) => {
    const option = { answer: item, index };
    wrongOptions.push(option);
  });
  const answersModel = [{ correctAnswer, isCorrect: true }, ...wrongOptions];
  const answers = [];
  while (answersModel.length) {
    const index = Math.floor(Math.random() * answersModel.length - 1);
    answers.push(answersModel.splice(index, 1)[0]);
  }
  return answers;
}

export function setLocalStorage(
  name = 'anonimous',
  score,
  gravatarEmail = 'name@server.com',
  assertions,
) {
  const objectModel = {
    player: {
      name,
      assertions,
      score,
      gravatarEmail,
    },
  };
  localStorage.setItem('state', JSON.stringify(objectModel));
}
export function scoreCalculate(timer, difficulty) {
  const scoreBase = 10;
  const multiplier = {
    easy: 1,
    medium: 2,
    hard: 3,
  };
  return scoreBase + timer * multiplier[difficulty];
}
export function setRanking(name, score = 0, gravatarEmail) {
  let ranking = JSON.parse(localStorage.getItem('ranking'));
  const newScore = {
    name,
    score,
    gravatarEmail,
  };
  ranking = [...ranking, newScore];
  localStorage.setItem('ranking', JSON.stringify(ranking));
}
