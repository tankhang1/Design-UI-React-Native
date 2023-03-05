import {View, Text} from 'react-native';
import React from 'react';
import {Canvas, Patch, vec} from '@shopify/react-native-skia';

const PatchUI = () => {
  const colors = ['#61dafb', '#fb61da', '#61fbcf', '#dafb61'];
  const C = 64;
  const width = 256;
  const topLeft = {
    pos: vec(0, 0),
    c1: vec(C * 0, C * 0.86),
    c2: vec(C, C * 0.05),
  };
  const topRight = {
    pos: vec(width, 0),
    c1: vec(width, C),
    c2: vec(width + C, 0),
  };
  const bottomRight = {
    pos: vec(width, width),
    c1: vec(width, width - 2 * C),
    c2: vec(width - 2 * C, width),
  };
  const bottomLeft = {
    pos: vec(0, width),
    c1: vec(0, width - 2 * C),
    c2: vec(-2 * C, width),
  };
  return (
    <Canvas
      style={{
        flex: 1,
      }}>
      <Patch
        colors={colors}
        patch={[topLeft, topRight, bottomRight, bottomLeft]}
        transform={[{translateX: 60}, {translateY: 100}]}
      />
    </Canvas>
  );
};

export default PatchUI;
