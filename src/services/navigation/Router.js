import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';
import DeliveryList from '../../modules/deliveryList/deliveryList';
import DeliveryDetail from '../../modules/deliveryDetail/deliveryDetail';

const RouterComponent = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="deliveryList" initial component={DeliveryList} />
        <Scene key="deliveryDetail" component={DeliveryDetail} />
      </Stack>
    </Router>
  );
};

export default RouterComponent;
