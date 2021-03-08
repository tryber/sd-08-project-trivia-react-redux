const initialState = {
  name: '',
  email: '',
  gravatarUrl: '',
};

const setUser = (state = initialState, action) => {
  switch (action.type) {
  case 'SAVE_USER':
    return ({
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    });
  case 'SAVE_GRAVATAR_IMAGE':
    return ({
      ...state,
      gravatarUrl: action.payload,
    });
  default:
    return state;
  }
};

export default setUser;
