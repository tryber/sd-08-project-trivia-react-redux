const INITIAL_STATE = {
  timeLeft: 30,
};

export default function updateTimeLeft(state = INITIAL_STATE, action) {
  const { type, payload } = action;
  switch (type) {
  case 'UPDATE_TIME':
    return { ...state, timeLeft: payload };

  default:
    return state;
  }
}
