const callApi = () => ({
  type: 'CALL_API',

});

const getDataApi = (arr) => ({
  type: 'GET_DATA_API',
  payload: arr,

});

export const totalAction = (pontos) => ({
  type: 'TOTAL',
  payload: pontos,
});

export const timerAction = (tempo) => ({
  type: 'REMOVETEMPO',
  payload: tempo,
});

export const remountTimer = (op) => ({
  type: 'REMOUNT_TIMER',
  payload: op,
});

const getApiQuestions = (data) => async (dispatch) => {
  dispatch(callApi());

  const fetchApi = await fetch(`https://opentdb.com/api.php?amount=5&token=${data}`);
  const jsonObj = await fetchApi.json();
  const { results } = jsonObj;
  dispatch(getDataApi(results));
};
export default getApiQuestions;
