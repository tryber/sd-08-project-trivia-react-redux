export const Types = {
  SAVE_USER: 'SAVE_USER',
};

const INITIAL_STATE = {
  playerName: '',
  gravatarEmail: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.SAVE_USER: {
    return { ...state, ...action.payload };
  }

  default: return state;
  }
};

export const Creators = {
  saveUser: (userData) => ({
    type: Types.SAVE_USER,
    payload: userData,
  }),
};

export default user;
