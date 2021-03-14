const InitialState = {
  score: 0,
};

const Score = (state = InitialState, action) => {
  switch (action.type) {
  case 'USER_SCORE':
    return {
      ...state,
      score: state.score + action.payload.userScore,

    };
  case 'RESET_SCORE':
    return {
      ...state,
      score: 0,
    };
  default:
    return state;
  }
};

export default Score;
