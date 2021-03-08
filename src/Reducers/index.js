import { combineReducers } from 'redux';
import perguntasReducer from './perguntasReducer';
import reqApiReducer from './reqApiReducer';
import timerReducer from './timerReducer';

const rootReducers = combineReducers({ reqApiReducer, perguntasReducer, timerReducer });

export default rootReducers;
