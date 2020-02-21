import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {testDataDetails} from '../../resources/testDataDetail';
import {setLoading} from '../../services/redux/loading/loadingActions';
import {connect} from 'react-redux';
import {setActiveId} from '../deliveryList/actions/deliveryListActions';
import {AxiosInstance as axios} from 'axios';

let deliveryDetailed = '';

class DeliveryDetail extends Component {
  componentDidMount(): void {
    /**We take variables from testDataDetails file and give time to update the data in the component**/
    const {deliveries} = testDataDetails;
    this.props.setLoading(true);
    //Fake request to get all deliveries from the api
    // axios
    //   .get('http://mockurl/api/delivery/' + this.props.deliveryId)
    //   .then(function(response) {
    //     Here we retrieve the data from the api
    //     let data = response.data;
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    deliveryDetailed = deliveries.find(item => {
      return this.props.deliveryId === item.id;
    });
    setTimeout(() => {
      this.props.setLoading(false);
    }, 4000);
  }

  render() {
    const {
      activeId,
      callbackId,
      callbackInterval,
      isLoading,
      setActiveId,
    } = this.props;
    if (isLoading === false) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Id: {deliveryDetailed.id}</Text>
          <Text>Costumer name: {deliveryDetailed.customer_name}</Text>
          <Text>Address: {deliveryDetailed.address}</Text>
          <Text>Latitude: {deliveryDetailed.latitude}</Text>
          <Text>Longitude: {deliveryDetailed.longitude}</Text>
          <Text>
            Requires signature?: {deliveryDetailed.requires_signature}{' '}
          </Text>
          <Text>
            Special instructions: {deliveryDetailed.special_instructions}
          </Text>
          {activeId !== deliveryDetailed.id ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                this._activateDelivery(
                  deliveryDetailed.id,
                  callbackId,
                  callbackInterval,
                )
              }>
              <Text>Activate</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setActiveId(-1);
                Actions.pop();
              }}>
              <Text>Deactivate</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      );
    }
  }

  /**We can use callbacks to activate the deliveries or use redux like the deactivation option.**/
  _activateDelivery = (deliveryId, callbackId, callbackInterval) => {
    callbackId(deliveryId);
    callbackInterval(true);
    Actions.pop();
  };
}

const styles = StyleSheet.create({
  button: {
    height: 30,
    width: 80,
    marginTop: 30,
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = ({loadingReducer, deliveryListReducer}) => {
  const {isLoading} = loadingReducer;
  const {activeId} = deliveryListReducer;
  return {
    isLoading,
    activeId,
  };
};

const mapStateToPropsAction = {
  setLoading,
  setActiveId,
};

export default connect(
  mapStateToProps,
  mapStateToPropsAction,
)(DeliveryDetail);
