import {View, Text} from 'react-native';
import React from 'react';
import {Canvas, Circle, Oval} from '@shopify/react-native-skia';

const EllipsesUI = () => {
  const r = 128;
  return (
    <Canvas style={{flex: 1}}>
      <Circle cx={r} cy={r} r={r} color="lightblue" />
      <Oval x={64} y={300} width={128} height={256} color="lightblue" />
    </Canvas>
  );
};

export default EllipsesUI;
