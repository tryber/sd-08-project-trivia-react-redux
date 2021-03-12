import { SET_CUSTOM_SETTINGS } from '../actions';

const initialState = {
  amount: 10,
  category: 'any',
  difficulty: 'any',
  type: 'any',
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
  case SET_CUSTOM_SETTINGS:
    return {
      ...state,
      ...action.payload,
    };
  default:
    return state;
  }
}
