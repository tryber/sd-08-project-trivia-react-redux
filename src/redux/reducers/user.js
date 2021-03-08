import { SAVE_USER } from '../actions/userAction';
import { SAVE_SCORE } from '../actions/playerAction';

const initialState = {
  email: '',
  name: '',
  score: 0,
  assertions: 0,
  level: 'medium',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
  case SAVE_USER:
    return { ...state, email: action.email, name: action.name };
  default:
    return state;
  }
}

function saveScorePlayerReducer(state = initialState, action) {
  switch (action.type) {
  case SAVE_SCORE:
    return { ...state, score: action.score, assertions: action.assertions };
  default:
    return state;
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case SAVE_USER:
    return loginReducer(state, action);
  case SAVE_SCORE:
    return saveScorePlayerReducer(state, action);
  default:
    return state;
  }
}
