import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {Circle, ClipPath, Defs, Mask, Path, Svg} from 'react-native-svg';
import Animated, {
  Easing,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import {mix} from 'react-native-redash';
import MaskedView from '@react-native-masked-view/masked-view';
const SIZE = Dimensions.get('window').width - 64;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const WaveAnimation = () => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration: 1000, easing: Easing.inOut(Easing.ease)}),
      -1,
      true,
    );
  }, [progress]);
  const data = useDerivedValue(() => {
    return {
      from: {x: mix(progress.value, -0.1, -1), y: mix(progress.value, 0.3, 1)},
      c1: {x: mix(progress.value, 0.5, 0), y: mix(progress.value, 0, 0.5)},
      c2: {x: mix(progress.value, 0.5, 1), y: mix(progress.value, 0.6, 0.5)},
      to: {x: mix(progress.value, 1.1, 2), y: mix(progress.value, 1, 0.5)},
    };
  });
  const path = useAnimatedProps(() => {
    const {from, c1, c2, to} = data.value;
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`,
    };
  });
  const from = useAnimatedProps(() => {
    const {x, y} = data.value.from;
    return {
      cx: x,
      cy: y,
    };
  });
  const to = useAnimatedProps(() => {
    const {x, y} = data.value.to;
    return {
      cx: x,
      cy: y,
    };
  });
  const c1 = useAnimatedProps(() => {
    const {x, y} = data.value.c1;
    return {
      cx: x,
      cy: y,
    };
  });
  const c2 = useAnimatedProps(() => {
    const {x, y} = data.value.c2;
    return {
      cx: x,
      cy: y,
    };
  });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <MaskedView
        style={{
          backgroundColor: 'black',
          width: SIZE,
          height: SIZE,
        }}
        maskElement={
          <View
            style={{
              backgroundColor: 'black',
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
            }}></View>
        }>
        <Svg
          width={SIZE}
          height={SIZE}
          viewBox="0 0 1 1"
          style={{backgroundColor: '#242424'}}>
          <AnimatedPath animatedProps={path} fill={'hsl(198,86%,71%)'} />
        </Svg>
      </MaskedView>

      {/* <AnimatedCircle animatedProps={from} fill={'blue'} r={0.05} />
        <AnimatedCircle animatedProps={c1} fill={'red'} r={0.05} />

        <AnimatedCircle animatedProps={c2} fill={'red'} r={0.05} />

        <AnimatedCircle animatedProps={to} fill={'blue'} r={0.05} /> */}
    </View>
  );
};

export default WaveAnimation;
