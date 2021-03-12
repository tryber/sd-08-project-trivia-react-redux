import { SET_NAME } from '../actions';

const initialState = {
  name: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case SET_NAME:
    return ({
      ...state,
      name: action.value,
    });
  default: return state;
  }
};

export default reducer;
