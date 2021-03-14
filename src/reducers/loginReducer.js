const InitialState = {
  email: '',
  name: '',
};

const Login = (state = InitialState, action) => {
  switch (action.type) {
  case 'USER_EMAIL':
    return {
      ...state,
      email: action.payload.userEmail,
      name: action.payload.userName,
    };
  default:
    return state;
  }
};

export default Login;
