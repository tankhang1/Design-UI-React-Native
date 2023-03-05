import {View, Text} from 'react-native';
import React from 'react';
import {
  Canvas,
  Circle,
  Fill,
  Image,
  ImageShader,
  useImage,
} from '@shopify/react-native-skia';

const Images = () => {
  const image = useImage(require('./Image/person.jpg'));
  if (image === null) return null;
  return (
    <Canvas
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {/* <Circle cx={128} cy={128} r={128}> */}
      <Fill>
        <ImageShader
          image={image}
          fit="contain"
          rect={{x: 0, y: 0, width: 256, height: 256}}
          tx="repeat"
          ty="repeat"
        />
      </Fill>
      {/* </Circle> */}
    </Canvas>
  );
};

export default Images;
