import {View, Text} from 'react-native';
import React from 'react';
import {Canvas, ColorMatrix, Image, useImage} from '@shopify/react-native-skia';
const MaskFilterUI = () => {
  const image = useImage(require('./Image/person.jpg'));
  if (!image) {
    return null;
  }
  return (
    <Canvas style={{flex: 1}}>
      <Image x={0} y={0} width={256} height={256} image={image} fit="cover">
        <ColorMatrix
          matrix={[
            -0.578, 0.99, 0.588, 0, 0, 0.469, 0.535, -0.003, 0, 0, 0.015, 1.69,
            -0.703, 0, 0, 0, 0, 0, 1, 0,
          ]}
        />
      </Image>
    </Canvas>
  );
};

export default MaskFilterUI;
