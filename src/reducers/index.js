import { combineReducers } from 'redux';
import user from './user';
import game from './game';
import ranking from './ranking';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
const reducer = combineReducers({
  user,
  game,
  ranking,
});

export default reducer;
