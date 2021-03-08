const InitialState = {
  email: '',
  password: '',
};

const Login = (state = InitialState, action) => {
  switch (action.type) {
  case 'USER_EMAIL':
    return {
      ...state,
      email: action.payload.userEmail,
      password: action.payload.userPassword,
    };
  default:
    return state;
  }
};

export default Login;
