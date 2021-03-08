const isFetching = () => ({
  type: 'REQUEST',
});

const failedRequest = (error) => ({
  type: 'FAILED',
  payload: error,
});

const receiveTokens = ({ token }) => ({
  type: 'RECEIVE_TOKEN',
  payload: token,
});

const getToken = () => async (dispatch) => {
  try {
    dispatch(isFetching());
    const response = await fetch('https://opentdb.com/api_token.php?command=request');
    const responseJson = await response.json();
    return dispatch(receiveTokens(responseJson));
  } catch (error) {
    return dispatch(failedRequest(error));
  }
};

export default getToken;
