import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {G, Path, Polygon, Svg} from 'react-native-svg';
import {DataMessage, DataVNMessage} from './DataMessage';
const {width, height} = Dimensions.get('screen');
const Message = () => {
  return (
    <Svg width={(3 * width) / 4} height={250} viewBox={`-30 0 250 250`}>
      <G style="stroke">
        <Path
          d="M 0 0 h 140 q 20 0 20 20 v 100 h 0 h 0 q 0 20 -20 20 h -140 q -20 0 -20 -20 h 0 h 0 l -20 20 l 20 -40 v -80 q 0 -20 20 -20"
          stroke={'hsl(0,0%,80%)'}
          style="stroke"
          strokeWidth={2}
          fill={'white'}></Path>
      </G>
      <View
        style={{
          position: 'absolute',
          zIndex: 88,
          left: 50,
          top: 10,
        }}>
        <Text
          style={{
            width: (1.5 * width) / 4,
            height: 120,
            fontSize: 18,
            letterSpacing: 2,
            textAlign: 'justify',
            lineHeight: 26,
            color: 'black',
          }}>
          {DataVNMessage}
        </Text>
      </View>
    </Svg>
  );
};

export default Message;
