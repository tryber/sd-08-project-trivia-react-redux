import { getToken } from '../../services/triviaApi';

export const Types = {
  SAVE_TOKEN: 'SAVE_TOKEN',
  FETCH_TOKEN: 'FETCH_TOKEN',
};

const auth = (state = {}, action) => {
  switch (action.type) {
  case Types.SAVE_TOKEN: {
    return { ...state, token: action.payload };
  }
  default: return state;
  }
};

export const Creators = {
  saveToken: (token) => ({
    type: Types.SAVE_TOKEN,
    payload: token,
  }),

  fetchToken: () => async (dispatch) => {
    const { token } = await getToken();
    dispatch(Creators.saveToken(token));
  },
};

export default auth;
