const INITIAL_STATE = { score: 0, rightAnswers: 0 };

const score = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SCORE': {
    return {
      ...state,
      score: action.payload.score,
      rightAnswers: action.payload.rightAnswers,
    };
  }
  case 'GET_SCORE': {
    return {
      ...state,
      score: action.payload.score,
      rightAnswers: action.payload.rightAnswers,
    };
  }
  default:
    return state;
  }
};

export default score;
