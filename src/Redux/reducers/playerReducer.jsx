const PLAYER = ({
  email: '',
  nome: '',
});

const playerReducer = (state = PLAYER, action) => {
  switch (action.type) {
  case 'USER_EMAIL':
    return { ...state, email: action.value.target.value };
  case 'USER_NOME':
    return { ...state, nome: action.value.target.value };
  default:
    return state;
  }
};

export default playerReducer;
