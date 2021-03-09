import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { playerReducer, tokenReducer, questionReducer } from '../reducers';

const rootReducer = combineReducers({
  player: playerReducer,
  token: tokenReducer,
  questions: questionReducer,
});

export default createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk),
  ),
);
