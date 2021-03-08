import { combineReducers } from 'redux';
import loginReducer from './login';
import fetchReducer from './fetchApi';
import coutdownReducer from './coutdown';

const rootReducer = combineReducers({
  login: loginReducer,
  question: fetchReducer,
  coutdown: coutdownReducer,
});

export default rootReducer;
