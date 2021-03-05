import { combineReducers } from 'redux';
import loginReducer from './login';
import gameReducer from './game';
import clock from './clock';

const rootReducers = combineReducers({ loginReducer, gameReducer, clock });

export default rootReducers;
