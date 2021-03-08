export const RESTART_TIME = 'RESTART_TIME';
export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';

export const timer = (callback) => ({ type: RESTART_TIME, resetTimer: callback });
export const setCurrentTime = (curTime) => (
  { type: SET_CURRENT_TIME, currentTime: curTime }
);
