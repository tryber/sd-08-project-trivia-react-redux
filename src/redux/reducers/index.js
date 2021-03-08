import { combineReducers } from 'redux';
import user from './user';
import timer from './timer';

export default combineReducers({
  user,
  timer,
});
