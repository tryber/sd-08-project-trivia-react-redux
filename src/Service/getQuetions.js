const URL_QUESTIONS = 'https://opentdb.com/api.php?amount=';

export const getQuestions = (quantityOfQuestions, token) => fetch(
  `${URL_QUESTIONS}${quantityOfQuestions}&token=${token}`,
)
  .then((response) => (response.json()
    .then((json) => json.results)
  ));

export default getQuestions;
