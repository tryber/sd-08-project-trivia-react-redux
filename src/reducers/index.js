import { combineReducers } from 'redux';

import questions from './questions';
import email from './email';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

export default combineReducers({
  email,
  questions,
});
