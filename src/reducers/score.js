const initialState = {
  score: 0,
};

const score = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_SCORE':
    return ({
      ...state,
      score: state.score + action.payload,
    });
  case 'ZERA_SCORE':
    return ({
      ...state,
      score: 0,
    });
  default: return state;
  }
};

export default score;
