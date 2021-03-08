import { combineReducers } from 'redux';
import login from './login';
import trivia from './trivia';

const reducer = combineReducers({ login, trivia });

export default reducer;
