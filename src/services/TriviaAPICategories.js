const getResponse = (response) => (
  response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
);

const getCategoriesFromAPI = () => (
  fetch('https://opentdb.com/api_category.php')
    .then((response) => getResponse(response))
    .then((questions) => questions.trivia_categories)
);

export default getCategoriesFromAPI;
