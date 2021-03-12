import {
  SAVE_NAME,
  SAVE_EMAIL,
  SAVE_SCORE,
  SAVE_CORRECT_ANSWERS,
} from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
    correctAnswers: 0,
  },
};
export default function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_NAME:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.name,
      },
    };
  case SAVE_EMAIL:
    return {
      ...state,
      player: {
        ...state.player,
        gravatarEmail: action.gravatarEmail,
      },
    };
  case SAVE_SCORE:
    return {
      ...state,
      player: {
        ...state.player,
        score: action.score,
      },
    };
  case SAVE_CORRECT_ANSWERS:
    return {
      player: {
        ...state.player,
        correctAnswers: action.correctAnswers,
      },
    };
  default:
    return state;
  }
}
