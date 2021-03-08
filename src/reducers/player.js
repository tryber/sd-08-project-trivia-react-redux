import {
  LOGIN, CORRECT, HAS_ANSWERED_TRUE, HAS_ANSWERED_FALSE, TIMER_UPDATE,
} from '../actions';

const PLAYER_INITIAL_STATE = {
  hasAnswered: false,
  timerUpdate: 30,
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const playerReducer = (state = PLAYER_INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.email,
      },
    };
  case CORRECT:
    return {
      ...state,
      player: {
        ...state.player,
        assertions: state.player.assertions + 1,
        score: state.player.score + action.payload,
      },
    };
  case HAS_ANSWERED_TRUE:
    return { ...state, hasAnswered: true };
  case HAS_ANSWERED_FALSE:
    return { ...state, hasAnswered: false, timerUpdate: 30 };
  case TIMER_UPDATE:
    return { ...state, timerUpdate: action.payload };
  default:
    return state;
  }
};

export default playerReducer;
