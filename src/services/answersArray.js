export default function answersArray(questionArray) {
  const {
    correct_answer: correctAnswer,
    incorrect_answers: incorrectAnswers,
  } = questionArray;
  let questionsUnited = [];

  if (incorrectAnswers.length > 1) {
    questionsUnited = [
      { answer: correctAnswer, assert: true },
      { answer: incorrectAnswers[0], assert: false },
      { answer: incorrectAnswers[1], assert: false },
      { answer: incorrectAnswers[2], assert: false },
    ];
  } else if (incorrectAnswers.length === 1) {
    questionsUnited = [
      { answer: correctAnswer, assert: true },
      { answer: incorrectAnswers[0], assert: false },
    ];
  }
  return questionsUnited;
}
