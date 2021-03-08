import { LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
  },
  requesting: false,
};

const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return { ...state,
      player: { gravatarEmail: action.payload.gravatarEmail, name: action.payload.name },
    };
  default:
    return state;
  }
};

export default login;
