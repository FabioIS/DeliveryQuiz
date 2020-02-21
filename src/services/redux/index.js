import {combineReducers} from 'redux';
import deliveryListReducer from '../../modules/deliveryList/reducer/deliveryListReducer';
import loadingReducer from './loading/loadingReducer';

const reducer = combineReducers({
  deliveryListReducer,
  loadingReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    this.state = undefined;
  }

  return reducer(state, action);
};

export default rootReducer;
