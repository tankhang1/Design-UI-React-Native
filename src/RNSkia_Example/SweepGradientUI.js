import React from 'react';
import {
  Canvas,
  Rect,
  SweepGradient,
  Skia,
  Shader,
  vec,
} from '@shopify/react-native-skia';

const SweepGradientUI = () => {
  return (
    <Canvas style={{flex: 1}}>
      <Rect x={0} y={0} width={256} height={256}>
        <SweepGradient
          c={vec(128, 128)}
          start={150}
          end={360}
          colors={['yellow', 'blue', 'red', 'green', 'cray']}
        />
      </Rect>
    </Canvas>
  );
};

export default SweepGradientUI;
