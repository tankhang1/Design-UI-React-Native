import React from 'react';
import {
  Box,
  BoxShadow,
  FitBox,
  LinearGradient,
  rect,
  rrect,
  vec,
} from '@shopify/react-native-skia';

const Process_Slide = ({x, y, width, height, currentTrack}) => {
  const track = rrect(rect(0, 3.5, 192.5, 7.5), 25, 25);
  const track_current = rrect(rect(0, 4, currentTrack, 7.5), 25, 25);
  const knob = rrect(rect(currentTrack - 27.5 / 2, -2, 27.5, 20), 6, 6);
  const line_knob = rrect(rect(currentTrack - 27.5 / 4, 2, 3.75, 10), 1, 1);
  return (
    <FitBox src={rect(0, 0, width, height)} dst={rect(x, y, width, height)}>
      <Box box={track} color="#1B1B1D">
        <BoxShadow
          dx={-1.25}
          dy={-1.25}
          blur={6}
          inner
          color={'rgba(255,255,255,0.08)'}
        />
        <BoxShadow
          dx={1.25}
          dy={1.25}
          blur={6}
          inner
          color={'rgba(0,0,0,0.8)'}
        />
      </Box>
      <Box box={track_current}>
        <LinearGradient
          colors={['#2FB8FF', '#9EECD9']}
          start={vec(63.47 / 2, 0)}
          end={vec(63.47 / 2, 12)}
        />
      </Box>
      <Box box={knob}>
        <LinearGradient
          colors={['#2E3236', '#141515']}
          start={vec(0, 0)}
          end={vec(27.5, 25)}
        />
        <BoxShadow dx={4} dy={6} blur={20} color="rgba(0,0,0,0.35)" />
        <BoxShadow dx={1} dy={2} blur={20} color="rgba(104,211,236,0.15)" />
        <BoxShadow dx={-1} dy={-1} blur={8} color="rgba(0,0,0,0.69)" />
      </Box>
      <Box box={line_knob} color="#272A2E">
        <BoxShadow
          dx={-1}
          dy={-1}
          blur={2}
          color="rgba(255,255,255,0.07)"
          inner
        />
        <BoxShadow dx={1} dy={1} blur={2} color="rgba(0,0,0,0.39)" inner />
      </Box>
      <Box box={line_knob} color="#272A2E" transform={[{translateX: 7}]}>
        <BoxShadow
          dx={-1}
          dy={-1}
          blur={2}
          color="rgba(255,255,255,0.07)"
          inner
        />
        <BoxShadow dx={1} dy={1} blur={2} color="rgba(0,0,0,0.39)" inner />
      </Box>
    </FitBox>
  );
};

export default Process_Slide;
