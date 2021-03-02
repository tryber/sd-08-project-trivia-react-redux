import { REQUEST_AVATAR_SUCCESS } from '../action';

const INITIAL_STATE = {
  score: 0,
  avatar: '',
};

const triviaReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_SCORE':
    return { ...state, score: state.score + action.payload.score };
  case REQUEST_AVATAR_SUCCESS:
    return { ...state, avatar: action.avatar };
  default:
    return state;
  }
};

export default triviaReducer;
