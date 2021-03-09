export const playerEmailAction = (value) => ({
  type: 'USER_EMAIL',
  value,
});

export const playerNomeAction = (value) => ({
  type: 'USER_NOME',
  value,
});

export const playerScoreAction = (value) => ({
  type: 'USER_SCORE',
  value,
});

export const playerAssertionsAction = (value) => ({
  type: 'USER_ASSERTIONS',
  value,
});

export const apiRequestToken = () => ({
  type: 'REQUEST_TOKEN',
});

export const apiRequestTokenSuccess = (value) => ({
  type: 'REQUEST_TOKEN_SUCCESS',
  value,
});

export const apiRequestQuestionSent = () => ({
  type: 'REQUEST_QUESTION_SENT',
});

export const apiGetQuestionSuccess = (json) => ({
  type: 'REQUEST_QUESTION_SUCCESS',
  value: { json },
});

export const apiRequestFetch = () => async (dispatch) => {
  dispatch(apiRequestToken());
  try {
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const data = await response.json();
    dispatch(apiRequestTokenSuccess(data.token));
    localStorage.setItem('token', data.token);
  } catch (error) {
    return console.log(error);
  }
};

export const UpdatePlayerScore = (value) => async (dispatch, getState) => {
  dispatch(playerScoreAction(value));
  const objLocalStorage = {
    player: getState().player,
  };
  const jsonAux = JSON.stringify(objLocalStorage);
  localStorage.setItem('state', jsonAux);
};

export const apiGetQuestion = () => async (dispatch) => {
  dispatch(apiRequestQuestionSent());
  try {
    const getToken = localStorage.getItem('token');
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${getToken}`);
    const data = await response.json();
    const questionReceived = data.results;
    dispatch(apiGetQuestionSuccess(questionReceived));
  } catch (error) {
    return console.log(error);
  }
};
