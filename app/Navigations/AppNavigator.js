import { View, Text } from 'react-native';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../Screens/Login';
import StartScreen from '../Screens/StartScreen';
import Signup from '../Screens/Signup';
import VerifySignup from '../Screens/VerifySignup';
import ForgotPassword1 from '../Screens/ForgotPassword1';
import ForgotPassword2 from '../Screens/ForgotPassword2';
import Home from '../Screens/Home';
import TabNavigation from './TabNavigation';
import ProductDetail from '../Screens/ProductDetail';

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="StartScreen"
          component={StartScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="VerifySignup"
          component={VerifySignup}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgotPassword1"
          component={ForgotPassword1}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ForgotPassword2"
          component={ForgotPassword2}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="TabNavigation"
          component={TabNavigation}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ProductDetail"
          component={ProductDetail}
        />

        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="MyAddress"
          component={MyAddress}
        /> */}
        {/* <Stack.Screen
          options={{ headerShown: false }}
          name="AddAddress"
          component={AddAddress}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
