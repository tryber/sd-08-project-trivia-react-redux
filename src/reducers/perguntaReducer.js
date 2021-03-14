const INITIAL_STATE = {

};

const pergunta = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'PERGUNTA':

    return { ...state, pergunta: action.value };

  default:
    return state;
  }
};

export default pergunta;

// const INITIAL_STATE = {
// };

// const pergunta = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//   case 'REQUEST_LOADING':
//     return {
//       ...state,
//       pergunta: action.payload.value,
//       loading: true,
//     };

//   case 'REQUEST_SUCESS':
//     return {
//       ...state,
//       loading: false,
//       pergunta: action.payload.data,

//     };

//   case 'REQUEST_FAIL':
//     return {
//       ...state,
//       loading: false,
//       error: 'Unable to find value',
//     };
//   default:
//     return state;
//   }
// };

// export default pergunta;
