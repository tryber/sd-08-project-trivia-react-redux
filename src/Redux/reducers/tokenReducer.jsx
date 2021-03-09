const TOKEN = {
  token: '',
  isLoading: false,
};

const tokenReducer = (state = TOKEN, action) => {
  switch (action.type) {
  case 'REQUEST_TOKEN':
    return { ...state, isLoading: true };
  case 'REQUEST_TOKEN_SUCCESS':
    return { ...state, token: action.value, isLoading: false };
  default:
    return state;
  }
};

export default tokenReducer;
