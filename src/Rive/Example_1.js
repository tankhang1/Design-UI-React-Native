import {View, Text} from 'react-native';
import React, {useRef} from 'react';
import Rive, {Alignment, Fit, RiveRef} from 'rive-react-native';
const Example_1 = () => {
  const riveRef = useRef(null);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View>
        <Text style={{color: 'black'}}>Run time</Text>
        <Rive
          resourceName="danger"
          artboardName="Screen"
          stateMachineName="State Machine 1"
          style={{
            width: 250,
            height: 250,
          }}
          autoplay={true}
        />
      </View>
    </View>
  );
};

export default Example_1;
