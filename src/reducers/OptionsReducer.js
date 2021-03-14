const InitialState = {
  options: [],
};

const option = (state = InitialState, action) => {
  switch (action.type) {
  case 'USER_OPTIONS':
    return {
      ...state,
      options: action.payload.userOptions,

    };
  default:
    return state;
  }
};

export default option;
