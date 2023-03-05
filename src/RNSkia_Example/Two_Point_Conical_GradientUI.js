import React from 'react';
import {
  Canvas,
  Rect,
  TwoPointConicalGradient,
  Skia,
  Shader,
  vec,
  Fill,
  RoundedRect,
} from '@shopify/react-native-skia';
const Two_Point_Conical_GradientUI = () => {
  return (
    <Canvas style={{flex: 1, backgroundColor: 'black'}}>
      <RoundedRect x={0} y={0} width={240} height={300} r={80}>
        <TwoPointConicalGradient
          start={vec(100, 100)}
          startR={10}
          end={vec(100, 150)}
          endR={120}
          colors={['white', 'hsl(0,0%,20%)']}
        />
      </RoundedRect>
      <Rect x={0} y={450} width={240} height={300}>
        <TwoPointConicalGradient
          start={vec(100, 400)}
          startR={10}
          end={vec(100, 500)}
          endR={50}
          colors={['white', 'hsl(0,0%,20%)']}
        />
      </Rect>
    </Canvas>
  );
};

export default Two_Point_Conical_GradientUI;
