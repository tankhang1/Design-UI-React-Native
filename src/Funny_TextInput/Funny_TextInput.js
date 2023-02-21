import {View, Text, TextInput, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {
  Defs,
  G,
  Path,
  Svg,
  Marker,
  Circle,
  LinearGradient,
  Stop,
} from 'react-native-svg';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
const Funny_TextInput = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const translateYMarker = useSharedValue(50);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const AnimatedSvg = Animated.createAnimatedComponent(Svg);
  const {width: WIDTH, height} = Dimensions.get('screen');
  const openValue = useSharedValue(0);
  const pathAnimatedStyle = useAnimatedProps(() => {
    return {
      d: `M ${WIDTH - 100} 0 v ${translateYMarker.value}`,
    };
  });
  const opacityAnimatedStyle = useAnimatedProps(() => {
    return {
      opacity: openValue.value,
    };
  });
  const [open, setOpen] = useState(false);
  const panHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.current = translateYMarker.value;
    },
    onActive: (e, ctx) => {
      translateYMarker.value = ctx.current + e.translationY;
    },
    onEnd: (e, ctx) => {
      translateYMarker.value = withSpring(50);
      if (open) {
        openValue.value = withTiming(0);
      } else {
        openValue.value = withTiming(1);
      }
      //openValue.value = withTiming(0);
    },
  });
  const ChangeSecure = () => {
    if (openValue.value > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };
  useDerivedValue(() => {
    runOnJS(ChangeSecure)(openValue.value);
  });
  return (
    <GestureHandlerRootView>
      <PanGestureHandler onGestureEvent={panHandler}>
        <AnimatedSvg>
          <Defs>
            <Marker
              id="Marker"
              markerWidth={3}
              markerHeight={3}
              markerUnits="strokeWidth"
              orient={'auto'}>
              <Circle cx={0} cy={0} r={0.5} fill="white" />
            </Marker>
            <LinearGradient
              id="Linear"
              x1={WIDTH / 2}
              y1={0}
              x2={WIDTH / 2}
              y2={WIDTH}
              gradientUnits="userSpaceOnUse">
              <Stop offset={0} stopColor="white" />
              <Stop offset={0.99} stopColor="hsl(0,0%,10%)" stopOpacity={0.1} />
            </LinearGradient>
          </Defs>

          <AnimatedPath
            d={`M ${WIDTH / 2 - 50} 0 h 100 l 100 ${WIDTH} h -300 z`}
            fill={'url(#Linear)'}
            animatedProps={opacityAnimatedStyle}
          />
          <AnimatedPath
            //d={`M ${WIDTH - 100} 0 v 200`}
            animatedProps={pathAnimatedStyle}
            stroke={'white'}
            markerEnd="url(#Marker)"
            strokeWidth={3}
          />
        </AnimatedSvg>
      </PanGestureHandler>

      <View
        style={{
          position: 'absolute',
          top: 350,
          width: '100%',
        }}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Incoder"
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 100,
            width: '80%',
            alignSelf: 'center',
            paddingHorizontal: 20,
            color: 'white',
            marginVertical: 10,
          }}
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="password"
          secureTextEntry={!open}
          style={{
            borderWidth: 1,
            borderColor: 'white',
            borderRadius: 100,
            width: '80%',
            alignSelf: 'center',
            paddingHorizontal: 20,
            color: 'white',
            marginVertical: 10,
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default Funny_TextInput;
