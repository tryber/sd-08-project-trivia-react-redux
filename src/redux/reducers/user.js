const INITIAL_STATE = { name: '', email: '', token: '' };
const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'USER':
    return { ...state, name: action.payload.name, email: action.payload.email };
  case 'TOKEN':
    return { ...state, token: action.payload.token };
  default:
    return state;
  }
};

export default user;
