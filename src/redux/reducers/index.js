import { combineReducers } from 'redux';
import login from './login';
import game from './game';

const rootReducers = combineReducers({ login, game });

export default rootReducers;
