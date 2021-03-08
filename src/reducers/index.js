import { combineReducers } from 'redux';
import user from './User';
import play from './play';

const rootReducers = combineReducers({ user, play });

export default rootReducers;
