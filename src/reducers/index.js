import { combineReducers } from 'redux';
import login from './login';
import triviaGame from './triviaGame';

const rootReducers = combineReducers({ login, triviaGame });

export default rootReducers;
