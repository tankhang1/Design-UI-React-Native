import React from 'react';
import {
  Canvas,
  Rect,
  LinearGradient,
  Skia,
  Shader,
  vec,
  Fill,
} from '@shopify/react-native-skia';

const LinearGradientUI = () => {
  return (
    <Canvas style={{flex: 1}}>
      <Fill>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(400, 0)}
          colors={['blue', 'yellow']}
          //   positions={[0.5, 0.9]}
          flags={0}
        />
      </Fill>
    </Canvas>
  );
};

export default LinearGradientUI;
