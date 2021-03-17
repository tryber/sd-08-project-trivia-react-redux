import { REQUEST_QUESTIONS, RECEIVE_QUESTIONS, GET_PLAYER } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetching: true,
  player: {
    score: 0,
  },
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      isFetching: true,
    };
  case RECEIVE_QUESTIONS:
    return {
      ...state,
      questions: action.questions,
      isFetching: false,
    };
  case GET_PLAYER:
    return {
      ...state,
      player: action.player,
    };
  default:
    return state;
  }
};

export default game;
