import {View, Text, Pressable} from 'react-native';
import React from 'react';
import TouchID from 'react-native-touch-id';
const Scanner = () => {
  const optionalConfigObject = {
    title: 'Authentication Required', // Android
    imageColor: 'hsl(221,100%,64%)', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };
  const onPress = async () => {
    await TouchID.authenticate(
      'The finger you use to enter your phone',
      optionalConfigObject,
    )
      .then(success => {
        console.log(success);
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={onPress}
        style={{
          width: 200,
          height: 50,
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Scanner</Text>
      </Pressable>
    </View>
  );
};

export default Scanner;
