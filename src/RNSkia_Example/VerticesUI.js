import {View, Text} from 'react-native';
import React from 'react';
import {Canvas, vec, Vertices} from '@shopify/react-native-skia';

const VerticesUI = () => {
  const vertices = [vec(64, 0), vec(128, 256), vec(0, 256)];
  const colors = ['#61dafb', '#fb61da', '#dafb61'];
  const textures = [vec(0, 0), vec(0, 128), vec(64, 256)];
  return (
    <Canvas
      style={{
        flex: 1,
      }}>
      <Vertices colors={colors} vertices={vertices} />
      <Vertices
        vertices={vertices}
        textures={textures}
        transform={[{translateX: 128}]}
      />
    </Canvas>
  );
};

export default VerticesUI;
