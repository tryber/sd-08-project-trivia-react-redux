import {
  ADD_LOGIN,
  nextQuestion,
  UPDATE_SCORE,
  UPDATE_SCORE_2,
  LAST_QUESTION,
  PLAYER_IS_PLAYING,
  ADD_IMG,
  RESET_STORE,
} from '../actions';

const INITIAL_STATE = {
  score: 0,
  name: '',
  email: '',
  isButtonVisible: true,
  rightAnswers: 0,
  shouldRedirect: false,
  isPlaying: false,
  urlGravatar: '',
};

const reducerUser = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_LOGIN:
    return ({ ...state, name: payload.name, email: payload.email });
  case UPDATE_SCORE:
    return ({
      ...state,
      score: payload.score,
      isButtonVisible: !state.isButtonVisible,
      rightAnswers: state.rightAnswers + 1,
    });
  case UPDATE_SCORE_2:
    return ({ ...state, score: payload.score, isButtonVisible: !state.isButtonVisible });
  case nextQuestion:
    return ({ ...state, isButtonVisible: !state.isButtonVisible });
  case LAST_QUESTION:
    return ({
      ...state,
      isButtonVisible: !state.isButtonVisible,
      isPlaying: !state.isPlaying,
      shouldRedirect: true,
    });
  case PLAYER_IS_PLAYING:
    return ({ ...state, isPlaying: !state.isPlaying });
  case ADD_IMG:
    return ({ ...state, urlGravatar: payload });
  case RESET_STORE:
    return ({ ...INITIAL_STATE });
  default:
    return state;
  }
};

export default reducerUser;
