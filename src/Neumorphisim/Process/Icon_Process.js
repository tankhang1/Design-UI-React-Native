import {
  Box,
  BoxShadow,
  FitBox,
  Group,
  LinearGradient,
  Paint,
  Path,
  rect,
  rrect,
  vec,
} from '@shopify/react-native-skia';
const border = rrect(rect(0, 0, 50, 50), 100, 100);
const container = rrect(rect(3, 3, 45, 45), 100, 100);
const Icon_Process = ({x, y, size, pathIcon, transIconX, transIconY}) => {
  return (
    <FitBox src={rect(0, 0, size, size)} dst={rect(x, y, size, size)}>
      <Box box={border} style="stroke" strokeWidth={1}>
        <LinearGradient
          colors={['#141515', '#2E3236']}
          start={vec(0, 0)}
          end={vec(size, size)}
        />
        <BoxShadow dx={4} dy={6} blur={20} color="rgba(0,0,0,0.35)" />
      </Box>
      <Box box={container}>
        <LinearGradient
          colors={['#141515', '#2E3236']}
          start={vec(0, 0)}
          end={vec(size, size)}
        />
      </Box>
      <Group
        transform={[
          {translateX: transIconX},
          {translateY: transIconY},
          {scale: 1.2},
        ]}>
        <LinearGradient
          colors={['#2FB8FF', '#9EECD9']}
          start={vec(0, 0)}
          end={vec(15, 15)}
        />
        <Path
          path={pathIcon}
          style="stroke"
          strokeWidth={1}
          strokeCap="round"
          strokeJoin={'round'}
        />
      </Group>
    </FitBox>
  );
};

export default Icon_Process;
