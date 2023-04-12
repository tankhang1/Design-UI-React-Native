import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {
  Circle,
  Defs,
  LinearGradient,
  Mask,
  Path,
  Rect,
  Stop,
  Svg,
} from 'react-native-svg';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  interpolateColors,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
const heightSlider = 500;
const circleWidth = 50;
const TemperatureSlider = () => {
  const circleTransition = useSharedValue(heightSlider - circleWidth * 1.5);
  const panHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.tmpTrans = circleTransition.value;
    },
    onActive: (e, ctx) => {
      if (
        ctx.tmpTrans + e.translationY <= heightSlider - circleWidth * 1.5 &&
        ctx.tmpTrans + e.translationY >= circleWidth / 2
      ) {
        circleTransition.value = ctx.tmpTrans + e.translationY;
      } else {
        if (ctx.tmpTrans + e.translationY < circleWidth / 2) {
          circleTransition.value = circleWidth / 2;
        } else {
          if (
            ctx.tmpTrans + e.translationY >
            heightSlider - circleWidth * 1.5
          ) {
            circleTransition.value = heightSlider - circleWidth * 1.5;
          }
        }
      }
      console.log(circleTransition.value);
    },
  });
  // const color_1 = useSharedValue('#eb3223');
  // const color_2 = useSharedValue('#59e012');
  // const color = useDerivedValue(() =>
  //   interpolateColor(
  //     circleTransition.value,
  //     [
  //       0,
  //       (heightSlider - circleWidth * 1.5) * 0.25,
  //       (heightSlider - circleWidth * 1.5) * 0.5,
  //       (heightSlider - circleWidth * 1.5) * 0.75,
  //       heightSlider - circleWidth * 1.5,
  //     ],
  //     ['#eb3223', '#fba01e', '#e6d576', '#6abcb1', '#59e012'],
  //     'RGB',
  //     // [color_1.value, color_2.value],
  //   ),
  // );
  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: circleTransition.value}],
    };
  });
  const pathProps = useAnimatedProps(() => {
    return {
      d: `M 0 0 V ${circleTransition.value - circleWidth / 2} Q ${-20} ${
        50 + circleTransition.value - circleWidth / 2
      } 0 ${100 + circleTransition.value - circleWidth / 2} V ${heightSlider}`,
    };
  });
  const rectProps = useAnimatedProps(() => {
    return {
      y: circleTransition.value,
    };
  });
  const colorAnimatedProps = useAnimatedProps(() => {
    const fill = interpolateColor(
      circleTransition.value,
      [
        0,
        (heightSlider - circleWidth * 1.5) * 0.25,
        (heightSlider - circleWidth * 1.5) * 0.5,
        (heightSlider - circleWidth * 1.5) * 0.75,
        heightSlider - circleWidth * 1.5,
      ],
      [
        'rgb(89,224,18)',
        'rgb(157,213,102)',
        'rgb(255,252,53)',
        'rgb(251,160,30)',
        'rgb(251,1,2)',
      ],
      // ['#59e012', '#7cf2b9', '#fffc35', '#fd9300', '#fb0101'],
      'RGB',
      // [color_1.value, color_2.value],
    );
    return {
      fill: fill,
    };
  });
  const PathAnimated = Animated.createAnimatedComponent(Path);
  const RectAnimated = Animated.createAnimatedComponent(Rect);
  const MaskAnimated = Animated.createAnimatedComponent(Mask);
  const SvgAnimated = Animated.createAnimatedComponent(Svg);
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        {/*Header */}
        <Text
          style={{
            color: 'hsl(0,0%,80%)',
            fontSize: 100,
            alignSelf: 'center',
          }}>
          42°
        </Text>
        {/*Body */}
        <View
          style={{
            width: '100%',
            height: heightSlider,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 50,
          }}>
          {/*Left */}
          <View style={{height: '100%', justifyContent: 'space-between'}}>
            {[...new Array(10)].map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: 20,
                    height: 5,
                    backgroundColor: 'gray',
                  }}></View>
              );
            })}
          </View>

          <View
            style={{
              width: 120,
              height: '100%',
            }}>
            <SvgAnimated>
              <Defs>
                <MaskAnimated id="mask" maskUnits="userSpaceOnUse">
                  <RectAnimated
                    x={10}
                    animatedProps={rectProps}
                    width={100}
                    height={heightSlider - 10}
                    rx={50}
                    ry={50}
                    fill={'white'}
                  />
                </MaskAnimated>
                <LinearGradient id="grad" x1="12" y1="0" x2="12" y2={1}>
                  <Stop offset="0.0" stopColor="red" stopOpacity="1" />
                  <Stop offset="0.25" stopColor="orange" stopOpacity="1" />
                  <Stop offset="0.5" stopColor="#e6d576" stopOpacity="1" />
                  <Stop offset="0.75" stopColor="#6abcb1" stopOpacity="1" />
                  <Stop offset="1" stopColor="#59e012" stopOpacity="1" />
                </LinearGradient>
              </Defs>
              {/* <Rect
                ry={50}
                rx={50}
                x={10}
                y={5}
                width={100}
                height={heightSlider - 10}
                stroke={'black'}
                fill="none"></Rect> */}
              {/* <RectAnimated
                ry={50}
                rx={50}
                x={10}
                y={5}
                width={100}
                height={heightSlider - 10}
                mask="url(#mask)"
                animatedProps={colorAnimatedProps}></RectAnimated> */}

              <PathAnimated
                x={10}
                y={5}
                d={`M 0 0 h 100 v ${heightSlider} h -100 z`}
                animatedProps={colorAnimatedProps}></PathAnimated>
            </SvgAnimated>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: 80,
            }}>
            <View
              style={{
                height: heightSlider,
                width: 80,
                bottom: 0,
              }}>
              <Svg>
                <Defs>
                  <LinearGradient id="grad" x1="12" y1="0" x2="12" y2={1}>
                    <Stop offset="0.0" stopColor="red" stopOpacity="1" />
                    <Stop offset="0.25" stopColor="orange" stopOpacity="1" />
                    <Stop offset="0.5" stopColor="#e6d576" stopOpacity="1" />
                    <Stop offset="0.75" stopColor="#6abcb1" stopOpacity="1" />
                    <Stop offset="1" stopColor="#59e012" stopOpacity="1" />
                  </LinearGradient>
                </Defs>
                <PathAnimated
                  x={12}
                  animatedProps={pathProps}
                  stroke={'url(#grad)'}
                  strokeWidth={2}
                  fill={'none'}
                  strokeLinecap={'round'}
                  strokeLinejoin={'round'}
                />
              </Svg>
            </View>
            <PanGestureHandler onGestureEvent={panHandler}>
              <Animated.View
                style={[
                  {
                    width: 50,
                    height: 50,
                    marginLeft: 20,
                    borderRadius: 100,
                    position: 'absolute',
                    backgroundColor: 'black',
                  },
                  circleAnimatedStyle,
                  // colorAnimatedProps,
                ]}
              />
            </PanGestureHandler>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

export default TemperatureSlider;
