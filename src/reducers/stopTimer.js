const initialState = {
  stop: false,
};

const stopTimer = (state = initialState, action) => {
  switch (action.type) {
  case 'STOP_TIMER':
    return ({
      stop: action.payload,
    });
  default:
    return state;
  }
};

export default stopTimer;
