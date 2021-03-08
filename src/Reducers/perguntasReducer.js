const INITIAL_VALUE = {
  acertos: 0,
  questions: 0,
};

const perguntasReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case 'TOTAL':
    return { ...state, acertos: action.payload, questions: state.questions + 1 };
  default:
    return state;
  }
};

export default perguntasReducer;
