import { combineReducers } from 'redux';
import login from './login';
import tokenReducer from './tokenReducer';
import fetchAPI from './fetch';

const rootReducer = combineReducers({
  login,
  tokenReducer,
  fetchAPI,
});

export default rootReducer;
