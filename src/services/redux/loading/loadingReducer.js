const INITIAL_STATE = {
  isLoading: false,
};

export default (state = INITIAL_STATE, action) => {
  if (action.type === 'set_loading') {
    return {
      ...state,
      isLoading: action.payload,
    };
  } else {
    return state;
  }
};
