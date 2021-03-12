import { combineReducers } from 'redux';
import user from './user';
import image from './image';
import question from './question';

const rootReducers = combineReducers({ user, image, question });

export default rootReducers;
