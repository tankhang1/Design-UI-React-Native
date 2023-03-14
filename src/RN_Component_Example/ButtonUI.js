import {View, Text, Button, Alert} from 'react-native';
import React from 'react';

const ButtonUI = () => {
  const onPress = () => {
    Alert.alert('You have just pressed button');
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button
        //onPress properties is used to call funtion
        onPress={onPress}
        //The text inside button
        title="Button"
        //Color background of button
        color={'red'}
        //If disabled equal true then we can't press button
        disabled={false}
        //If touchSoundDisabled equal false then when touch the sound in system turn on
        touchSoundDisabled={false}
      />
    </View>
  );
};

export default ButtonUI;
