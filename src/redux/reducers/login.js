const INITIAL_STATE = {
  api: '',
  error: '',
  login: false,
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'API_SUCCESS':
    return {
      ...state,
      login: true,
    };
  case 'API_FAIL':
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default login;
