import { SAVE_NAME, SAVE_EMAIL } from '../actions';

const INITIAL_STATE = {
  player: {
    name: '',
    gravatarEmail: '',
    score: 0,
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
  default:
    return state;
  }
}
