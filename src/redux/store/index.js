// instalar npm install --save redux-devtools-extension

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

const store = createStore(rootReducers, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));

export default store;
