const InitialState = {
  timer: '',
  countfinished: '',
};

const TimerClock = (state = InitialState, action) => {
  switch (action.type) {
  case 'TIMER':
    return {
      ...state,
      timer: action.payload.timer,
      countfinished: action.payload.countTOF,
    };
  default:
    return state;
  }
};

export default TimerClock;
