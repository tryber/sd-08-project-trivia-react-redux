const getResponse = (response) => (
  response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
);

const getQuestions = (token, category = '', difficulty = '', type = '') => (
  fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}&token=${token}`)
    .then((response) => getResponse(response))
    .then((questions) => questions.results)
);

export default getQuestions;
