import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {Circle, G, Path, Svg} from 'react-native-svg';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {useEffect} from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
const SIZE = Dimensions.get('window').width - 60;
const WaveAnimation_v1 = () => {
  const progress = useSharedValue(0);
  const progress_2 = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {duration: 1500, easing: Easing.linear}),
      -1,
      true,
    );
    progress_2.value = withRepeat(
      withTiming(1, {duration: 1500, easing: Easing.linear}),
      -1,
      true,
    );
  }, []);
  const data = useDerivedValue(() => {
    return {
      from: {
        x: interpolate(progress.value, [0, 1], [0, -2]),
        y: interpolate(progress.value, [0, 1], [0.4, 0.2]),
      },
      c1: {
        // x: interpolate(progress.value, [0, 1], [0.25, ]),
        x: 0.25,
        y: interpolate(progress.value, [0, 1], [0, 1]),
      },
      c2: {
        // x: interpolate(progress.value, [0, 1], [0.25, ]),
        x: 0.75,
        y: interpolate(progress.value, [0, 1], [1, 0]),
      },
      to: {
        x: interpolate(progress.value, [0, 1], [1, 3]),
        y: interpolate(progress.value, [0, 1], [0.5, 0.3]),
      },
    };
  });
  const data_2 = useDerivedValue(() => {
    return {
      from: {
        x: interpolate(progress_2.value, [0, 1], [0, -1]),
        y: 0.5,
      },
      c1: {
        // x: interpolate(progress.value, [0, 1], [0.25, ]),
        x: 0.3,
        y: interpolate(progress_2.value, [0, 1], [1, 0]),
      },
      c2: {
        // x: interpolate(progress.value, [0, 1], [0.25, ]),
        x: 0.8,
        y: interpolate(progress_2.value, [0, 1], [0, 1]),
      },
      to: {
        x: interpolate(progress_2.value, [0, 1], [1, 1.5]),
        y: 0.5,
      },
    };
  });
  const path = useAnimatedProps(() => {
    const {from, c1, c2, to} = data.value;

    return {
      d: `M ${from.x} ${from.y} Q ${c1.x} ${c1.y} 0.5 0.5 Q ${c2.x} ${c2.y} ${
        to.x
      } ${to.y} v 1 h ${-to.x + from.x} z`,
    };
  });
  const path_2 = useAnimatedProps(() => {
    const {from, c1, c2, to} = data_2.value;

    return {
      d: `M ${from.x} ${from.y} Q ${c1.x} ${c1.y} 0.5 0.5 Q ${c2.x} ${c2.y} ${
        to.x
      } ${to.y} v 1 h ${-to.x + from.x} z`,
    };
  });
  const PathAnimated = Animated.createAnimatedComponent(Path);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <MaskedView
        style={{
          width: SIZE,
          height: SIZE,
          backgroundColor: 'black',
        }}
        maskElement={
          <View
            style={{
              width: SIZE,
              height: SIZE,
              borderRadius: SIZE / 2,
              backgroundColor: 'black',
            }}
          />
        }>
        <Svg width={SIZE} height={SIZE} viewBox="0 0 1 1">
          <PathAnimated
            animatedProps={path_2}
            fill={'hsl(198,86%,90%)'}
            translateY={-0.05}
          />

          <PathAnimated animatedProps={path} fill={'hsl(198,86%,71%)'} />
        </Svg>
      </MaskedView>
    </View>
  );
};

export default WaveAnimation_v1;
<svg
  width="1155"
  height="534"
  viewBox="0 0 1155 534"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M0.5 5.49998C154.167 -23.1667 432.4 76.9 556 260.5C710.5 490 1014.5 537.5 1154 533"
    stroke="black"
  />
</svg>;
