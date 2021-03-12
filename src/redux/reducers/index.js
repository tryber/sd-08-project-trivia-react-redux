import { combineReducers } from 'redux';
import loginReducer from './Login';
import gameReducer from './Game';
import scoreReducer from './Score';
import settingsReducer from './Settings';

const rootReducer = combineReducers({
  login: loginReducer,
  game: gameReducer,
  score: scoreReducer,
  settings: settingsReducer,
});

export default rootReducer;
