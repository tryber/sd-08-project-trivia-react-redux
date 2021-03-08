const isFetching = () => ({
  type: 'REQUEST_QUESTION',
});

const receiveQuestion = (json) => ({
  type: 'GET_QUESTIONS',
  payload: json,
});

const failedRequest = () => ({
  type: 'FAILED',
});

const requestQuestion = (token) => async (dispatch) => {
  try {
    dispatch(isFetching);
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const responseJson = await response.json();
    return dispatch(receiveQuestion(responseJson));
  } catch (error) {
    dispatch(failedRequest(error));
  }
};

export default requestQuestion;
