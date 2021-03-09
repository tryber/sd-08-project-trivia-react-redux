import { combineReducers } from 'redux';
import loginReducer from './login';
import gameReducer from './game';

const rootReducers = combineReducers({ loginReducer, gameReducer });

export default rootReducers;
