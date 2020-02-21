import React, {Component} from 'react';
import {FlatList, View, StyleSheet, AppState} from 'react-native';
import {connect} from 'react-redux';
import {DeliveryElement} from './deliveryElement';
import {testData} from '../../resources/testData';
import {
  setActiveId,
  setDeliveries,
  setActiveInterval,
  addDriverPosition,
} from './actions/deliveryListActions';
import DeviceBattery from 'react-native-device-battery';
import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {AxiosInstance as axios} from 'axios';

let deliveryPosition = '';

class DeliveryList extends Component {
  componentDidMount(): void {
    //Fake request to get all deliveries from the api
    // axios
    //   .get('http://mockurl/api/deliveries')
    //   .then(function(response) {
    //     //Here we retrieve the data from the api
    //     let data = response.data;
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    const {deliveries} = testData;
    const {setDeliveries} = this.props;
    this.requestLocationPermission();
    setDeliveries(deliveries);
  }

  /** Ask permisions for using the location**/
  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'This app needs permission for using the location',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const {deliveries, activeId, isActive, setActiveInterval} = this.props;

    isActive && activeId !== -1
      ? this._setTracking(activeId)
      : BackgroundTimer.stopBackgroundTimer();
    return (
      <View style={{flex: 1, marginTop: 35}}>
        <FlatList
          contentContainerStyle={styles.flatlistContainer}
          //We actually get the data from a file
          data={deliveries}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) =>
            this._renderItem(item, isActive, setActiveInterval)
          }
        />
      </View>
    );
  }

  /**Once one delivery is activated we created an interval and set the activeInterval variable to false so we don´t
   * create multiple intervals**/
  _setTracking = activeId => {
    return BackgroundTimer.runBackgroundTimer(async () => {
      this._activeDeliveryHandler(activeId);
    }, 1000);
  };

  _activeDeliveryHandler = async activeId => {
    let batteryLevel = '';
    if (AppState.currentState === 'active') {
      await DeviceBattery.getBatteryLevel().then(battery => {
        batteryLevel = battery * 100;
      });
    }
    await this._getPosition();
    setActiveInterval(false);
    let trackingData = {
      driver_id: activeId,
      tracking_data: {
        driverPosition: deliveryPosition,
      },
    };
    if (AppState.currentState === 'active') {
      trackingData.tracking_data.batteryLevel = batteryLevel + '%';
    }

    this.props.addDriverPosition(trackingData);
  };

  _getPosition = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        deliveryPosition = position.coords;
      },
      () => {},
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 9000},
    );
  };

  _renderItem = item => {
    const {activeId, setActiveId, setActiveInterval} = this.props;
    return (
      <DeliveryElement
        item={item}
        isActive={activeId}
        callbackId={setActiveId}
        callbackInterval={setActiveInterval}
      />
    );
  };
}

const styles = StyleSheet.create({
  flatlistContainer: {
    padding: 5,
  },
});

const mapStateToProps = ({deliveryListReducer}) => {
  const {deliveries, activeId, isActive} = deliveryListReducer;
  return {
    deliveries,
    activeId,
    isActive,
  };
};

const mapStateToPropsAction = {
  setDeliveries,
  setActiveId,
  setActiveInterval,
  addDriverPosition,
};

export default connect(
  mapStateToProps,
  mapStateToPropsAction,
)(DeliveryList);

// export default DeliveryList;
