import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export const DeliveryElement = props => {
  const {item, isActive, callbackId, callbackInterval} = props;

  return (
    <TouchableOpacity
      style={[
        styleSheet.mainContainer,
        item.id === isActive
          ? styleSheet.mainContainerS
          : styleSheet.mainContainerNS,
      ]}
      onPress={() =>
        Actions.deliveryDetail({
          deliveryId: item.id,
          callbackId: callbackId,
          callbackInterval: callbackInterval,
        })
      }>
      <View style={styleSheet.subContainer}>
        <Text>Id: {item.id}</Text>
        <Text>Costumer name: {item.customer_name}</Text>
        <Text>Address: {item.address}</Text>
      </View>
      <View style={styleSheet.subContainer}>
        <Text>Latitude: {item.latitude}</Text>
        <Text>Longitude: {item.longitude}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styleSheet = StyleSheet.create({
  mainContainer: {
    height: 110,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  mainContainerNS: {
    backgroundColor: 'white',
  },
  mainContainerS: {
    backgroundColor: 'lightgrey',
  },
  subContainer: {
    width: '50%',
    paddingLeft: 15,
    justifyContent: 'center',
  },
});
