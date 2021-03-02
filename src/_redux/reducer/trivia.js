const INITIAL_STATE = {
  score: 0,
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_SCORE':
    return { ...state, score: state.score + action.payload.score };
  default:
    return state;
  }
};

export default triviaReducer;
