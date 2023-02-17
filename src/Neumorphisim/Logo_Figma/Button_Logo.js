import React from 'react';
import {
  Box,
  BoxShadow,
  FitBox,
  mix,
  rect,
  rrect,
  useComputedValue,
} from '@shopify/react-native-skia';

const border = rrect(rect(0, 0, 20, 20), 5, 5);
const container = rrect(rect(1, 1, 18, 18), 5, 5);
const src = rect(0, 0, 20, 20);

const Button = ({x, y, size, children, pressed}) => {
  const c1 = useComputedValue(
    () => `rgba(255,255,255,${mix(pressed.current, 0, 0.7)})`,
    [pressed],
  );
  const c2 = useComputedValue(
    () => `rgba(174,174,192,${mix(pressed.current, 0, 0.2)})`,
    [pressed],
  );

  return (
    <FitBox src={src} dst={rect(x, y, size, size)}>
      <Box box={border} color="#EEEEEE">
        <BoxShadow dx={-1} dy={-1} blur={3} color="rgba(255,255,255,1)" />
        <BoxShadow dx={1.5} dy={1.5} blur={3} color="rgba(174,174,192,0.4)" />
      </Box>
      <Box box={container} color="#EEEEEE">
        <BoxShadow
          dx={-1}
          dy={-1}
          blur={1}
          // color={'rgba(255,255,255,0.7)'}
          color={c1}
          inner
        />
        <BoxShadow
          dx={1.5}
          dy={1.5}
          blur={1}
          // color={'rgba(174,174,192,0.2'}
          color={c2}
          inner
        />
      </Box>

      {children}
    </FitBox>
  );
};

export default Button;
