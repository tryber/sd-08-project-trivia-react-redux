import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import scoreReducer from './scoreReducer';
import assertionReducer from './assertionReducer';
import tokenReducer from './tokenReducers';
import perguntaReducers from './perguntaReducer';
import TimeReducer from './TimerReducer';
import OptionsReducer from './OptionsReducer';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  login: loginReducer,
  tokenReducer,
  perguntaReducers,
  timere: TimeReducer,
  scoreP: scoreReducer,
  assertionReducer,
  OptionsReducer,
});

export default rootReducer;
