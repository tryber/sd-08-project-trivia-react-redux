export const userLogin = (email, name) => ({
  type: 'USER_EMAIL',
  payload: {
    userEmail: email,
    userName: name,
  },
});

export const userScore = (score) => ({
  type: 'USER_SCORE',
  payload: {
    userScore: score,
  },
});

export const userAssertion = (assertions) => ({
  type: 'USER_ASSERTION',
  payload: {
    userAssertion: assertions,
  },
});

export const userOptions = (value) => ({
  type: 'USER_OPTIONS',
  payload: {
    userOptions: value,
  },
});

export const token = (value) => ({
  type: 'TOKEN',
  value,
});

export const perguntas = (value) => ({
  type: 'PERGUNTA',
  value,
});

export const contador = (time, TOF) => ({
  type: 'TIMER',
  payload: {
    timer: time,
    countTOF: TOF,
  },
});

export const reseter = () => ({
  type: 'RESET_SCORE',

});

export const fetchJogo = () => async (dispatch) => {
  const endPointToken = 'https://opentdb.com/api_token.php?command=request';
  const respondeApi = await fetch(endPointToken);
  const jsonApi = await respondeApi.json();
  localStorage.setItem('token', JSON.stringify(jsonApi.token));
  return dispatch(token(jsonApi));
};

const amount = 5;

export const fetchPerguntas = (tokenUser) => async (dispatch) => {
  const endPointToken = `https://opentdb.com/api.php?amount=${amount}&token=${tokenUser}`;
  const respondeApi = await fetch(endPointToken);
  const jsonApi = await respondeApi.json();
  return dispatch(perguntas(await jsonApi));
};

// export const fetchPerguntas = (value) => async (dispatch) => {
//   try {
//     dispatch({
//       type: 'PERGUNTA',
//     });

//     const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${value}`);
//     const reponsejson = await response.json();

//     dispatch({
//       type: 'REQUEST_SUCESS',
//       payload: {
//         data: reponsejson,

//       },
//     });
//   } catch (e) {
//     dispatch({

//       type: 'REQUEST_FAIL',
//     });
//   }
// };
