import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
<<<<<<< HEAD
import game from '../reducers/game';

const rootReducer = combineReducers({
  game,
=======
import question from '../reducers/question';

const rootReducer = combineReducers({
  question,
>>>>>>> origin/main-group-20
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
