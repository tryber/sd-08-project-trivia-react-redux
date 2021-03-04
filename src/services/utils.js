export default function optionsAnswers(correctAnswer, wrongAnswers) {
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
