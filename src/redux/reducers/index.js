import { combineReducers } from 'redux';
import user from './user';
import quiz from './quiz';
import scoreboard from './score';

const rootReducers = combineReducers({ user, quiz, scoreboard });

export default rootReducers;
