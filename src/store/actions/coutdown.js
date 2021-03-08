import { CURRENT_COUTDOWN, STOP_COUTDOWN, RESTART_COUTDOWN } from '../consts';

export const currentTimer = (seconds) => ({
  type: CURRENT_COUTDOWN,
  payload: seconds,
});

export const stopTime = (bool) => ({
  type: STOP_COUTDOWN,
  payload: bool,
});

export const restartCoutdown = () => ({
  type: RESTART_COUTDOWN,
});
