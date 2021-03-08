export const https = {
  token: 'https://opentdb.com/api_token.php?command=request',
  questions: (amount, token) => `https://opentdb.com/api.php?amount=${amount}&token=${token}`,
};

export default async (endpoint) => {
  try {
    const response = await fetch(endpoint);
    return response.json();
  } catch (error) {
    return error;
  }
};
