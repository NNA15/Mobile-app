import { View, Text } from 'react-native';
import React from 'react';
import AppNavigator from './app/Navigations/AppNavigator';
import { Provider } from 'react-redux';
import MainContainer from './app/MainContainer';
import store from './app/redux/store/Store';


const App = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

export default App;