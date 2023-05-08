import {View, Text} from 'react-native';
import React from 'react';
import {Canvas, Blur, Image, useImage} from '@shopify/react-native-skia';
const BlurUI = () => {
  const image = useImage(require('./Image/person.jpg'));
  if (!image) {
    return null;
  }
  return (
    <Canvas style={{flex: 1}}>
      <Image x={0} y={0} width={256} height={256} image={image} fit="cover">
        <Blur blur={4} />
      </Image>
    </Canvas>
  );
};

export default BlurUI;
