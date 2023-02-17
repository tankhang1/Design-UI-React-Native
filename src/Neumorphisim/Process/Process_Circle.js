import {
  Box,
  BoxShadow,
  FitBox,
  LinearGradient,
  rect,
  rrect,
  vec,
} from '@shopify/react-native-skia';
const border = rrect(rect(12, 12, 168.2, 168.2), 100, 100);
const container = rrect(rect(37, 37, 119.25, 119.25), 100, 100);

const Process_Circle = ({x, y, size}) => {
  return (
    <FitBox src={rect(0, 0, size, size)} dst={rect(x, y, size, size)}>
      <Box box={border}>
        <LinearGradient
          colors={['#101113', '#2B2F33']}
          start={vec(0, 0)}
          end={vec(size, size)}
        />
        <BoxShadow dx={18.67} dy={18.67} blur={65.34} color="#141415" />
        <BoxShadow dx={-18.67} dy={-18.67} blur={65.34} color="#485057" />
      </Box>
      <Box box={container} color={'#32363B'}>
        <BoxShadow
          dx={2}
          dy={2}
          blur={1}
          color="rgba(255,255,255,0.05)"
          inner
        />
        <BoxShadow
          dx={-26.43}
          dy={-26.43}
          blur={66.06}
          color="rgba(59,68,81,0.5)"
          inner
        />
        <BoxShadow
          dx={26.43}
          dy={26.43}
          blur={66.06}
          color="rgba(0,0,0,0.55)"
          inner
        />
      </Box>
    </FitBox>
  );
};

export default Process_Circle;
