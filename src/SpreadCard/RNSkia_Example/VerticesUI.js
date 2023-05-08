import {View, Text} from 'react-native';
import React from 'react';
import {Canvas, vec, Vertices} from '@shopify/react-native-skia';

const VerticesUI = () => {
  const vertices = [vec(0, 0), vec(256, 0), vec(256, 256), vec(0, 256)];
  const colors = ['#61dafb', '#fb61da', '#dafb61'];
  const triangle1 = [0, 1, 2];
  const triangle2 = [0, 2, 3];
  const indices = [...triangle1, ...triangle2];
  const textures = [vec(0, 0), vec(0, 128), vec(64, 256)];
  return (
    <Canvas
      style={{
        flex: 1,
      }}>
      <Vertices
        colors={colors}
        vertices={vertices}
        indices={indices}
        transform={[{translateX: 50}, {translateY: 100}]}
      />
      {/* <Vertices
        vertices={vertices}
        textures={textures}
        transform={[{translateX: 128}]}
      /> */}
    </Canvas>
  );
};

export default VerticesUI;
