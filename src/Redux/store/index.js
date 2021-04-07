import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { playerReducer, tokenReducer } from '../reducers';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
