import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Info from './Screens/Info';
import Charging from './Charging';
import Plus from './Screens/Plus';
import Car from './Screens/Car';
import Location from './Screens/Location';
import CustomTabBar from './CustomTabBar';
const Tab = createBottomTabNavigator();
const NavigationBottom = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <CustomTabBar {...props} />}
        initialRouteName="Charging">
        <Tab.Screen name="Charging" component={Charging} />
        <Tab.Screen name="Car" component={Car} />
        <Tab.Screen name="Plus" component={Plus} />
        <Tab.Screen name="Location" component={Location} />
        <Tab.Screen name="Info" component={Info} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBottom;
