import {View, Text, ActivityIndicator} from 'react-native';
import React from 'react';

const ActivityIndicatorUI = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator
        //if animating equal false then indicator will hide . Default is true
        animating={true}
        //The color of spinner
        color="red"
        //The size of spinner. Value of size can "small", "large","number"
        size={'large'}
      />
    </View>
  );
};

export default ActivityIndicatorUI;
