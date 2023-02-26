import {View, Text} from 'react-native';
import React from 'react';
import {
  Canvas,
  DiffRect,
  Line,
  Points,
  rect,
  Rect,
  RoundedRect,
  rrect,
  vec,
} from '@shopify/react-native-skia';

const PolygonsUI = () => {
  const points = [
    vec(128, 0),
    vec(168, 80),
    vec(256, 93),
    vec(192, 155),
    vec(207, 244),
    vec(128, 202),
    vec(49, 244),
    vec(64, 155),
    vec(0, 93),
    vec(88, 80),
    vec(128, 0),
  ];
  const outer = rrect(rect(20, 240, 256, 256), 25, 25);
  const inner = rrect(rect(50, 260, 256 - 100, 256 - 100), 50, 50);
  return (
    <Canvas
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Rect x={20} y={10} width={250} height={100} color="green" />
      <RoundedRect x={20} y={120} width={250} height={100} r={10} />
      <DiffRect inner={inner} outer={outer} color="lightblue" />
      <Line
        p1={vec(260, 0)}
        p2={vec(300, 256)}
        color="lightblue"
        style="stroke"
        strokeWidth={4}
      />
      <Points
        points={points}
        mode="polygon"
        color="lightblue"
        style="stroke"
        strokeWidth={4}
      />
    </Canvas>
  );
};

export default PolygonsUI;
