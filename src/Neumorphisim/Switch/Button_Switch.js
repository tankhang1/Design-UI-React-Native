import {View, Text} from 'react-native';
import React from 'react';
import {
  Box,
  BoxShadow,
  FitBox,
  Group,
  mix,
  rect,
  rrect,
  useComputedValue,
} from '@shopify/react-native-skia';
import {Circle} from 'react-native-svg';
const border = rrect(rect(0, 0, 48, 24), 12, 12);
const container = rrect(rect(1, 1, 46, 22), 12, 12);
const src = rect(0, 0, 48, 22);
const dot = rrect(rect(0, 0, 16, 16), 100, 100);
const miniDot = rrect(rect(5, 5, 5, 5), 12, 12);
const Button_Switch = ({x, y, width, height, pressed, children}) => {
  //const r = useComputedValue(() => mix(pressed.current, 0, 4), [pressed]);
  const transform = useComputedValue(
    () => [{translateX: mix(pressed.current, 4, 25)}, {translateY: 4}],
    [pressed],
  );
  const scaleTransform = useComputedValue(
    () => [{scale: mix(pressed.current, 1, 2)}],
    [pressed],
  );
  return (
    <FitBox src={src} dst={rect(x, y, width, height)}>
      <Box box={border} color="#EEEEEE">
        <BoxShadow dx={-1} dy={-1} blur={3} color={'rgba(255,255,255,1)'} />
        <BoxShadow dx={1.5} dy={1.5} blur={3} color={'rgba(174,174,192,0.4)'} />
      </Box>
      <Box box={container} color="#EEEEEE">
        <BoxShadow
          dx={-1}
          dy={-1}
          blur={1}
          color={'rgba(255,255,255,0.7)'}
          inner
        />
        <BoxShadow
          dx={1}
          dy={1}
          blur={2}
          color={'rgba(174,174,192,0.2)'}
          inner
        />
      </Box>
      <Group transform={transform}>
        <Box box={dot} color="#F0F0F3">
          <BoxShadow dx={-1} dy={-1} blur={3} color="rgba(255,255,255,1)" />
          <BoxShadow dx={1} dy={1} blur={3} color="rgba(174,174,192,0.4)" />
        </Box>
        <Box box={miniDot} color="black" transform={scaleTransform}>
          <BoxShadow dx={-1} dy={-1} blur={3} color="rgba(255,255,255,1)" />
          <BoxShadow dx={1} dy={1} blur={3} color="rgba(174,174,192,0.4)" />
        </Box>
      </Group>
    </FitBox>
  );
};

export default Button_Switch;
