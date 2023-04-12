import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  event,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Slide from './Slide';
const slides = [
  {
    color: '#3984FF',
    picture: require('./assets/1.png'),
    aspectRatio: 439.75 / 470.5,
  },
  {
    color: '#39ffb4',
    picture: require('./assets/2.png'),
    aspectRatio: 400.5 / 429.5,
  },
  {
    color: '#ffb439',
    picture: require('./assets/4.png'),
    aspectRatio: 391.25 / 520,
  },
];
const {width} = Dimensions.get('window');
const Fluid_Body_Animation = () => {
  const x = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e, ctx) => {
      x.value = e.contentOffset.x;
    },
  });
  return (
    <Animated.ScrollView
      horizontal
      snapToInterval={width}
      decelerationRate={0.5}
      onScroll={scrollHandler}>
      {slides.map((slide, index) => {
        return <Slide slide={slide} key={index} index={index} x={x} />;
      })}
    </Animated.ScrollView>
  );
};

export default Fluid_Body_Animation;
