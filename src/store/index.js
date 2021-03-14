import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { loadState, saveState } from '../helpers/localStorage';

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, persistedState, composeEnhancers(
  applyMiddleware(thunk),
));

store.subscribe(() => {
  saveState({
    player: store.getState().player,
  });
});

export default store;

// auxílio: Thadeu C B Ramos
// https://github.com/thadeucbr
