import { RESTART_TIME, SET_CURRENT_TIME } from '../actions/timerAction';

const initialState = {
  funcRestTimer: () => {},
  currentTime: 0,
};

function restarTimeReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
  case RESTART_TIME:
    return { ...state, funcRestTimer: action.resetTimer };
  default:
    return state;
  }
}

function setCurrentTime(state = initialState, action) {
  switch (action.type) {
  case SET_CURRENT_TIME:
    return { ...state, currentTime: action.currentTime };
  default:
    return state;
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case RESTART_TIME:
    return restarTimeReducer(state, action);
  case SET_CURRENT_TIME:
    return setCurrentTime(state, action);
  default:
    return state;
  }
}
