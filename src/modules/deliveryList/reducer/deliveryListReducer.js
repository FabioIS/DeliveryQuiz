import {AxiosInstance as axios} from 'axios';

const INITIAL_STATE = {
  deliveries: [],
  activeId: -1,
  isActive: false,
  driverPositions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'setDeliveries':
      return {
        ...state,
        deliveries: action.payload,
      };
    case 'setActive':
      return {
        ...state,
        activeId: action.payload,
      };
    case 'activateInterval':
      return {
        ...state,
        isActive: action.payload,
      };
    /** Each second we acumulate the position of the driver so when we have 10 positions, the array can be "sent"
     * to the API**/
    case 'acumulatePosition':
      let positions = state.driverPositions;
      positions.push(action.payload);
      if (positions.length === 10) {
        console.log(positions);
        //Fake request to post all deliveries from the api
        // axios
        //   .post('http://mockurl/api/traking', positions)
        //   .then(function(response) {
        //     // Here we show the response from the api
        //     console.log(response);
        //   })
        //   .catch(function(error) {
        //     console.log(error);
        //   });
        positions = [];
      }
      return {
        ...state,
        driverPositions: positions,
      };
    default:
      return state;
  }
};
