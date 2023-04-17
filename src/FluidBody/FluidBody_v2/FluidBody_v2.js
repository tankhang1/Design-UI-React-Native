import {View, Text, Dimensions, ScrollView, Image} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {Circle, Path, Svg} from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const slides = [
  {
    color: '#3984FF',
    picture: require('../assets/1.png'),
    aspectRatio: 439.75 / 470.5,
  },
  {
    color: '#39ffb4',
    picture: require('../assets/2.png'),
    aspectRatio: 400.5 / 429.5,
  },
  {
    color: '#ffb439',
    picture: require('../assets/4.png'),
    aspectRatio: 391.25 / 520,
  },
];
const vec = (x, y) => ({x: x, y: y});
//Toa do P0
const P01 = vec(0, 0);
const P02 = vec(1, 0);
const P03 = vec(1, 0);

//Toa do P1
const P11 = vec(1, 0);
const P12 = vec(2, 0);
const P13 = vec(2, 1);

//Toa do P2
const P21 = vec(2, 2);
const P22 = vec(1, 2);
const P23 = vec(1, 2);

//Toa do P3
const P31 = vec(1, 2);
const P32 = vec(0, 2);
const P33 = vec(0, 1);

const FluidBody_v2 = () => {
  const x = useSharedValue(0);
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e, ctx) => {
      x.value = e.contentOffset.x;
    },
  });
  return (
    <Animated.ScrollView
      horizontal
      snapToAlignment="center"
      snapToInterval={width}
      onScroll={scrollHandler}>
      {slides.map((slide, index) => {
        const pathProps = useAnimatedProps(() => {
          const process = (x.value - width * index) / width;
          const offset = interpolate(process, [0, 1], [0, 0.5]);
          const d = `M 0 1 C ${P01.x + offset} ${P01.y + offset} ${P02.x} ${
            P02.y
          } ${P03.x + offset} ${P03.y + offset} C ${P11.x - offset} ${
            P11.y + offset
          } ${P12.x} ${P12.y - offset} ${P13.x + offset} ${P13.y + offset} C ${
            P21.x
          } ${P21.y} ${P22.x} ${P22.y} ${P23.x} ${P23.y} C ${P31.x} ${P31.y} ${
            P32.x
          } ${P32.y - offset} ${P33.x} ${P33.y}`;
          const scale = 0.5;
          return {
            d,
            transform: [{translateX: -process}],
          };
        });
        return (
          <View
            key={index}
            style={{
              flex: 1,
              width,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Svg width={width} height={width} viewBox="0 0 2 2">
              <AnimatedPath animatedProps={pathProps} fill={slide.color} />
            </Svg>
            <Image
              resizeMode="contain"
              source={slide.picture}
              style={{
                height: slide.aspectRatio * width,
                width: slide.aspectRatio * width,
                position: 'absolute',
              }}
            />
          </View>
        );
      })}
    </Animated.ScrollView>
  );
};

export default FluidBody_v2;
