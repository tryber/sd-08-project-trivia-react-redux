export const Types = {
  DECREASE: 'DECREASE',
  STOP_TIMER: 'STOP_TIMER',
  RESET_TIMER: 'RESET_TIMER',
  SAVE_INTERVAL_ID: 'SAVE_INTERVAL_ID',
};

const ONE_SECOND = 1000;

const INITIAL_STATE = {
  count: 30,
  timerInterval: null,
  isTimedOut: false,
};

export const Creators = {
  decreaseCounter: () => ({
    type: Types.DECREASE,
  }),

  stopTimer: () => ({
    type: Types.STOP_TIMER,
  }),

  saveIntervalId: (id) => ({
    type: Types.SAVE_INTERVAL_ID,
    payload: id,
  }),

  resetTimer: () => ({
    type: Types.RESET_TIMER,
  }),

  startTimer: () => (dispatch) => {
    const intervalId = setInterval(() => {
      dispatch(Creators.decreaseCounter());
    }, ONE_SECOND);
    dispatch(Creators.saveIntervalId(intervalId));
  },
};

const timer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.DECREASE: {
    const newCount = state.count - 1;
    if (newCount <= 0) clearInterval(state.intervalId);
    return {
      ...state,
      count: newCount < 0 ? 0 : newCount,
      isTimedOut: newCount <= 0,
    };
  }

  case Types.SAVE_INTERVAL_ID: {
    return {
      ...state,
      intervalId: action.payload,
    };
  }

  case Types.STOP_TIMER: {
    clearInterval(state.intervalId);
    return { ...state, intervalId: null };
  }

  case Types.RESET_TIMER: {
    clearInterval(state.intervalId);
    return {
      ...state,
      intervalId: null,
      isTimedOut: false,
      count: INITIAL_STATE.count,
    };
  }

  default: return state;
  }
};

export default timer;
