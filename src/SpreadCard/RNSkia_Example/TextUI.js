import {Canvas, Fill, Text, useFont} from '@shopify/react-native-skia';

const TextUI = () => {
  const fontSize = 32;

  const fontFamily = useFont(require('./Fonts/Roboto-Bold.ttf'), fontSize);
  return (
    <Canvas
      style={{
        flex: 1,
      }}>
      <Fill color={'white'} />
      {fontFamily && (
        <Text x={0} y={32} text="HELLO WORD" font={fontFamily} color="black" />
      )}
    </Canvas>
  );
};

export default TextUI;
