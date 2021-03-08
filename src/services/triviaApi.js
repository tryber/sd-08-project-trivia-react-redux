const BASE_URL = 'https://opentdb.com';

const fetchApi = async (endpoint) => {
  const response = await fetch(endpoint);
  return response.json();
};

export const getToken = async () => fetchApi(`${BASE_URL}/api_token.php?command=request`);

export const getQuestions = async (token, amount) => (
  fetchApi(`${BASE_URL}/api.php?amount=${amount}&token=${token}&encode=base64`));

export const getCategories = async () => (
  fetchApi(`${BASE_URL}/api_category.php`)
);
