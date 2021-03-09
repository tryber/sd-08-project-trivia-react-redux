const PLAYER = ({
  gravatarEmail: '',
  name: '',
  assertions: 0,
  score: 0,
});

const playerReducer = (state = PLAYER, action) => {
  switch (action.type) {
  case 'USER_EMAIL':
    return { ...state, gravatarEmail: action.value.target.value };
  case 'USER_NOME':
    return { ...state, name: action.value.target.value };
  case 'USER_ASSERTIONS':
    return { ...state, assertions: action.value };
  case 'USER_SCORE':
    return { ...state, score: action.value };
  default:
    return state;
  }
};

export default playerReducer;
