import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {
  Canvas,
  Fill,
  Group,
  mix,
  Path,
  runTiming,
  useComputedValue,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import Button from './Button_Logo';

const {width} = Dimensions.get('window');
const PADDING = 32;
const size = width - PADDING * 2;
const x = PADDING;
const y = 75;
const Logo_Neumorphism = () => {
  const pressed = useValue(0);
  const onTouch = useTouchHandler({
    onStart: () => {
      runTiming(pressed, 1, {duration: 150});
    },
    onEnd: () => {
      runTiming(pressed, 0, {duration: 150});
    },
  });
  const transform = useComputedValue(
    () => [{scale: mix(pressed.current, 0.6, 0.65)}],
    [pressed],
  );
  return (
    <Canvas
      style={{
        flex: 1,
      }}
      onTouch={onTouch}>
      <Fill color={'#F0F0F3'} />
      <Button x={x} y={y} size={size} pressed={pressed}>
        <Group transform={transform} origin={{x: 7.5, y: 6}} color="white">
          <Path
            path="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z"
            style={'stroke'}
            color="#FB7575"
            strokeCap={'round'}
            strokeJoin="round"
            strokeWidth={1}
          />
        </Group>
      </Button>
    </Canvas>
  );
};

export default Logo_Neumorphism;
