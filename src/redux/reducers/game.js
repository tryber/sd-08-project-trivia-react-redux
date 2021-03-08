import {
  API_TRIVIA_FAIL,
  API_TRIVIA_RESQUEST,
  API_TRIVIA_SUCCESS,
  ASSERTION,
  STOP,
  TIMER,
} from '../actions';

const INITIAL_STATE = {
  player: {
    assertions: 0,
    score: 0,
  },
  questions: [],
  requesting: false,
  stop: false,
  time: 0,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_TRIVIA_RESQUEST:
    return { ...state, requesting: action.payload.requesting };
  case API_TRIVIA_SUCCESS:
    return { ...state,
      questions: action.payload.questions,
      requesting: action.payload.requesting };
  case API_TRIVIA_FAIL:
    return { ...state,
      requesting: action.payload.requesting,
      error: action.payload.requesting };
  case STOP:
    return { ...state, stop: action.payload.stop };
  case ASSERTION:
    return { ...state, player: { ...state.player, assertions: (state.assertions + 1) } };
  case TIMER:
    return { ...state, time: action.payload.time };
  default:
    return state;
  }
};

export default game;
