import {View, Text} from 'react-native';
import React from 'react';
import {Canvas, Image, useImage} from '@shopify/react-native-skia';

const ImageUI = () => {
  const image = useImage(
    'https://i.pinimg.com/564x/15/2c/bb/152cbbcbbe9a02ed755ea9aa6106bbb3.jpg',
  );

  return (
    <Canvas
      style={{
        flex: 1,
      }}>
      {image && (
        <Image
          image={image}
          fit="scaleDown"
          x={0}
          y={0}
          width={250}
          height={250}
        />
      )}
    </Canvas>
  );
};

export default ImageUI;
