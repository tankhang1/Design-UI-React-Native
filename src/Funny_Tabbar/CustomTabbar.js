import {View, Text, Dimensions, Pressable} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Path, Svg} from 'react-native-svg';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('window');
const nameIcon = [
  {
    name: 'user-alt',
    route: 'User',
  },
  {name: 'cog', route: 'Setting'},
  {name: 'home', route: 'Home'},
];
const sizeBorderIcon = 40;
const padding = 50;
const translate =
  (width - nameIcon.length * sizeBorderIcon - padding * 2) / 2 + sizeBorderIcon;
const CustomTabbar = ({state, navigation}) => {
  const translateSvg = useSharedValue(0);
  const translateIcon = nameIcon.map((_, index) =>
    useSharedValue(index === 0 ? 1 : 0),
  );
  const animatedStyleIcon = nameIcon.map((_, i) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {translateY: interpolate(translateIcon[i].value, [0, 1], [0, -20])},
        ],
      };
    }),
  );
  const animatedSvgProps = useAnimatedProps(() => {
    return {
      translateX: interpolate(
        translateSvg.value,
        [0, 1, 2],
        [0, translate, translate * 2],
      ),
    };
  });
  const PressableAnimated = Animated.createAnimatedComponent(Pressable);
  const PathAnimated = Animated.createAnimatedComponent(Path);
  const SvgAnimated = Animated.createAnimatedComponent(Svg);
  const [preTouch, setPreTouch] = useState(0);
  const [currentTouch, setCurrentTouch] = useState(0);
  const onPress = (route, index) => {
    setCurrentTouch(index);
    translateIcon[preTouch].value = withTiming(0);
    translateSvg.value = withSpring(index);
    translateIcon[index].value = withTiming(1);
    setPreTouch(index);
    navigation.navigate(route);
  };
  return (
    <View
      style={{
        backgroundColor: 'black',
        width: width,
        height: 80,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
      }}>
      <SvgAnimated animatedProps={animatedSvgProps}>
        <Path
          d="M 10 10 h 20 c 10 0 10 35 30 40 h 20 c 20 -5 20 -40 30 -40 h 20 m -120 0 h 120"
          fill={'white'}
          y={-10}
        />
      </SvgAnimated>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 99,
          paddingHorizontal: padding,
          position: 'absolute',
          width: width,
          height: 60,
        }}>
        {nameIcon.map((item, index) => {
          return (
            <PressableAnimated
              key={index}
              onPress={() => onPress(item.route, index)}
              style={[
                {
                  width: sizeBorderIcon,
                  height: sizeBorderIcon,
                  borderRadius: 100,
                  backgroundColor: 'black',
                  justifyContent: 'center',
                  alignItems: 'center',
                },
                animatedStyleIcon[index],
              ]}>
              <FontAwesome5
                name={item.name}
                size={25}
                color={currentTouch === index ? 'hsl(44,61%,75%)' : 'white'}
              />
            </PressableAnimated>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTabbar;
