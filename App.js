
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigator/AppNavigator';
import { Provider } from 'react-redux';
import store from './app/store';
import Toast from 'react-native-toast-message';
import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);


const App = () => {
  return (
    <>
    <NavigationContainer>
    <Provider store={store}>
      <AppNavigator />
      </Provider>
    </NavigationContainer>
    <Toast />
    </>
  );
}

export default App;