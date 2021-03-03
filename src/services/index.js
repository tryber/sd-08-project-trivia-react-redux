const API_URL = 'https://opentdb.com/api_token.php?command=request';

const API_PERGUNTAS = 'https://opentdb.com/api.php?amount=5&token=9653cb44bb1a3d0db0beac46a203b8eb824a1e79c9078b165629f26b1daa490f';

// const token = localStorage.getItem('token');

export const getQuestions = () => {
  fetch(API_PERGUNTAS)
    .then((response) => response.json())
    .then((resJson) => resJson);
};

export const getToken = () => {
  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => localStorage.setItem('token', data.token));
  getQuestions();
};

export default getToken;

// const Api = {
//   get(path) {
//     return resquest('GET', path);
//   },
// };
