import { combineReducers } from 'redux';
import reducerUser from './reducerUser';
import reducerToken from './reducerToken';
import reducerQuestions from './reducerQuestions';

const rootReducer = combineReducers({
  reducerUser,
  reducerToken,
  reducerQuestions,
});

export default rootReducer;
