import React from 'react';
import {
  Canvas,
  Rect,
  RadialGradient,
  Skia,
  Shader,
  vec,
} from '@shopify/react-native-skia';
const RadialGradientUI = () => {
  return (
    <Canvas style={{flex: 1}}>
      <Rect x={0} y={0} width={256} height={256}>
        <RadialGradient
          c={vec(128, 128)}
          r={128}
          colors={['blue', 'yellow']}
          positions={[0.4, 0.6]}
        />
      </Rect>
    </Canvas>
  );
};

export default RadialGradientUI;
