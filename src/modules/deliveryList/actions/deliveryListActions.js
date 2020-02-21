/** Here you can find the actions which will dispatch the changes in redux**/

export const setDeliveries = deliveries => dispatch => {
  dispatch({
    type: 'setDeliveries',
    payload: deliveries,
  });
};

export const setActiveId = activeId => dispatch => {
  dispatch({
    type: 'setActive',
    payload: activeId,
  });
};

export const setActiveInterval = activeInterval => dispatch => {
  dispatch({
    type: 'activateInterval',
    payload: activeInterval,
  });
};

export const addDriverPosition = driverPosition => dispatch => {
  dispatch({
    type: 'acumulatePosition',
    payload: driverPosition,
  });
};
