import { combineReducers } from 'redux';

import player from './player.reducer';
import questions from './questions.reducer';
import updateTimeLeft from './updateTimer.reducer';

const rootReducer = combineReducers({
  player,
  questions,
  updateTimeLeft,
});

export default rootReducer;
