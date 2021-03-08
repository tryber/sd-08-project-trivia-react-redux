const INITIAL_VALUE = {
  results: [],
};

const getApiReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
  case 'GET_DATA_API':
    return { ...state, results: [action.payload] };
  default:
    return state;
  }
};

export default getApiReducer;
