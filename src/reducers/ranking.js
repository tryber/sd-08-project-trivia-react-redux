import { GET_PLAYER_RANK } from '../actions';

const INITIAL_STATE = [];

const ranking = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_PLAYER_RANK:
    return [
      ...state,
      action.playerRank,
    ];
  default:
    return state;
  }
};

export default ranking;
