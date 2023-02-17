import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {
  Box,
  BoxShadow,
  Canvas,
  Fill,
  Group,
  rect,
  rrect,
  runTiming,
  size,
  useValue,
  useTouchHandler,
} from '@shopify/react-native-skia';
import Button_Switch from './Button_Switch';
import {Circle} from 'react-native-svg';

const Switch_Neumorphism = () => {
  const pressed = useValue(0);
  const onTouch = useTouchHandler({
    onEnd: () => {
      runTiming(pressed, pressed.current === 1 ? 0 : 1, {duration: 500});
    },
  });
  return (
    <Canvas
      style={{
        flex: 1,
      }}
      onTouch={onTouch}>
      <Fill color={'#F0F0F3'} />
      <Button_Switch x={32} y={50} width={200} height={100} pressed={pressed} />
    </Canvas>
  );
};

export default Switch_Neumorphism;
