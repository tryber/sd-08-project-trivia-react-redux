import { combineReducers } from 'redux';
import playerReducer from './player';
import requestAPI from './requestAPI';

export default combineReducers({
  playerReducer,
  trivia: requestAPI,
});
