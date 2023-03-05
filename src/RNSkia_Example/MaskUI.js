import {View, Text} from 'react-native';
import React from 'react';
import {Canvas, Mask, Group, Circle, Rect} from '@shopify/react-native-skia';

const MaskUI = () => {
  return (
    <Canvas style={{width: 256, height: 256}}>
      <Mask
        mode="luminance"
        mask={
          <Group>
            <Circle cx={128} cy={128} r={128} color="white" />
            <Circle cx={128} cy={128} r={10} color="black" />
          </Group>
        }>
        <Rect x={0} y={0} width={480} height={480} color="lightblue" />
      </Mask>
    </Canvas>
  );
};

export default MaskUI;
