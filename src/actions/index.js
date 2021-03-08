export const userLogin = (email, password) => ({
  type: 'USER_EMAIL',
  payload: {
    userEmail: email,
    userPassword: password,
  },
});

export const token = (value) => ({
  type: 'TOKEN',
  value,
});

export const fetchJogo = () => async (dispatch) => {
  const endPointToken = 'https://opentdb.com/api_token.php?command=request';
  const respondeApi = await fetch(endPointToken);
  const jsonApi = await respondeApi.json();
  return dispatch(token(jsonApi));
};
