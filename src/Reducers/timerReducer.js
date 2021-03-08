const INITIAL_VALUE = {
  timer: 30,
  shouldRemount: false,
};

const timerReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case 'REMOVETEMPO':
    return { ...state, timer: action.payload };
  case 'REMOUNT_TIMER':
    return { ...state, shouldRemount: action.payload };
  default:
    return state;
  }
};

export default timerReducer;
