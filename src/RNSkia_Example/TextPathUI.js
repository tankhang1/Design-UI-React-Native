import React from 'react';
import {
  Canvas,
  Group,
  Skia,
  TextPath,
  useFont,
  vec,
} from '@shopify/react-native-skia';
import {View} from 'react-native';
const size = 128;
const path = Skia.Path.Make();
path.addCircle(size, size, size / 2);

const TextPathUI = () => {
  const fontSize = 24;

  const fontFamily = useFont(require('./Fonts/Roboto-Bold.ttf'), fontSize);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}>
      <Canvas
        style={{
          width: 300,
          height: 300,
          borderWidth: 1,
        }}>
        {fontFamily && (
          <TextPath
            font={fontFamily}
            path={path}
            text="HELLO WORD"
            color={'black'}
            transform={[{rotate: Math.PI}]}
            origin={vec(150, 150)}
          />
        )}
      </Canvas>
    </View>
  );
};

export default TextPathUI;
