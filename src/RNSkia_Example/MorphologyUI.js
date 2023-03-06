import React from 'react';
import {Canvas, Text, Morphology, useFont} from '@shopify/react-native-skia';
const MorphologyUI = () => {
  const font = useFont(require('./Fonts/Roboto-Bold.ttf'), 60);
  if (font === null) {
    return null;
  }
  return (
    <Canvas style={{width: 400, height: 500, backgroundColor: 'white'}}>
      <Text text="Hello World" x={32} y={80} font={font} />
      <Text text="Hello World" x={32} y={150} font={font}>
        <Morphology radius={0.9} operator="erode" />
      </Text>
      <Text text="Hello World" x={32} y={200} font={font}>
        <Morphology radius={0.3} operator="erode" />
      </Text>
    </Canvas>
  );
};

export default MorphologyUI;
