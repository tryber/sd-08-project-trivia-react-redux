import { combineReducers } from 'redux';

import player from './user';
import questions from './questions';
import countdown from './countdown';

const rootReducer = combineReducers({ player, questions, countdown });

export default rootReducer;
