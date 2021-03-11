const INITIAL_STATE = { quiz: [] };
const quiz = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  // case 'QUIZ':
  //   return { ...state, quiz: action.payload.quiz };
  // case 'REQUEST_QUIZ':
  //   return { ...state, loading: true };
  case 'GET_QUIZ':
    return { ...state, quiz: action.payload.quiz };
  default:
    return state;
  }
};

export default quiz;
