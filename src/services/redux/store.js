import thunk from 'redux-thunk';
import {applyMiddleware, compose, createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import rootReducer from './index';
import AsyncStorage from '@react-native-community/async-storage';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [''],
};

const reducers = persistReducer(config, rootReducer);

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && __DEV__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({shouldHotReload: false})
    : compose;

export default function configureStore() {
  const middleware = __DEV__ ? [thunk] : [thunk];
  const enhancers = [applyMiddleware(...middleware)];
  const initialState = {};
  // if (__DEV__) middleware.push(logger); //Show logs on Chrome

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(...enhancers),
    // compose(...enhancers)
  );
  let persistor = persistStore(store);

  return {persistor, store};
}
