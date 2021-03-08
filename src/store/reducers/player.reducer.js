const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  gravatarURL: '',
  token: '',
  maxQuestions: 5,
};

export default function player(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case 'NEW_PLAYER':
    return { ...state, ...payload };
  case 'SET_SCORE':
    return { ...state, score: state.score + payload, assertions: state.assertions + 1 };
  case 'UPDATE_GRAVATAR_URL':
    return { ...state, gravatarURL: payload };
  case 'RESET_SCORE':
    return {
      ...state,
      name: '',
      assertions: 0,
      score: 0,
      gravatarEmail: '',
      gravatarURL: '',
      token: '',
    };
  default:
    return state;
  }
}
