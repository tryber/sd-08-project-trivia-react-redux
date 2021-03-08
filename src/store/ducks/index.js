import game from './game';
import user from './user';
import timer from './timer';
import ranking from './ranking';
import auth from './auth';

// Source: https://itnext.io/passing-state-between-reducers-in-redux-318de6db06cd
const rootReducer = (state = {}, action) => ({
  user: user(state.user, action),
  timer: timer(state.timer, action),
  auth: auth(state.auth, action),
  ranking: ranking(state.ranking, action),
  game: game(state.game, { ...action, timer: state.timer }),
});

export default rootReducer;
