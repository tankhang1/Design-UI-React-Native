import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {
  Blur,
  Box,
  BoxShadow,
  Canvas,
  FitBox,
  Group,
  LinearGradient,
  Path,
  RadialGradient,
  Rect,
  rect,
  rrect,
  vec,
} from '@shopify/react-native-skia';
const border = rrect(rect(0, 0, 62, 62), 100, 100);
const container_out = rrect(rect(6, 6, 50, 50), 100, 100);
const container_in = rrect(rect(6, 6, 50, 50), 100, 100);

const Process_Top_Button = ({x, y, size, pathSrc, transX}) => {
  return (
    <FitBox src={rect(0, 0, size, size)} dst={rect(x, y, size, size)}>
      <Box box={border}>
        <RadialGradient colors={['#5D6167', '#13151A']} c={vec(0, 0)} r={62} />
        <BoxShadow dx={10} dy={10} blur={20} color={'rgba(0,0,0,0.5)'} />
        <Blur blur={5} />
      </Box>
      <Box box={container_in}>
        <LinearGradient
          colors={['rgba(0,0,0,0.45)', '#FFFFFF']}
          start={vec(0, 0)}
          end={vec(62, 62)}
        />
      </Box>
      <Box box={container_out}>
        <RadialGradient colors={['#545659', '#232629']} c={vec(0, 0)} r={62} />
        <BoxShadow dx={1} dy={1} blur={4} color="rbga(0,0,0,0.2.5)" inner />
      </Box>

      <Group>
        <Path
          path={pathSrc}
          opacity={0.6}
          color="#EBEBF5"
          transform={[{translateX: transX}, {translateY: 20}, {scale: 1.2}]}
        />
      </Group>
    </FitBox>
  );
};

export default Process_Top_Button;
