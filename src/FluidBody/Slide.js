import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';
import {
  addCurve,
  cartesian2Canvas,
  createPath,
  serialize,
} from 'react-native-redash';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedProps,
} from 'react-native-reanimated';

/*
    P0=(0,1), P1=(C,1) P2=(1,C) P3=(1,0)
    P0=(1,0), P1=(1,-C) P2=(C,-1) P3=(0,-1)
    P0=(0,-1), P1=(-C,-1) P2=(-1,-C) P3=(-1,0)
    P0=(-1,0) P1=(-1,C) P2=(-C,1) P3=(0,1)

*/
const AnimatedPath = Animated.createAnimatedComponent(Path);

const vec = (x, y) => cartesian2Canvas({x, y}, {x: 1, y: 1});
const C = 0.551915024494;

const P00 = vec(0, 1);
const P01 = vec(C, 1);
const P02 = vec(1, C);
const P03 = vec(1, 0);

//const P10 = vec(1, 0);
const P11 = vec(1, -C);
const P12 = vec(C, -1);
const P13 = vec(0, -1);

// const P20 = vec(0, -1);
const P21 = vec(-C, -1);
const P22 = vec(-1, -C);
const P23 = vec(-1, 0);

// const P30 = vec(-1, 0);
const P31 = vec(-1, C);
const P32 = vec(-C, 1);
const P33 = vec(0, 1);

const {width} = Dimensions.get('window');
const SIZE = width;
const Slide = ({slide, index, x, colors}) => {
  const animatedProps = useAnimatedProps(() => {
    const progress = (x.value - index * width) / width;
    const offset = interpolate(progress, [0, 0.3], [0, -2]);
    const addX = v => ({x: v.x + offset, y: v.y});
    const path = createPath({x: P00.x + offset, y: P00.y});
    addCurve(path, {
      c1: addX(P01),
      c2: P02,
      to: P03,
    });
    addCurve(path, {
      c1: P11,
      c2: addX(P12),
      to: addX(P13),
    });
    addCurve(path, {
      c1: addX(P21),
      c2: {
        x: interpolate(progress, [-0.3, 0], [1, 0]),
        y: P22.y,
      },
      to: {
        x: interpolate(progress, [-0.3, 0], [1, 0]),
        y: P23.y,
      },
    });
    addCurve(path, {
      c1: {
        x: interpolate(progress, [-0.3, 0], [1, 0]),
        y: P31.y,
      },
      c2: addX(P32),
      to: addX(P33),
    });
    const d = serialize(path);
    return {
      d,
    };
  });

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 2 2">
        <AnimatedPath animatedProps={animatedProps} fill={slide.color} />
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
            height: SIZE,
          }}>
          <Image
            source={slide.picture}
            style={{
              width: width * 0.5,
              height: width * 0.5 * slide.aspectRatio,
            }}
          />
        </View>
      </Svg>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Slide;
