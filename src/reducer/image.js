import { SET_URL } from '../actions/gravatar';

const initialState = {
  img: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_URL:
    return ({
      ...state,
      img: action.value,
    });
  default: return state;
  }
};

export default reducer;
