import {View, Text} from 'react-native';
import React from 'react';
import {Canvas, Path, Skia} from '@shopify/react-native-skia';

const PathUI = () => {
  return (
    <Canvas style={{flex: 1, backgroundColor: 'white'}}>
      <Path
        path="M 128 0 L 168 80 L 256 93 L 192 155 L 207 244 L 128 202 L 49 244 L 64 155 L 0 93 L 88 80 L 128 0 Z"
        color="lightblue"
        start={0.2}
        end={0.5}
        style="stroke"
        strokeWidth={5}
      />
    </Canvas>
  );
};

export default PathUI;
