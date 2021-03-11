const INITIAL_STATE = { name: '', emailGravatar: '', token: '' };
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER':
    return {
      ...state,
      name: action.payload.name,
      emailGravatar: action.payload.emailGravatar,
    };
  case 'TOKEN':
    return { ...state, token: action.payload.token };
  default:
    return state;
  }
};

export default user;
