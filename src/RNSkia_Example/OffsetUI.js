import {View, Text} from 'react-native';
import React from 'react';
import {
  Canvas,
  Image,
  Offset,
  useImage,
  Fill,
} from '@shopify/react-native-skia';
const OffsetUI = () => {
  const image = useImage(require('./Image/person.jpg'));
  if (!image) {
    return null;
  }
  return (
    <Canvas style={{width: 256, height: 256}}>
      <Fill color="lightblue" />
      <Image image={image} x={0} y={0} width={256} height={256} fit="cover">
        <Offset x={64} y={64} />
      </Image>
    </Canvas>
  );
};

export default OffsetUI;
