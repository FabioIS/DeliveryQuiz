export const setLoading = (value) => async dispatch => {
  dispatch({
    type: 'set_loading',
    payload: value,
  });
};
