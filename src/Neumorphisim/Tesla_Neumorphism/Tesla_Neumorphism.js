import {View, Text, Dimensions, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {
  BackdropBlur,
  Blur,
  Box,
  BoxShadow,
  Canvas,
  Circle,
  Fill,
  FitBox,
  Group,
  LinearGradient,
  mix,
  Path,
  RadialGradient,
  rect,
  RoundedRect,
  rrect,
  runTiming,
  Skia,
  Text as TextSkia,
  useComputedValue,
  useFont,
  useLoop,
  useSharedValueEffect,
  useValue,
  vec,
} from '@shopify/react-native-skia';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  cos,
  Easing,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('screen');
const leftPath =
  'M0.0297852 8.00684C0.0297852 8.34717 0.154297 8.62939 0.428223 8.89502L6.81982 15.1455C7.02734 15.3613 7.29297 15.4692 7.6001 15.4692C8.22266 15.4692 8.7207 14.9712 8.7207 14.3486C8.7207 14.0332 8.59619 13.7593 8.37207 13.5352L2.69434 7.99854L8.37207 2.47852C8.59619 2.25439 8.7207 1.97217 8.7207 1.66504C8.7207 1.04248 8.22266 0.552734 7.6001 0.552734C7.28467 0.552734 7.02734 0.652344 6.81982 0.868164L0.428223 7.11865C0.154297 7.38428 0.0380859 7.6665 0.0297852 8.00684Z';
const settingPath =
  'M9.15332 19.1128H10.8467C11.5688 19.1128 12.1416 18.6646 12.3076 17.9756L12.6313 16.5728L12.814 16.5063L14.0342 17.2534C14.6484 17.6353 15.3706 17.5356 15.877 17.021L17.0474 15.8589C17.562 15.3359 17.6533 14.6221 17.2715 14.0161L16.5161 12.8042L16.5825 12.6299L17.9771 12.2979C18.666 12.1318 19.1143 11.5591 19.1143 10.8369V9.20996C19.1143 8.49609 18.666 7.91504 17.9771 7.74902L16.5908 7.40869L16.5244 7.22607L17.2798 6.01416C17.6616 5.4165 17.5703 4.70264 17.0474 4.16309L15.8853 3.00098C15.3789 2.49463 14.6567 2.39502 14.0508 2.76855L12.8223 3.51562L12.6313 3.44922L12.3076 2.03809C12.1416 1.34912 11.5688 0.900879 10.8467 0.900879H9.15332C8.43115 0.900879 7.8584 1.34912 7.69238 2.03809L7.36865 3.44922L7.16943 3.51562L5.94922 2.76855C5.34326 2.39502 4.62109 2.49463 4.11475 3.00098L2.94434 4.16309C2.42969 4.70264 2.33838 5.4165 2.72021 6.01416L3.47559 7.22607L3.40918 7.40869L2.02295 7.74902C1.32568 7.92334 0.885742 8.49609 0.885742 9.20996V10.8369C0.885742 11.5591 1.33398 12.1318 2.02295 12.2979L3.41748 12.6299L3.48389 12.8042L2.72852 14.0161C2.34668 14.6221 2.43799 15.3359 2.95264 15.8589L4.12305 17.021C4.62939 17.5356 5.35156 17.6353 5.95752 17.2534L7.18604 16.5063L7.36865 16.5728L7.69238 17.9756C7.8584 18.6646 8.43115 19.1128 9.15332 19.1128ZM9.41895 17.4526C9.27783 17.4526 9.21143 17.3862 9.18652 17.27L8.70508 15.2363C8.15723 15.1118 7.63428 14.896 7.19434 14.6055L5.40967 15.7095C5.31006 15.7759 5.21045 15.7676 5.11084 15.6763L4.29736 14.8628C4.20605 14.7715 4.20605 14.6719 4.27246 14.5723L5.37646 12.7876C5.11914 12.356 4.88672 11.8413 4.77051 11.3018L2.72852 10.8203C2.6123 10.7954 2.5459 10.729 2.5459 10.5879V9.45068C2.5459 9.30957 2.604 9.25146 2.72852 9.21826L4.76221 8.73682C4.88672 8.18066 5.13574 7.64111 5.35986 7.24268L4.26416 5.46631C4.19775 5.3501 4.18945 5.25879 4.28906 5.15918L5.10254 4.3623C5.20215 4.2627 5.29346 4.25439 5.40967 4.3208L7.18604 5.4082C7.57617 5.15918 8.14893 4.91846 8.70508 4.77734L9.18652 2.74365C9.21143 2.62744 9.27783 2.56104 9.41895 2.56104H10.5811C10.7222 2.56104 10.7886 2.62744 10.8135 2.74365L11.3032 4.79395C11.8594 4.91846 12.374 5.15088 12.8057 5.4082L14.582 4.3291C14.6982 4.2627 14.7896 4.271 14.8892 4.3623L15.7026 5.16748C15.8022 5.25879 15.7939 5.3584 15.7275 5.46631L14.6401 7.24268C14.8643 7.64111 15.1133 8.18066 15.2295 8.73682L17.2715 9.21826C17.396 9.25146 17.4541 9.30957 17.4541 9.45068V10.5879C17.4541 10.729 17.3877 10.7954 17.2715 10.8203L15.2295 11.3018C15.105 11.8413 14.8809 12.3643 14.6235 12.7876L15.7192 14.564C15.7856 14.6719 15.7856 14.7632 15.6943 14.8545L14.8809 15.668C14.7812 15.7676 14.6816 15.7676 14.582 15.7012L12.8057 14.6055C12.3574 14.896 11.876 15.1035 11.3032 15.2363L10.8135 17.27C10.7886 17.3945 10.7222 17.4526 10.5811 17.4526H9.41895ZM10 13.1528C11.7266 13.1528 13.1377 11.7417 13.1377 10.0068C13.1377 8.28857 11.7266 6.87744 10 6.87744C8.27344 6.87744 6.854 8.28857 6.854 10.0068C6.854 11.7334 8.27344 13.1528 10 13.1528ZM10 11.6255C9.12012 11.6255 8.38965 10.895 8.38965 10.0068C8.38965 9.13525 9.12012 8.41309 10 8.41309C10.8633 8.41309 11.5938 9.13525 11.5938 10.0068C11.5938 10.8867 10.8633 11.6255 10 11.6255Z';
const pathCircleMake = Skia.Path.Make();
pathCircleMake.addCircle(105, 105, 90);
const Tesla_Neumorphism = () => {
  const font = useFont(require('./Font/Roboto-Regular.ttf'), 30);
  const processLoop = useLoop({duration: 20000, easing: Easing.ease});
  const valueProcess = useComputedValue(
    () => `${Math.floor(mix(processLoop.current, 0, 100))}ºC`,
    [processLoop],
  );
  const acSlider = useSharedValue(0);
  const panHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.value = acSlider.value;
    },
    onActive: (e, ctx) => {
      acSlider.value = ctx.value + e.translationX;
    },
    onEnd: (e, ctx) => {
      if (acSlider.value < 0) acSlider.value = 0;
      if (acSlider.value > width * 0.7) acSlider.value = width * 0.7;
    },
  });
  const sliderAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: acSlider.value,
    };
  });

  const swipeUp = useSharedValue(0);
  const swipeHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.value = swipeUp.value;
    },
    onActive: (e, ctx) => {
      swipeUp.value = ctx.value + e.translationY;
    },
    onEnd: (e, ctx) => {
      console.log(swipeUp.value);
      if (swipeUp.value < -400) swipeUp.value = withTiming(-400);
      else if (swipeUp.value > -80) swipeUp.value = withTiming(-60);
    },
  });
  const swipeUpAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: swipeUp.value}],
    };
  });
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <Canvas
          style={{
            flex: 1,
          }}>
          <Fill>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, height / 2)}
              colors={['#2A2D32', '#131313']}
            />
          </Fill>
        </Canvas>

        {/* <ScrollView>
          <GestureDetector> */}
        <ScrollView
          style={{
            position: 'absolute',
            flex: 1,
            height: height,
            paddingTop: 20,
            width: width,
            paddingHorizontal: 10,
          }}>
          {/*Header Canvas */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}>
            <Canvas
              style={{
                width: 62,
                height: 62,
              }}>
              <Circle c={vec(31, 31)} r={31}>
                <RadialGradient
                  c={vec(31, 31)}
                  colors={['#5D6167', '#13151A']}
                  r={35}
                />
                <BoxShadow dx={10} dy={10} blur={20} color="rgba(0,0,0,0.25)" />
                <Blur blur={10} />
              </Circle>
              <Circle c={vec(31, 31)} r={25}>
                <RadialGradient
                  c={vec(31, 31)}
                  r={25}
                  colors={['#545659', '#1F2021']}
                />
              </Circle>
              <Circle c={vec(31, 31)} r={22} style="stroke">
                <LinearGradient
                  start={vec(10, 10)}
                  end={vec(70, 70)}
                  colors={['rgba(0,0,0,0.45)', 'hsl(0,0%,60%)']}
                />
              </Circle>
              <Path
                path={leftPath}
                color="rgba(235,235,245,0.6)"
                transform={[{translateX: 24.5}, {translateY: 22}]}
              />
            </Canvas>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: '600',
              }}>
              Climate
            </Text>
            <Canvas
              style={{
                width: 62,
                height: 62,
              }}>
              <Circle c={vec(31, 31)} r={31}>
                <RadialGradient
                  c={vec(31, 31)}
                  colors={['#5D6167', '#13151A']}
                  r={35}
                />
                <BoxShadow dx={10} dy={10} blur={20} color="rgba(0,0,0,0.25)" />
                <Blur blur={10} />
              </Circle>
              <Circle c={vec(31, 31)} r={25}>
                <RadialGradient
                  c={vec(31, 31)}
                  r={25}
                  colors={['#545659', '#1F2021']}
                />
              </Circle>
              <Circle c={vec(31, 31)} r={22} style="stroke">
                <LinearGradient
                  start={vec(10, 10)}
                  end={vec(70, 70)}
                  colors={['rgba(0,0,0,0.45)', 'hsl(0,0%,60%)']}
                />
              </Circle>
              <Path
                path={settingPath}
                color="rgba(235,235,245,0.6)"
                transform={[{translateX: 22}, {translateY: 22}]}
              />
            </Canvas>
          </View>
          {/*Process_Bar */}
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <Canvas
              style={{
                width: 210,
                height: 210,
              }}>
              <Circle c={vec(105, 105)} r={84.1}>
                <LinearGradient
                  start={vec(45.5, 84.1)}
                  end={vec(165, 165)}
                  colors={['#101113', '#2B2F33']}
                />
                <BoxShadow dx={18.67} dy={18.67} blur={65.34} color="#141415" />
                <BoxShadow
                  dx={-18.67}
                  dy={-18.67}
                  blur={65.34}
                  color="#485057"
                />
              </Circle>
              <Circle c={vec(105, 105)} r={59.625} color="32363B">
                <BoxShadow
                  dx={2}
                  dy={1}
                  blur={2}
                  color="rgba(255,255,255,0.05)"
                  inner
                />
                <BoxShadow
                  dx={-26.43}
                  dy={-26.43}
                  blur={66.06}
                  color="rgba(59,68,81,0.5)"
                  inner
                />
                <BoxShadow
                  dx={26.43}
                  dy={26.43}
                  blur={81}
                  color="rgba(0,0,0,0.55)"
                  inner
                />
              </Circle>
              <Path
                path={pathCircleMake}
                style="stroke"
                strokeWidth={20}
                strokeJoin="round"
                strokeCap={'round'}
                start={0}
                end={processLoop}
                transform={[{rotate: 30}]}
                origin={vec(105, 105)}>
                <LinearGradient
                  start={vec(3.8147e-6, 0)}
                  end={vec(3.8147e-6, 192)}
                  colors={[
                    '#4CC6F5',
                    '#52C9F3',
                    '#56CBF2',
                    '#66D2EC',
                    '#78DAE6',
                  ]}
                  positions={[
                    0.192708, 0.291667, 0.40625, 0.557292, 0.791667, 1,
                  ]}
                />
              </Path>
              {font && (
                <TextSkia
                  font={font}
                  text={valueProcess}
                  x={105 - 25}
                  y={105 + 12}
                  color="white"
                />
              )}
            </Canvas>
          </View>
          {/*List Slide Bar */}
          {/* <ScrollView
            style={{
              height: height / 2,
              marginTop: 10,
            }}
            showsVerticalScrollIndicator={false}> */}
          {/*Ac Slide Bar*/}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
              }}>
              Ac
            </Text>
            <Canvas
              style={{
                width: 60,
                height: 60,
              }}>
              <Circle c={vec(30, 30)} r={25} style="stroke" color={'#282B2E'} />
              <Circle c={vec(30, 30)} r={23}>
                <LinearGradient
                  start={vec(30.25, 50.75)}
                  end={vec(0, 40.625)}
                  colors={['#141515', '#24272A', '#2E3236']}
                  positions={[0, 0.626483, 1]}
                />
                <BoxShadow dx={4} dy={6} blur={20} color={'rgba(0,0,0,0.35)'} />
              </Circle>
              <Path
                path={
                  'M8.5 17.6064C8.94824 17.6064 9.22217 17.291 9.22217 16.8345V15.1992L10.3594 15.9048C10.708 16.1538 11.0981 16.1289 11.3389 15.7803C11.5298 15.4731 11.4634 15.083 11.0898 14.8589L9.22217 13.7632V12.7588L9.03955 9.95312L11.3887 11.5137L12.252 12.0117L12.2769 14.1699C12.2852 14.6099 12.584 14.8755 12.9492 14.8506C13.3726 14.834 13.5801 14.4937 13.5386 14.0786L13.4971 12.7256L14.9248 13.5557C15.3149 13.7881 15.7217 13.6885 15.9375 13.3066C16.145 12.9248 16.0288 12.5098 15.647 12.2939L14.2275 11.4722L15.4146 10.833C15.7881 10.6587 15.979 10.3101 15.7881 9.93652C15.6138 9.60449 15.2402 9.47998 14.8584 9.6875L12.9741 10.75L12.1108 10.252L9.5708 9.00684L12.1108 7.76172L12.9741 7.25537L14.8584 8.32617C15.2402 8.53369 15.6221 8.40088 15.7881 8.07715C15.979 7.70361 15.7964 7.35498 15.4062 7.17236L14.2275 6.5415L15.647 5.71973C16.0454 5.49561 16.1533 5.09717 15.9375 4.70703C15.73 4.3335 15.3149 4.22559 14.9248 4.45801L13.4971 5.27148L13.5386 3.93506C13.5801 3.51172 13.3726 3.17969 12.9492 3.16309C12.584 3.13818 12.2852 3.40381 12.2769 3.83545L12.252 6.00195L11.3887 6.5L9.03955 8.06055L9.22217 5.25488V4.25049L11.0898 3.15479C11.4634 2.92236 11.5298 2.54053 11.3389 2.2251C11.1064 1.87646 10.708 1.85986 10.3594 2.10889L9.22217 2.81445V1.1709C9.22217 0.714355 8.94824 0.407227 8.5 0.407227C8.06836 0.407227 7.77783 0.722656 7.77783 1.1709V2.81445L6.62402 2.10889C6.27539 1.85986 5.89355 1.87646 5.65283 2.2251C5.45361 2.54053 5.53662 2.92236 5.91016 3.15479L7.77783 4.25049V5.25488L7.96045 8.06885L5.61133 6.5L4.73975 5.99365L4.72314 3.83545C4.71484 3.40381 4.41602 3.13818 4.05078 3.16309C3.62744 3.17969 3.41992 3.51172 3.46143 3.93506L3.50293 5.27148L2.0752 4.45801C1.69336 4.23389 1.27002 4.3335 1.0542 4.70703C0.830078 5.09717 0.962891 5.50391 1.34473 5.71973L2.77246 6.5415L1.58545 7.17236C1.20361 7.35498 1.021 7.69531 1.20361 8.07715C1.36963 8.40918 1.75146 8.53369 2.1416 8.32617L4.01758 7.26367L4.88916 7.76172L7.4292 9.00684L4.88916 10.252L4.01758 10.75L2.1333 9.6875C1.75977 9.47168 1.37793 9.60449 1.22021 9.92822C1.021 10.3184 1.20361 10.6587 1.58545 10.833L2.77246 11.4722L1.35303 12.2939C0.962891 12.5098 0.838379 12.9331 1.0542 13.3066C1.27832 13.6885 1.69336 13.7798 2.0752 13.5557L3.50293 12.7339L3.46143 14.0703C3.41162 14.4937 3.62744 14.834 4.05078 14.8506C4.41602 14.8672 4.71484 14.6016 4.72314 14.1699L4.74805 12.0034L5.61133 11.5137L7.96045 9.95312L7.77783 12.7588V13.7549L5.91016 14.8589C5.53662 15.083 5.46191 15.4731 5.65283 15.7803C5.89355 16.1289 6.27539 16.1538 6.62402 15.9048L7.77783 15.1909V16.8345C7.77783 17.291 8.06836 17.6064 8.5 17.6064Z'
                }
                transform={[
                  {translateX: 30 - 19 / 2},
                  {translateY: 30 - 22 / 2},
                ]}>
                <LinearGradient
                  start={vec(8.5, -2)}
                  end={vec(8.2, 20)}
                  colors={['#2FB8FF', '#9EECD9']}
                />
              </Path>
            </Canvas>
            <View>
              <Canvas
                style={{
                  width: width * 0.6,
                  height: 20,
                }}>
                <Box
                  box={rrect(rect(0, 0, width * 0.6, 15), 25, 25)}
                  color="#1B1B1D">
                  <BoxShadow
                    dx={-1.25}
                    dy={-1.25}
                    blur={6}
                    color="rgba(255,255,255,0.08)"
                    inner
                  />
                  <BoxShadow
                    dx={1.25}
                    dy={1.25}
                    blur={6}
                    color="rgba(0,0,0,0.8)"
                    inner
                  />
                </Box>
              </Canvas>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Animated.View style={sliderAnimatedStyle}>
                  <Canvas
                    style={{
                      height: 20,
                    }}>
                    <Box box={rrect(rect(0, 0, width * 0.7, 15), 25, 25)}>
                      <LinearGradient
                        start={vec(35.7344, 4.5)}
                        end={vec(35.7344, 12)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Box>
                  </Canvas>
                </Animated.View>

                <PanGestureHandler onGestureEvent={panHandler}>
                  <Animated.View>
                    <Canvas
                      style={{
                        width: 30,
                        height: 25,
                        left: -14,
                      }}>
                      <Box
                        box={rrect(rect(0, 0, 27, 20), 6, 6)}
                        color="#212325"
                        strokeWidth={1}>
                        <LinearGradient
                          start={vec(0.9375, 0.7)}
                          end={vec(27.1968, 27.2858)}
                          colors={['#2E3236', '#141515']}
                        />
                        <BoxShadow
                          dx={4}
                          dy={6}
                          blur={20}
                          color="rgba(0,0,0,0.35)"
                        />
                        <BoxShadow
                          dx={1}
                          dy={2}
                          blur={20}
                          color="rgba(104,211,236,0.15)"
                        />
                        <BoxShadow
                          dx={-1}
                          dy={-1}
                          blur={8}
                          color="rgba(0,0,0,0.69)"
                          inner
                        />
                      </Box>
                      <Box
                        box={rrect(rect(9, 4, 3.75, 13), 1, 1)}
                        color="#272A2E">
                        <BoxShadow
                          dx={-1}
                          dy={-1}
                          blur={2}
                          color="rgba(255,255,255,0.07)"
                          inner
                        />
                        <BoxShadow
                          dx={1}
                          dy={1}
                          blur={2}
                          color="rgba(0,0,0,0.39)"
                          inner
                        />
                      </Box>
                      <Box
                        box={rrect(rect(15, 4, 3.75, 13), 1, 1)}
                        color="#272A2E">
                        <BoxShadow
                          dx={-1}
                          dy={-1}
                          blur={2}
                          color="rgba(255,255,255,0.07)"
                          inner
                        />
                        <BoxShadow
                          dx={1}
                          dy={1}
                          blur={2}
                          color="rgba(0,0,0,0.39)"
                          inner
                        />
                      </Box>
                    </Canvas>
                  </Animated.View>
                </PanGestureHandler>
              </View>
            </View>
          </View>
          {/*Fan */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'rgba(235,235,245,0.6)',
                fontSize: 18,
              }}>
              Fan
            </Text>
            <Canvas
              style={{
                width: 60,
                height: 60,
              }}>
              <Circle c={vec(30, 30)} r={25} style="stroke" color={'#282B2E'} />
              <Circle c={vec(30, 30)} r={23}>
                <LinearGradient
                  start={vec(30.25, 50.75)}
                  end={vec(0, 40.625)}
                  colors={['#141515', '#24272A', '#2E3236']}
                  positions={[0, 0.626483, 1]}
                />
                <BoxShadow dx={4} dy={6} blur={20} color={'rgba(0,0,0,0.35)'} />
              </Circle>
              <Path
                path={
                  'M1.5127 5.32178C2.70801 4.95654 3.94482 4.77393 5.12354 4.77393C6.64258 4.77393 7.76318 5.00635 9.19922 5.00635C10.7432 5.00635 11.7559 3.95215 11.7559 2.55762C11.7559 1.13818 10.6768 0.108887 9.31543 0.108887C8.35254 0.108887 7.48096 0.698242 7.09912 1.52002C6.9248 1.85205 6.99951 2.23389 7.33154 2.4248C7.66357 2.60742 8.07031 2.49121 8.27783 2.10107C8.45215 1.72754 8.85889 1.43701 9.31543 1.43701C9.94629 1.43701 10.4277 1.86865 10.4277 2.55762C10.4277 3.23828 9.94629 3.68652 9.19922 3.68652C7.85449 3.68652 6.70068 3.4458 5.12354 3.4458C3.77881 3.4458 2.39258 3.67822 1.11426 4.06006C0.70752 4.17627 0.524902 4.5332 0.624512 4.89844C0.732422 5.25537 1.07275 5.45459 1.5127 5.32178ZM14.5532 9.37256C16.5537 9.37256 17.9731 8.08594 17.9731 6.30957C17.9731 4.5498 16.6284 3.25488 14.9268 3.25488C13.4658 3.25488 12.3037 4.25098 12.0215 5.5874C11.9219 5.98584 12.1128 6.33447 12.4697 6.42578C12.835 6.52539 13.2002 6.31787 13.3164 5.86963C13.4741 5.10596 14.1465 4.58301 14.9268 4.58301C15.8896 4.58301 16.645 5.28857 16.645 6.30957C16.645 7.33887 15.8232 8.04443 14.5532 8.04443C12.0381 8.04443 9.26562 6.6084 5.92871 6.6084C4.21045 6.6084 2.625 6.87402 1.11426 7.38867C0.70752 7.52979 0.524902 7.87842 0.624512 8.23535C0.732422 8.60059 1.08936 8.80811 1.521 8.65869C2.89893 8.15234 4.31836 7.93652 5.92871 7.93652C9.21582 7.93652 11.7061 9.37256 14.5532 9.37256ZM9.21582 15.3657C10.5605 15.3657 11.6064 14.353 11.6064 12.9419C11.6064 10.8999 9.52295 9.771 5.75439 9.771C4.21875 9.771 2.54199 10.0615 1.11426 10.543C0.70752 10.6758 0.524902 11.0327 0.624512 11.3896C0.732422 11.7549 1.08936 11.9541 1.521 11.813C2.83252 11.3481 4.28516 11.0991 5.75439 11.0991C8.67627 11.0991 10.2783 11.813 10.2783 12.9419C10.2783 13.6226 9.81348 14.0376 9.21582 14.0376C8.65137 14.0376 8.29443 13.6641 8.15332 13.0664C8.04541 12.7012 7.72998 12.4688 7.33154 12.5518C6.9248 12.6348 6.75879 13.0332 6.875 13.4233C7.11572 14.5273 7.99561 15.3657 9.21582 15.3657Z'
                }
                transform={[
                  {translateX: 30 - 19 / 2},
                  {translateY: 30 - 22 / 2},
                ]}
                color="rgba(235,235,245,0.6)">
                {/* <LinearGradient
                  start={vec(8.5, -2)}
                  end={vec(8.2, 20)}
                  colors={['#2FB8FF', '#9EECD9']}
                /> */}
              </Path>
            </Canvas>
            <View>
              <Canvas
                style={{
                  width: width * 0.6,
                  height: 20,
                }}>
                <Box
                  box={rrect(rect(0, 0, width * 0.6, 15), 25, 25)}
                  color="#1B1B1D">
                  <BoxShadow
                    dx={-1.25}
                    dy={-1.25}
                    blur={6}
                    color="rgba(255,255,255,0.08)"
                    inner
                  />
                  <BoxShadow
                    dx={1.25}
                    dy={1.25}
                    blur={6}
                    color="rgba(0,0,0,0.8)"
                    inner
                  />
                </Box>
              </Canvas>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Canvas
                  style={{
                    width: width * 0 * 0.7,
                    height: 20,
                  }}>
                  <Box box={rrect(rect(0, 0, width * 0.7 * 0, 15), 25, 25)}>
                    <LinearGradient
                      start={vec(35.7344, 4.5)}
                      end={vec(35.7344, 12)}
                      colors={['#2FB8FF', '#9EECD9']}
                    />
                  </Box>
                </Canvas>
                <Canvas
                  style={{
                    width: 30,
                    height: 25,
                    left: -14,
                  }}>
                  <Box
                    box={rrect(rect(0, 0, 27, 20), 6, 6)}
                    color="#212325"
                    strokeWidth={1}>
                    <LinearGradient
                      start={vec(0.9375, 0.7)}
                      end={vec(27.1968, 27.2858)}
                      colors={['#2E3236', '#141515']}
                    />
                    <BoxShadow
                      dx={4}
                      dy={6}
                      blur={20}
                      color="rgba(0,0,0,0.35)"
                    />
                    <BoxShadow
                      dx={1}
                      dy={2}
                      blur={20}
                      color="rgba(104,211,236,0.15)"
                    />
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={8}
                      color="rgba(0,0,0,0.69)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(9, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(15, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                </Canvas>
              </View>
            </View>
          </View>
          {/*Hot */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'rgba(235,235,245,0.6)',
                fontSize: 18,
              }}>
              Hot
            </Text>
            <Canvas
              style={{
                width: 60,
                height: 60,
              }}>
              <Circle c={vec(30, 30)} r={25} style="stroke" color={'#282B2E'} />
              <Circle c={vec(30, 30)} r={23}>
                <LinearGradient
                  start={vec(30.25, 50.75)}
                  end={vec(0, 40.625)}
                  colors={['#141515', '#24272A', '#2E3236']}
                  positions={[0, 0.626483, 1]}
                />
                <BoxShadow dx={4} dy={6} blur={20} color={'rgba(0,0,0,0.35)'} />
              </Circle>
              <Path
                path={
                  'M3.94678 4.96484C7.74023 4.96484 9.71582 1.82715 13.1274 1.82715C13.9326 1.82715 14.6216 2.00977 15.4351 2.47461C15.8501 2.70703 16.2734 2.57422 16.5059 2.24219C16.7798 1.85205 16.7051 1.2959 16.1655 0.980469C15.2192 0.432617 14.2148 0.166992 13.1274 0.166992C9.29248 0.166992 7.3252 3.29639 3.94678 3.29639C3.1499 3.29639 2.46094 3.12207 1.64746 2.64893C1.22412 2.4165 0.79248 2.55762 0.568359 2.89795C0.302734 3.28809 0.377441 3.84424 0.908691 4.14307C1.85498 4.69092 2.85938 4.96484 3.94678 4.96484ZM14.854 14.959C16.9209 14.959 18.5645 13.3403 18.5645 11.3232C18.5645 10.2109 18.0166 9.11523 17.5518 8.24365L15.6758 4.75732C15.4932 4.41699 15.2109 4.25098 14.854 4.25098C14.4888 4.25098 14.2065 4.41699 14.0239 4.75732L12.1562 8.24365C11.6914 9.11523 11.1436 10.2109 11.1436 11.3232C11.1436 13.3403 12.7954 14.959 14.854 14.959ZM3.95508 9.41406C7.11768 9.41406 9.07666 7.13135 11.708 6.51709C12.04 5.88623 12.3804 5.26367 12.7207 4.63281C9.07666 4.87354 7.23389 7.74561 3.95508 7.74561C3.1582 7.74561 2.46924 7.57129 1.65576 7.09814C1.23242 6.86572 0.800781 7.00684 0.57666 7.34717C0.319336 7.7373 0.394043 8.29346 0.916992 8.59229C1.87158 9.14014 2.86768 9.41406 3.95508 9.41406ZM3.94678 13.8633C6.40381 13.8633 8.12207 12.502 9.98145 11.5972C9.90674 11.0659 9.99805 10.3354 10.1973 9.71289C8.03076 10.6177 6.354 12.2031 3.94678 12.2031C3.1499 12.2031 2.46094 12.0205 1.64746 11.5474C1.22412 11.3149 0.79248 11.4561 0.568359 11.7964C0.302734 12.1865 0.377441 12.7427 0.908691 13.0498C1.85498 13.5977 2.85938 13.8633 3.94678 13.8633Z'
                }
                transform={[
                  {translateX: 30 - 19 / 2},
                  {translateY: 30 - 22 / 2},
                ]}
                color="rgba(235,235,245,0.6)">
                {/* <LinearGradient
                  start={vec(8.5, -2)}
                  end={vec(8.2, 20)}
                  colors={['#2FB8FF', '#9EECD9']}
                /> */}
              </Path>
            </Canvas>
            <View>
              <Canvas
                style={{
                  width: width * 0.6,
                  height: 20,
                }}>
                <Box
                  box={rrect(rect(0, 0, width * 0.6, 15), 25, 25)}
                  color="#1B1B1D">
                  <BoxShadow
                    dx={-1.25}
                    dy={-1.25}
                    blur={6}
                    color="rgba(255,255,255,0.08)"
                    inner
                  />
                  <BoxShadow
                    dx={1.25}
                    dy={1.25}
                    blur={6}
                    color="rgba(0,0,0,0.8)"
                    inner
                  />
                </Box>
              </Canvas>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Canvas
                  style={{
                    width: width * 0 * 0.7,
                    height: 20,
                  }}>
                  <Box box={rrect(rect(0, 0, width * 0.7 * 0, 15), 25, 25)}>
                    <LinearGradient
                      start={vec(35.7344, 4.5)}
                      end={vec(35.7344, 12)}
                      colors={['#2FB8FF', '#9EECD9']}
                    />
                  </Box>
                </Canvas>
                <Canvas
                  style={{
                    width: 30,
                    height: 25,
                    left: -14,
                  }}>
                  <Box
                    box={rrect(rect(0, 0, 27, 20), 6, 6)}
                    color="#212325"
                    strokeWidth={1}>
                    <LinearGradient
                      start={vec(0.9375, 0.7)}
                      end={vec(27.1968, 27.2858)}
                      colors={['#2E3236', '#141515']}
                    />
                    <BoxShadow
                      dx={4}
                      dy={6}
                      blur={20}
                      color="rgba(0,0,0,0.35)"
                    />
                    <BoxShadow
                      dx={1}
                      dy={2}
                      blur={20}
                      color="rgba(104,211,236,0.15)"
                    />
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={8}
                      color="rgba(0,0,0,0.69)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(9, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(15, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                </Canvas>
              </View>
            </View>
          </View>
          {/*Auto */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'rgba(235,235,245,0.6)',
                fontSize: 18,
              }}>
              Auto
            </Text>
            <Canvas
              style={{
                width: 60,
                height: 60,
              }}>
              <Circle c={vec(30, 30)} r={25} style="stroke" color={'#282B2E'} />
              <Circle c={vec(30, 30)} r={23}>
                <LinearGradient
                  start={vec(30.25, 50.75)}
                  end={vec(0, 40.625)}
                  colors={['#141515', '#24272A', '#2E3236']}
                  positions={[0, 0.626483, 1]}
                />
                <BoxShadow dx={4} dy={6} blur={20} color={'rgba(0,0,0,0.35)'} />
              </Circle>
              <Path
                path={
                  'M9.5 17.6646C14.2729 17.6646 18.1577 13.7798 18.1577 9.00684C18.1577 4.23389 14.2812 0.349121 9.5083 0.349121C8.94385 0.349121 8.61182 0.681152 8.61182 1.2207V4.17578C8.61182 4.64062 8.93555 4.99756 9.40039 4.99756C9.86523 4.99756 10.189 4.64062 10.189 4.17578V2.25C13.6172 2.59863 16.2485 5.4873 16.2485 9.00684C16.2485 12.7422 13.252 15.7637 9.5 15.7637C5.74805 15.7637 2.73486 12.7422 2.74316 9.00684C2.75146 7.42969 3.29932 5.96045 4.2124 4.81494C4.56934 4.31689 4.63574 3.82715 4.229 3.42041C3.82227 3.03027 3.1748 3.07178 2.75977 3.62793C1.57275 5.10547 0.842285 6.98145 0.842285 9.00684C0.842285 13.7798 4.72705 17.6646 9.5 17.6646ZM10.8364 10.3267C11.542 9.59619 11.4009 8.5752 10.5625 8.01904L6.45361 5.22168C5.90576 4.85645 5.38281 5.37939 5.74805 5.92725L8.53711 10.0361C9.10156 10.8745 10.1143 11.0322 10.8364 10.3267Z'
                }
                transform={[
                  {translateX: 30 - 19 / 2},
                  {translateY: 30 - 22 / 2},
                ]}
                color="rgba(235,235,245,0.6)">
                {/* <LinearGradient
                  start={vec(8.5, -2)}
                  end={vec(8.2, 20)}
                  colors={['#2FB8FF', '#9EECD9']}
                /> */}
              </Path>
            </Canvas>
            <View>
              <Canvas
                style={{
                  width: width * 0.6,
                  height: 20,
                }}>
                <Box
                  box={rrect(rect(0, 0, width * 0.6, 15), 25, 25)}
                  color="#1B1B1D">
                  <BoxShadow
                    dx={-1.25}
                    dy={-1.25}
                    blur={6}
                    color="rgba(255,255,255,0.08)"
                    inner
                  />
                  <BoxShadow
                    dx={1.25}
                    dy={1.25}
                    blur={6}
                    color="rgba(0,0,0,0.8)"
                    inner
                  />
                </Box>
              </Canvas>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Canvas
                  style={{
                    width: width * 0 * 0.7,
                    height: 20,
                  }}>
                  <Box box={rrect(rect(0, 0, width * 0.7 * 0, 15), 25, 25)}>
                    <LinearGradient
                      start={vec(35.7344, 4.5)}
                      end={vec(35.7344, 12)}
                      colors={['#2FB8FF', '#9EECD9']}
                    />
                  </Box>
                </Canvas>
                <Canvas
                  style={{
                    width: 30,
                    height: 25,
                    left: -14,
                  }}>
                  <Box
                    box={rrect(rect(0, 0, 27, 20), 6, 6)}
                    color="#212325"
                    strokeWidth={1}>
                    <LinearGradient
                      start={vec(0.9375, 0.7)}
                      end={vec(27.1968, 27.2858)}
                      colors={['#2E3236', '#141515']}
                    />
                    <BoxShadow
                      dx={4}
                      dy={6}
                      blur={20}
                      color="rgba(0,0,0,0.35)"
                    />
                    <BoxShadow
                      dx={1}
                      dy={2}
                      blur={20}
                      color="rgba(104,211,236,0.15)"
                    />
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={8}
                      color="rgba(0,0,0,0.69)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(9, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(15, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                </Canvas>
              </View>
            </View>
          </View>

          {/*Auto */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'rgba(235,235,245,0.6)',
                fontSize: 18,
              }}>
              Auto
            </Text>
            <Canvas
              style={{
                width: 60,
                height: 60,
              }}>
              <Circle c={vec(30, 30)} r={25} style="stroke" color={'#282B2E'} />
              <Circle c={vec(30, 30)} r={23}>
                <LinearGradient
                  start={vec(30.25, 50.75)}
                  end={vec(0, 40.625)}
                  colors={['#141515', '#24272A', '#2E3236']}
                  positions={[0, 0.626483, 1]}
                />
                <BoxShadow dx={4} dy={6} blur={20} color={'rgba(0,0,0,0.35)'} />
              </Circle>
              <Path
                path={
                  'M9.5 17.6646C14.2729 17.6646 18.1577 13.7798 18.1577 9.00684C18.1577 4.23389 14.2812 0.349121 9.5083 0.349121C8.94385 0.349121 8.61182 0.681152 8.61182 1.2207V4.17578C8.61182 4.64062 8.93555 4.99756 9.40039 4.99756C9.86523 4.99756 10.189 4.64062 10.189 4.17578V2.25C13.6172 2.59863 16.2485 5.4873 16.2485 9.00684C16.2485 12.7422 13.252 15.7637 9.5 15.7637C5.74805 15.7637 2.73486 12.7422 2.74316 9.00684C2.75146 7.42969 3.29932 5.96045 4.2124 4.81494C4.56934 4.31689 4.63574 3.82715 4.229 3.42041C3.82227 3.03027 3.1748 3.07178 2.75977 3.62793C1.57275 5.10547 0.842285 6.98145 0.842285 9.00684C0.842285 13.7798 4.72705 17.6646 9.5 17.6646ZM10.8364 10.3267C11.542 9.59619 11.4009 8.5752 10.5625 8.01904L6.45361 5.22168C5.90576 4.85645 5.38281 5.37939 5.74805 5.92725L8.53711 10.0361C9.10156 10.8745 10.1143 11.0322 10.8364 10.3267Z'
                }
                transform={[
                  {translateX: 30 - 19 / 2},
                  {translateY: 30 - 22 / 2},
                ]}
                color="rgba(235,235,245,0.6)">
                {/* <LinearGradient
                  start={vec(8.5, -2)}
                  end={vec(8.2, 20)}
                  colors={['#2FB8FF', '#9EECD9']}
                /> */}
              </Path>
            </Canvas>
            <View>
              <Canvas
                style={{
                  width: width * 0.6,
                  height: 20,
                }}>
                <Box
                  box={rrect(rect(0, 0, width * 0.6, 15), 25, 25)}
                  color="#1B1B1D">
                  <BoxShadow
                    dx={-1.25}
                    dy={-1.25}
                    blur={6}
                    color="rgba(255,255,255,0.08)"
                    inner
                  />
                  <BoxShadow
                    dx={1.25}
                    dy={1.25}
                    blur={6}
                    color="rgba(0,0,0,0.8)"
                    inner
                  />
                </Box>
              </Canvas>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Canvas
                  style={{
                    width: width * 0 * 0.7,
                    height: 20,
                  }}>
                  <Box box={rrect(rect(0, 0, width * 0.7 * 0, 15), 25, 25)}>
                    <LinearGradient
                      start={vec(35.7344, 4.5)}
                      end={vec(35.7344, 12)}
                      colors={['#2FB8FF', '#9EECD9']}
                    />
                  </Box>
                </Canvas>
                <Canvas
                  style={{
                    width: 30,
                    height: 25,
                    left: -14,
                  }}>
                  <Box
                    box={rrect(rect(0, 0, 27, 20), 6, 6)}
                    color="#212325"
                    strokeWidth={1}>
                    <LinearGradient
                      start={vec(0.9375, 0.7)}
                      end={vec(27.1968, 27.2858)}
                      colors={['#2E3236', '#141515']}
                    />
                    <BoxShadow
                      dx={4}
                      dy={6}
                      blur={20}
                      color="rgba(0,0,0,0.35)"
                    />
                    <BoxShadow
                      dx={1}
                      dy={2}
                      blur={20}
                      color="rgba(104,211,236,0.15)"
                    />
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={8}
                      color="rgba(0,0,0,0.69)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(9, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(15, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                </Canvas>
              </View>
            </View>
          </View>
          {/*Auto */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'rgba(235,235,245,0.6)',
                fontSize: 18,
              }}>
              Auto
            </Text>
            <Canvas
              style={{
                width: 60,
                height: 60,
              }}>
              <Circle c={vec(30, 30)} r={25} style="stroke" color={'#282B2E'} />
              <Circle c={vec(30, 30)} r={23}>
                <LinearGradient
                  start={vec(30.25, 50.75)}
                  end={vec(0, 40.625)}
                  colors={['#141515', '#24272A', '#2E3236']}
                  positions={[0, 0.626483, 1]}
                />
                <BoxShadow dx={4} dy={6} blur={20} color={'rgba(0,0,0,0.35)'} />
              </Circle>
              <Path
                path={
                  'M9.5 17.6646C14.2729 17.6646 18.1577 13.7798 18.1577 9.00684C18.1577 4.23389 14.2812 0.349121 9.5083 0.349121C8.94385 0.349121 8.61182 0.681152 8.61182 1.2207V4.17578C8.61182 4.64062 8.93555 4.99756 9.40039 4.99756C9.86523 4.99756 10.189 4.64062 10.189 4.17578V2.25C13.6172 2.59863 16.2485 5.4873 16.2485 9.00684C16.2485 12.7422 13.252 15.7637 9.5 15.7637C5.74805 15.7637 2.73486 12.7422 2.74316 9.00684C2.75146 7.42969 3.29932 5.96045 4.2124 4.81494C4.56934 4.31689 4.63574 3.82715 4.229 3.42041C3.82227 3.03027 3.1748 3.07178 2.75977 3.62793C1.57275 5.10547 0.842285 6.98145 0.842285 9.00684C0.842285 13.7798 4.72705 17.6646 9.5 17.6646ZM10.8364 10.3267C11.542 9.59619 11.4009 8.5752 10.5625 8.01904L6.45361 5.22168C5.90576 4.85645 5.38281 5.37939 5.74805 5.92725L8.53711 10.0361C9.10156 10.8745 10.1143 11.0322 10.8364 10.3267Z'
                }
                transform={[
                  {translateX: 30 - 19 / 2},
                  {translateY: 30 - 22 / 2},
                ]}
                color="rgba(235,235,245,0.6)">
                {/* <LinearGradient
                  start={vec(8.5, -2)}
                  end={vec(8.2, 20)}
                  colors={['#2FB8FF', '#9EECD9']}
                /> */}
              </Path>
            </Canvas>
            <View>
              <Canvas
                style={{
                  width: width * 0.6,
                  height: 20,
                }}>
                <Box
                  box={rrect(rect(0, 0, width * 0.6, 15), 25, 25)}
                  color="#1B1B1D">
                  <BoxShadow
                    dx={-1.25}
                    dy={-1.25}
                    blur={6}
                    color="rgba(255,255,255,0.08)"
                    inner
                  />
                  <BoxShadow
                    dx={1.25}
                    dy={1.25}
                    blur={6}
                    color="rgba(0,0,0,0.8)"
                    inner
                  />
                </Box>
              </Canvas>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Canvas
                  style={{
                    width: width * 0 * 0.7,
                    height: 20,
                  }}>
                  <Box box={rrect(rect(0, 0, width * 0.7 * 0, 15), 25, 25)}>
                    <LinearGradient
                      start={vec(35.7344, 4.5)}
                      end={vec(35.7344, 12)}
                      colors={['#2FB8FF', '#9EECD9']}
                    />
                  </Box>
                </Canvas>
                <Canvas
                  style={{
                    width: 30,
                    height: 25,
                    left: -14,
                  }}>
                  <Box
                    box={rrect(rect(0, 0, 27, 20), 6, 6)}
                    color="#212325"
                    strokeWidth={1}>
                    <LinearGradient
                      start={vec(0.9375, 0.7)}
                      end={vec(27.1968, 27.2858)}
                      colors={['#2E3236', '#141515']}
                    />
                    <BoxShadow
                      dx={4}
                      dy={6}
                      blur={20}
                      color="rgba(0,0,0,0.35)"
                    />
                    <BoxShadow
                      dx={1}
                      dy={2}
                      blur={20}
                      color="rgba(104,211,236,0.15)"
                    />
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={8}
                      color="rgba(0,0,0,0.69)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(9, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(15, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                </Canvas>
              </View>
            </View>
          </View>
          {/*Auto */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              marginTop: 20,
            }}>
            <Text
              style={{
                color: 'rgba(235,235,245,0.6)',
                fontSize: 18,
              }}>
              Auto
            </Text>
            <Canvas
              style={{
                width: 60,
                height: 60,
              }}>
              <Circle c={vec(30, 30)} r={25} style="stroke" color={'#282B2E'} />
              <Circle c={vec(30, 30)} r={23}>
                <LinearGradient
                  start={vec(30.25, 50.75)}
                  end={vec(0, 40.625)}
                  colors={['#141515', '#24272A', '#2E3236']}
                  positions={[0, 0.626483, 1]}
                />
                <BoxShadow dx={4} dy={6} blur={20} color={'rgba(0,0,0,0.35)'} />
              </Circle>
              <Path
                path={
                  'M9.5 17.6646C14.2729 17.6646 18.1577 13.7798 18.1577 9.00684C18.1577 4.23389 14.2812 0.349121 9.5083 0.349121C8.94385 0.349121 8.61182 0.681152 8.61182 1.2207V4.17578C8.61182 4.64062 8.93555 4.99756 9.40039 4.99756C9.86523 4.99756 10.189 4.64062 10.189 4.17578V2.25C13.6172 2.59863 16.2485 5.4873 16.2485 9.00684C16.2485 12.7422 13.252 15.7637 9.5 15.7637C5.74805 15.7637 2.73486 12.7422 2.74316 9.00684C2.75146 7.42969 3.29932 5.96045 4.2124 4.81494C4.56934 4.31689 4.63574 3.82715 4.229 3.42041C3.82227 3.03027 3.1748 3.07178 2.75977 3.62793C1.57275 5.10547 0.842285 6.98145 0.842285 9.00684C0.842285 13.7798 4.72705 17.6646 9.5 17.6646ZM10.8364 10.3267C11.542 9.59619 11.4009 8.5752 10.5625 8.01904L6.45361 5.22168C5.90576 4.85645 5.38281 5.37939 5.74805 5.92725L8.53711 10.0361C9.10156 10.8745 10.1143 11.0322 10.8364 10.3267Z'
                }
                transform={[
                  {translateX: 30 - 19 / 2},
                  {translateY: 30 - 22 / 2},
                ]}
                color="rgba(235,235,245,0.6)">
                {/* <LinearGradient
                  start={vec(8.5, -2)}
                  end={vec(8.2, 20)}
                  colors={['#2FB8FF', '#9EECD9']}
                /> */}
              </Path>
            </Canvas>
            <View>
              <Canvas
                style={{
                  width: width * 0.6,
                  height: 20,
                }}>
                <Box
                  box={rrect(rect(0, 0, width * 0.6, 15), 25, 25)}
                  color="#1B1B1D">
                  <BoxShadow
                    dx={-1.25}
                    dy={-1.25}
                    blur={6}
                    color="rgba(255,255,255,0.08)"
                    inner
                  />
                  <BoxShadow
                    dx={1.25}
                    dy={1.25}
                    blur={6}
                    color="rgba(0,0,0,0.8)"
                    inner
                  />
                </Box>
              </Canvas>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Canvas
                  style={{
                    width: width * 0 * 0.7,
                    height: 20,
                  }}>
                  <Box box={rrect(rect(0, 0, width * 0.7 * 0, 15), 25, 25)}>
                    <LinearGradient
                      start={vec(35.7344, 4.5)}
                      end={vec(35.7344, 12)}
                      colors={['#2FB8FF', '#9EECD9']}
                    />
                  </Box>
                </Canvas>
                <Canvas
                  style={{
                    width: 30,
                    height: 25,
                    left: -14,
                  }}>
                  <Box
                    box={rrect(rect(0, 0, 27, 20), 6, 6)}
                    color="#212325"
                    strokeWidth={1}>
                    <LinearGradient
                      start={vec(0.9375, 0.7)}
                      end={vec(27.1968, 27.2858)}
                      colors={['#2E3236', '#141515']}
                    />
                    <BoxShadow
                      dx={4}
                      dy={6}
                      blur={20}
                      color="rgba(0,0,0,0.35)"
                    />
                    <BoxShadow
                      dx={1}
                      dy={2}
                      blur={20}
                      color="rgba(104,211,236,0.15)"
                    />
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={8}
                      color="rgba(0,0,0,0.69)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(9, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                  <Box box={rrect(rect(15, 4, 3.75, 13), 1, 1)} color="#272A2E">
                    <BoxShadow
                      dx={-1}
                      dy={-1}
                      blur={2}
                      color="rgba(255,255,255,0.07)"
                      inner
                    />
                    <BoxShadow
                      dx={1}
                      dy={1}
                      blur={2}
                      color="rgba(0,0,0,0.39)"
                      inner
                    />
                  </Box>
                </Canvas>
              </View>
            </View>
          </View>
          {/* </ScrollView> */}
        </ScrollView>
        {/* </GestureDetector>
        </ScrollView> */}
        {/*Bottom Tab */}
        <PanGestureHandler onGestureEvent={swipeHandler}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: -height + 80,
                width: width,
                zIndex: 99,
                height,
              },
              swipeUpAnimatedStyle,
            ]}>
            <Canvas
              style={{
                width: width,
                height: height,
              }}>
              <Box
                box={rrect(rect(0, 0, width, height), 50, 50)}
                style="stroke"
                strokeWidth={1}>
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(width, 180)}
                  colors={['black', 'hsl(0,0%,73%)']}
                />
              </Box>
              <Box
                box={rrect(rect(1, 1, width - 2, height - 2), 50, 50)}
                color={(color = 'rgba(36,38,46,0.44)')}></Box>
              <BackdropBlur
                blur={4}
                clip={rrect(rect(1, 1, width - 2, height - 2), 50, 50)}>
                <Fill color="rgba(0, 0, 0, 0.5)" />
              </BackdropBlur>
            </Canvas>
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: width,
                paddingHorizontal: 20,
                paddingTop: 25,
              }}>
              <Canvas
                style={{
                  width: 30,
                  height: 30,
                }}>
                <Path
                  path={
                    'M10.5 10.8516C10.9688 10.8516 11.291 10.5098 11.291 10.0215V1.25195C11.291 0.753906 10.9688 0.421875 10.5 0.421875C10.0312 0.421875 9.71875 0.753906 9.71875 1.25195V10.0215C9.71875 10.5098 10.0312 10.8516 10.5 10.8516ZM10.5 20.9102C15.9492 20.9102 20.4609 16.3887 20.4609 10.9492C20.4609 7.95117 19.0938 5.35352 17.2188 3.64453C16.3594 2.86328 15.2559 4.02539 16.1055 4.83594C17.7656 6.34961 18.791 8.51758 18.8008 10.9492C18.8105 15.5586 15.1094 19.25 10.5 19.25C5.89062 19.25 2.20898 15.5586 2.20898 10.9492C2.21875 8.49805 3.24414 6.33984 4.89453 4.82617C5.75391 4.00586 4.64062 2.85352 3.78125 3.63477C1.89648 5.34375 0.539062 7.95117 0.539062 10.9492C0.539062 16.3887 5.06055 20.9102 10.5 20.9102Z'
                  }
                  style={'fill'}>
                  <LinearGradient
                    start={vec(10.5, -1)}
                    end={vec(10.5, 23)}
                    colors={['#2FB8FF', '#9EECD9']}
                  />
                </Path>
              </Canvas>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: width * 0.3,
                }}>
                <Entypo name="chevron-left" size={24} color="white" />
                <Text
                  style={{
                    fontSize: 24,
                    color: 'white',
                  }}>
                  20°C
                </Text>
                <Entypo name="chevron-right" size={24} color="white" />
              </View>

              <Canvas
                style={{
                  width: 30,
                  height: 30,
                }}>
                <Path
                  path={
                    'M10.3802 0C9.89037 0 9.41757 0.179757 9.05147 0.505181L0.671272 7.95425C0.244295 8.33378 0 8.87779 0 9.44907V10.75V12.5V20C0 21.1046 0.895431 22 2 22H19C20.1046 22 21 21.1046 21 20V12.5V7.25V2C21 0.895431 20.1046 0 19 0H10.3802ZM10.3802 2H19V6.25H10.355C9.8957 6.25 9.45036 6.40811 9.09385 6.69777L5.62332 9.51758L2 9.69875V9.44907L10.3802 2ZM2 13.5H19V20H2V13.5Z'
                  }
                  style={'fill'}
                  color="rgba(235,235,245,0.6)"
                />
              </Canvas>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default Tesla_Neumorphism;
