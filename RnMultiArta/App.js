import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

import store from './src/redux/store';
import LoginScreen from './src/pages/login/LoginScreen';
import HomeScreen from './src/pages/home/HomeScreen';
import DetailScreen from './src/pages/home/DetailScreen';

import color from './src/config/Colors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="LoginScreen"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="HomeScreen"
            component={HomeScreen}
          />
          <Stack.Screen
            name="DetailScreen"
            component={DetailScreen}
            options={{headerShown: false,}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
