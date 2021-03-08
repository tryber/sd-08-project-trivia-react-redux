const initialState = {
  nameUser: '',
  emailUser: '',
};

function user(state = initialState, action) {
  switch (action.type) {
  case 'LOGIN':
    return action.payload;
  default:
    return state;
  }
}

export default user;
