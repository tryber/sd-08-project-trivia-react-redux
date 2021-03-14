const INITIAL_STATE = {

};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'TOKEN':

    return { ...state, tokenNew: action.value };

  default:
    return state;
  }
};

export default token;
