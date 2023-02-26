import {
  View,
  Text,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  Canvas,
  Group,
  RoundedRect,
  useValue,
  runTiming,
  useComputedValue,
  mix,
  rrect,
  rect,
} from '@shopify/react-native-skia';

//Khá giống vs G trong rn svg
const {width, height} = Dimensions.get('screen');
const GroupUI = () => {
  const rotateValue = useValue(0);
  const transform = useComputedValue(
    () => [{rotate: mix(rotateValue.current, 0, 10)}],
    [rotateValue],
  );
  const clipRect = rrect(rect(86, 86, 30, 30), 10, 10);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        onPress={() => runTiming(rotateValue, 1, {duration: 10000})}
        style={{
          width: 200,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'green',
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          Action
        </Text>
      </TouchableOpacity>
      <Canvas style={{width: 300, height: 300, borderWidth: 1}}>
        <Group color={'blue'} clip={clipRect} invertClip={true}>
          <RoundedRect
            x={86}
            y={86}
            width={128}
            height={128}
            r={0}
            origin={{x: 150, y: 150}}
            transform={transform}
          />
        </Group>
      </Canvas>
    </View>
  );
};

export default GroupUI;
