import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import UserScreen from './Screens/UserScreen';
import SettingScreen from './Screens/SettingScreen';
import HomeScreen from './Screens/HomeScreen';
import CustomTabbar from './CustomTabbar';
const BottomTab = createBottomTabNavigator();
const NavigationBottom = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator tabBar={props => <CustomTabbar {...props} />}>
        <BottomTab.Screen name="User" component={UserScreen} />
        <BottomTab.Screen name="Setting" component={SettingScreen} />
        <BottomTab.Screen name="Home" component={HomeScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBottom;
