import { combineReducers } from 'redux';
import user from './user';
import quiz from './quiz';
import score from './score';

const rootReducers = combineReducers({ user, quiz, score });

export default rootReducers;
