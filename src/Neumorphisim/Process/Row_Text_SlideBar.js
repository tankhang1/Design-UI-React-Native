import {Group, Text, useFont} from '@shopify/react-native-skia';
import {Dimensions} from 'react-native';
import Icon_Process from './Icon_Process';
import Process_Slide from './Process_Slide';
const {width, height} = Dimensions.get('screen');
const Row_Text_SlideBar = ({
  text,
  pathIcon,
  currentTrack,
  transIconX,
  transIconY,
}) => {
  const font = useFont(require('./Font/Roboto-Regular.ttf'), 18);
  if (font === null) {
    return null;
  }
  return (
    <Group>
      <Text text={text} x={30} y={500} font={font} color="white" />
      <Icon_Process
        x={80}
        y={465}
        size={50}
        pathIcon={pathIcon}
        transIconX={transIconX}
        transIconY={transIconY}
      />
      <Process_Slide
        x={170}
        y={485}
        width={192.5}
        height={15}
        currentTrack={currentTrack}
      />
    </Group>
  );
};

export default Row_Text_SlideBar;
