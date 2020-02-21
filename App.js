import React, {Component} from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';

// Config
import configureStore from './src/services/redux/store';
import RouterComponent from './src/services/navigation/Router';

const {persistor, store} = configureStore();

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <View style={{flex: 1}}>
            <RouterComponent />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
