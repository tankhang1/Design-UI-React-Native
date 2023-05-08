import {View, Text, Dimensions, ScrollView, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  Canvas,
  Box,
  LinearGradient,
  Fill,
  vec,
  Circle,
  Blur,
  BoxShadow,
  rrect,
  rect,
  Path,
  Image as ImageSkia,
  useImage,
  RoundedRect,
  useFont,
  Text as TextSkia,
  useLoop,
  useComputedValue,
  Easing,
  mix,
  useTiming,
  useValue,
  useValueEffect,
  runTiming,
} from '@shopify/react-native-skia';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  runOnJS,
  interpolate,
  withTiming,
} from 'react-native-reanimated';
const {width: WIDTH_SCREEN, height: HEIGHT_SCREEN} = Dimensions.get('screen');
const backPath =
  'M0.0297852 8.00684C0.0297852 8.34717 0.154297 8.62939 0.428223 8.89502L6.81982 15.1455C7.02734 15.3613 7.29297 15.4692 7.6001 15.4692C8.22266 15.4692 8.7207 14.9712 8.7207 14.3486C8.7207 14.0332 8.59619 13.7593 8.37207 13.5352L2.69434 7.99854L8.37207 2.47852C8.59619 2.25439 8.7207 1.97217 8.7207 1.66504C8.7207 1.04248 8.22266 0.552734 7.6001 0.552734C7.28467 0.552734 7.02734 0.652344 6.81982 0.868164L0.428223 7.11865C0.154297 7.38428 0.0380859 7.6665 0.0297852 8.00684Z';
const settingPath =
  'M9.15332 19.1128H10.8467C11.5688 19.1128 12.1416 18.6646 12.3076 17.9756L12.6313 16.5728L12.814 16.5063L14.0342 17.2534C14.6484 17.6353 15.3706 17.5356 15.877 17.021L17.0474 15.8589C17.562 15.3359 17.6533 14.6221 17.2715 14.0161L16.5161 12.8042L16.5825 12.6299L17.9771 12.2979C18.666 12.1318 19.1143 11.5591 19.1143 10.8369V9.20996C19.1143 8.49609 18.666 7.91504 17.9771 7.74902L16.5908 7.40869L16.5244 7.22607L17.2798 6.01416C17.6616 5.4165 17.5703 4.70264 17.0474 4.16309L15.8853 3.00098C15.3789 2.49463 14.6567 2.39502 14.0508 2.76855L12.8223 3.51562L12.6313 3.44922L12.3076 2.03809C12.1416 1.34912 11.5688 0.900879 10.8467 0.900879H9.15332C8.43115 0.900879 7.8584 1.34912 7.69238 2.03809L7.36865 3.44922L7.16943 3.51562L5.94922 2.76855C5.34326 2.39502 4.62109 2.49463 4.11475 3.00098L2.94434 4.16309C2.42969 4.70264 2.33838 5.4165 2.72021 6.01416L3.47559 7.22607L3.40918 7.40869L2.02295 7.74902C1.32568 7.92334 0.885742 8.49609 0.885742 9.20996V10.8369C0.885742 11.5591 1.33398 12.1318 2.02295 12.2979L3.41748 12.6299L3.48389 12.8042L2.72852 14.0161C2.34668 14.6221 2.43799 15.3359 2.95264 15.8589L4.12305 17.021C4.62939 17.5356 5.35156 17.6353 5.95752 17.2534L7.18604 16.5063L7.36865 16.5728L7.69238 17.9756C7.8584 18.6646 8.43115 19.1128 9.15332 19.1128ZM9.41895 17.4526C9.27783 17.4526 9.21143 17.3862 9.18652 17.27L8.70508 15.2363C8.15723 15.1118 7.63428 14.896 7.19434 14.6055L5.40967 15.7095C5.31006 15.7759 5.21045 15.7676 5.11084 15.6763L4.29736 14.8628C4.20605 14.7715 4.20605 14.6719 4.27246 14.5723L5.37646 12.7876C5.11914 12.356 4.88672 11.8413 4.77051 11.3018L2.72852 10.8203C2.6123 10.7954 2.5459 10.729 2.5459 10.5879V9.45068C2.5459 9.30957 2.604 9.25146 2.72852 9.21826L4.76221 8.73682C4.88672 8.18066 5.13574 7.64111 5.35986 7.24268L4.26416 5.46631C4.19775 5.3501 4.18945 5.25879 4.28906 5.15918L5.10254 4.3623C5.20215 4.2627 5.29346 4.25439 5.40967 4.3208L7.18604 5.4082C7.57617 5.15918 8.14893 4.91846 8.70508 4.77734L9.18652 2.74365C9.21143 2.62744 9.27783 2.56104 9.41895 2.56104H10.5811C10.7222 2.56104 10.7886 2.62744 10.8135 2.74365L11.3032 4.79395C11.8594 4.91846 12.374 5.15088 12.8057 5.4082L14.582 4.3291C14.6982 4.2627 14.7896 4.271 14.8892 4.3623L15.7026 5.16748C15.8022 5.25879 15.7939 5.3584 15.7275 5.46631L14.6401 7.24268C14.8643 7.64111 15.1133 8.18066 15.2295 8.73682L17.2715 9.21826C17.396 9.25146 17.4541 9.30957 17.4541 9.45068V10.5879C17.4541 10.729 17.3877 10.7954 17.2715 10.8203L15.2295 11.3018C15.105 11.8413 14.8809 12.3643 14.6235 12.7876L15.7192 14.564C15.7856 14.6719 15.7856 14.7632 15.6943 14.8545L14.8809 15.668C14.7812 15.7676 14.6816 15.7676 14.582 15.7012L12.8057 14.6055C12.3574 14.896 11.876 15.1035 11.3032 15.2363L10.8135 17.27C10.7886 17.3945 10.7222 17.4526 10.5811 17.4526H9.41895ZM10 13.1528C11.7266 13.1528 13.1377 11.7417 13.1377 10.0068C13.1377 8.28857 11.7266 6.87744 10 6.87744C8.27344 6.87744 6.854 8.28857 6.854 10.0068C6.854 11.7334 8.27344 13.1528 10 13.1528ZM10 11.6255C9.12012 11.6255 8.38965 10.895 8.38965 10.0068C8.38965 9.13525 9.12012 8.41309 10 8.41309C10.8633 8.41309 11.5938 9.13525 11.5938 10.0068C11.5938 10.8867 10.8633 11.6255 10 11.6255Z';
const proceesBarPath =
  'M7.013 24.9031L7.43756 38.0645C7.47237 39.1434 8.35705 40 9.43652 40H278C279.105 40 280 39.1046 280 38V24.8506C280 24.6186 279.96 24.3884 279.881 24.1703L271.977 2.31973C271.691 1.52768 270.939 1 270.097 1H17.3757C16.5471 1 15.8043 1.51093 15.508 2.28471L7.14425 24.1233C7.04904 24.3719 7.00442 24.6371 7.013 24.9031Z';
//console.log(WIDTH_SCREEN * 0.7);
const Charging = () => {
  const [percent, setPercent] = useState(0);
  const [valueProcessText, setValueProcessText] = useState(0);
  const imageSrc = useImage(require('./assets/whitecar.png'));

  const font = useFont(require('./Font/Roboto-Regular.ttf'), 30);
  const fontSlider = useFont(require('./Font/Roboto-Regular.ttf'), 15);
  const triangleSlider = useSharedValue(0);
  const percentAnimatedValue = useSharedValue(0);
  const panHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.value = triangleSlider.value;
    },
    onActive: (e, ctx) => {
      triangleSlider.value = ctx.value + e.translationX;
      if (triangleSlider.value < 0) {
        triangleSlider.value = 0;
      }
      if (triangleSlider.value > WIDTH_SCREEN * 0.75) {
        triangleSlider.value = WIDTH_SCREEN * 0.75;
      }
    },
    // onEnd: (e, ctx) => {
    //   console.log(triangleSlider.value);
    //   if (triangleSlider.value < 0) {
    //     triangleSlider.value = 0;
    //   }
    //   if (triangleSlider.value > WIDTH_SCREEN * 0.7) {
    //     triangleSlider.value = WIDTH_SCREEN * 0.7;
    //   }
    // },
  });
  const sliderAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: triangleSlider.value}],
    };
  });
  const widthBarStyle = useAnimatedStyle(() => {
    return {
      width: percentAnimatedValue.value,
    };
  });
  const receiveValue = value => {
    setPercent(value);
  };
  const receivePercentText = value => {
    setValueProcessText(value);
  };
  useDerivedValue(() => {
    runOnJS(receiveValue)(
      interpolate(triangleSlider.value, [0, WIDTH_SCREEN * 0.75], [0, 100]),
    );
  });

  useEffect(() => {
    percentAnimatedValue.value = 0;
    percentAnimatedValue.value = withTiming(WIDTH_SCREEN - 50, {
      duration: 5000,
    });
  }, [percent]);
  useDerivedValue(() => {
    runOnJS(receivePercentText)(
      interpolate(
        percentAnimatedValue.value,
        [0, WIDTH_SCREEN - 50],
        [0, 65],
      ).toFixed(0),
    );
  });

  // const valueLoop = useTiming({duration: 5000, easing: Easing.ease});
  // const valueProcess = useComputedValue(
  //   () => `${Math.floor(mix(percentAnimatedValue.value, 0, 100))}%`,
  //   [percentAnimatedValue.value],
  // );

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <Canvas
          style={{
            height: HEIGHT_SCREEN,
            width: WIDTH_SCREEN,
            position: 'absolute',
          }}>
          <Fill>
            <LinearGradient
              start={vec(WIDTH_SCREEN / 2, 0)}
              end={vec(WIDTH_SCREEN / 2, HEIGHT_SCREEN)}
              colors={['#2A2D32', '#131313']}
            />
          </Fill>
        </Canvas>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 40,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 5,
            }}>
            <Pressable onPress={() => console.log('Press left')}>
              <Canvas
                style={{
                  width: 100,
                  height: 100,
                  //borderWidth: 1,
                  //borderColor: '#fff',
                }}>
                <Box box={rrect(rect(20, 20, 60, 60), 60, 60)}>
                  <LinearGradient
                    start={vec(30, 30)}
                    end={vec(60, 60)}
                    colors={['#5D6167', '#1F2021']}
                  />
                  <BoxShadow dx={-8} dy={-8} blur={8} color="#5D6167" />
                  <BoxShadow dx={10} dy={10} blur={8} color="#13151A" />
                  <BoxShadow dx={-1} dy={-1} blur={1} color="#5D6167" inner />
                  <BoxShadow dx={1} dy={1} blur={3} color="#13151A" inner />
                </Box>
                <Path
                  path={backPath}
                  color="rgba(235,235,245,0.6)"
                  transform={[{translateX: 45}, {translateY: 40}]}
                />
              </Canvas>
            </Pressable>
            <Text
              style={{
                color: 'white',
                fontSize: 24,
                fontWeight: '600',
              }}>
              Charging
            </Text>
            <Pressable onPress={() => console.log('Press right')}>
              <Canvas
                style={{
                  width: 100,
                  height: 100,
                  //borderWidth: 1,
                  //borderColor: '#fff',
                }}>
                <Box box={rrect(rect(20, 20, 60, 60), 60, 60)}>
                  <LinearGradient
                    start={vec(30, 30)}
                    end={vec(60, 60)}
                    colors={['#5D6167', '#1F2021']}
                  />
                  <BoxShadow dx={-8} dy={-8} blur={8} color="#5D6167" />
                  <BoxShadow dx={10} dy={10} blur={8} color="#13151A" />
                  <BoxShadow dx={-1} dy={-1} blur={1} color="#5D6167" inner />
                  <BoxShadow dx={1} dy={1} blur={3} color="#13151A" inner />
                </Box>
                <Path
                  path={settingPath}
                  color="rgba(235,235,245,0.6)"
                  transform={[{translateX: 40}, {translateY: 40}]}
                />
              </Canvas>
            </Pressable>
          </View>
          {/* Body */}
          {/* Image */}
          <View
            style={{
              marginTop: 20,
              alignSelf: 'center',
            }}>
            <Canvas style={{width: WIDTH_SCREEN - 20, height: 120}}>
              <ImageSkia
                image={imageSrc}
                fit="cover"
                x={0}
                y={0}
                width={WIDTH_SCREEN - 20}
                height={150}
              />
            </Canvas>
          </View>
          {/* Process bar */}
          <View
            style={{
              alignSelf: 'center',
              //borderWidth: 1,
              //borderColor: 'white',
              marginTop: 0,
              alignItems: 'center',
              //justifyContent: 'flex-end',
            }}>
            {/* Animated Slide Bar */}
            <Animated.View
              style={[
                {
                  position: 'absolute',
                  width: WIDTH_SCREEN,
                  height: 130,
                  //borderWidth: 1,
                  //borderColor: 'red',
                  top: 0,
                  left: 0,
                  backgroundColor: 'transparent',
                  zIndex: 999,
                },
                widthBarStyle,
              ]}>
              <Canvas
                style={{
                  //width: WIDTH_SCREEN,
                  height: 130,
                }}>
                <Path
                  path={
                    'M8.5 31.8699V45C8.5 46.1046 9.39543 47 10.5 47H161.5V31.8506C161.5 31.6186 161.46 31.3884 161.381 31.1703L153.477 9.31973C153.191 8.52768 152.439 8 151.597 8H18.8757C18.0471 8 17.3043 8.51093 17.008 9.28471L8.63229 31.1546C8.54484 31.3829 8.5 31.6254 8.5 31.8699Z'
                  }
                  //color="rgba(235,235,245,0.6)"
                  //end={0.8}
                  transform={[{translateX: 50}, {translateY: 73}]}>
                  <LinearGradient
                    start={vec(153.5 / 2, 0)}
                    end={vec(153.5 / 2, 39)}
                    colors={[
                      '#4CC6F5',
                      '#52C9F3',
                      '#56CBF2',
                      '#66D2EC',
                      '#78DAE6',
                      '#94e7dd',
                      '#d6f0fd',
                    ]}
                  />
                  <Blur blur={1} />
                </Path>
                <Path
                  path={'M17 14H148L159 33V110L6 111V35L17 14Z'}
                  color="rgba(235,235,245,0.6)"
                  transform={[{translateX: 50}, {translateY: 10}]}>
                  <LinearGradient
                    start={vec(153 / 2, 97)}
                    end={vec(153 / 2, 0)}
                    //colors={['red', 'yellow', 'green', '#4a4653']}
                    colors={[
                      '#5daab3',
                      '#8fb6e6',
                      '#52C9F3',
                      '#4a4653',
                      '#000',
                    ]}
                    positions={[0.3, 0.4, 0.5, 1]}
                  />
                  <Blur blur={10} />
                </Path>
              </Canvas>
            </Animated.View>
            <Canvas
              style={{
                width: WIDTH_SCREEN,
                height: 130,
                //borderWidth: 1,
                //borderColor: '#fff',
              }}>
              <Path
                path={proceesBarPath}
                color="rgba(235,235,245,0.6)"
                transform={[{translateX: 50}, {translateY: 80}]}>
                <LinearGradient
                  start={vec(273 / 2, 0)}
                  end={vec(273 / 2, 39 / 3)}
                  colors={['#5D6167', '#313437']}
                  positions={[0.05, 0.9]}
                />
              </Path>
              <Path
                path={proceesBarPath}
                //color="rgba(235,235,245,0.6)"
                transform={[{translateX: 50}, {translateY: 80}]}
                style="stroke">
                <LinearGradient
                  start={vec(0, 0)}
                  end={vec(30, 30)}
                  colors={['#313437', '#5D6167']}
                  positions={[0.05, 0.9]}
                />
              </Path>
              {/* <Path
                path={
                  'M8.5 31.8699V45C8.5 46.1046 9.39543 47 10.5 47H161.5V31.8506C161.5 31.6186 161.46 31.3884 161.381 31.1703L153.477 9.31973C153.191 8.52768 152.439 8 151.597 8H18.8757C18.0471 8 17.3043 8.51093 17.008 9.28471L8.63229 31.1546C8.54484 31.3829 8.5 31.6254 8.5 31.8699Z'
                }
                //color="rgba(235,235,245,0.6)"
                //end={0.8}
                transform={[{translateX: 50}, {translateY: 73}]}>
                <LinearGradient
                  start={vec(153.5 / 2, 0)}
                  end={vec(153.5 / 2, 39)}
                  colors={[
                    '#4CC6F5',
                    '#52C9F3',
                    '#56CBF2',
                    '#66D2EC',
                    '#78DAE6',
                    '#94e7dd',
                    '#d6f0fd',
                  ]}
                />
                <Blur blur={1} />
              </Path>
              <Path
                path={'M17 14H148L159 33V110L6 111V35L17 14Z'}
                color="rgba(235,235,245,0.6)"
                transform={[{translateX: 50}, {translateY: 10}]}>
                <LinearGradient
                  start={vec(153 / 2, 97)}
                  end={vec(153 / 2, 0)}
                  //colors={['red', 'yellow', 'green', '#4a4653']}
                  colors={['#5daab3', '#8fb6e6', '#52C9F3', '#4a4653', '#000']}
                  positions={[0.3, 0.4, 0.5, 1]}
                />
                <Blur blur={10} />
              </Path> */}
              {font && (
                <TextSkia
                  font={font}
                  text={`${valueProcessText}%`}
                  //text={'65%'}
                  x={WIDTH_SCREEN / 2 - 30}
                  y={50}
                  color="#fff"
                />
              )}
            </Canvas>
            {/* Slider */}
            <View
              style={{
                marginTop: 50,
                //borderWidth: 1,
                //borderColor: '#fff',
              }}>
              <Canvas
                style={{
                  width: WIDTH_SCREEN * 0.8,
                  height: 30,
                  //borderWidth: 1,
                  //borderColor: '#fff',
                }}>
                <Box
                  box={rrect(rect(0, 0, WIDTH_SCREEN * 0.8, 10), 100, 100)}
                  //color="#add8e6"
                >
                  <BoxShadow
                    dx={1}
                    dy={1}
                    blur={2}
                    color="rgba(0,0,0,0.8)"
                    inner
                  />
                  <BoxShadow dx={-5} dy={-5} blur={4} color="#313437" inner />
                </Box>
              </Canvas>
              <PanGestureHandler onGestureEvent={panHandler}>
                <Animated.View
                  style={[
                    {
                      position: 'absolute',
                      top: -55,
                    },
                    sliderAnimatedStyle,
                  ]}>
                  <Canvas
                    style={{
                      width: 40,
                      height: 80,
                      //borderWidth: 1,
                      //borderColor: '#fff',
                      left: -10,
                    }}>
                    <Path
                      path={
                        'M17.8595 20.9571L25.4323 8.56532C26.1774 7.34611 27.9236 7.2789 28.7602 8.43724L37.7098 20.829C38.6651 22.1517 37.72 24 36.0885 24H19.5661C18.0043 24 17.0451 22.2898 17.8595 20.9571Z'
                      }
                      transform={[
                        {scale: 1.5},
                        {translateX: -15},
                        {translateY: 23},
                      ]}>
                      <LinearGradient
                        start={vec((24 * 1.5) / 2, 0)}
                        end={vec((24 * 1.5) / 2, 18)}
                        colors={['#2FB8FF', '#9EECD9']}
                        positions={[0.7, 1]}
                      />
                    </Path>
                    <TextSkia
                      x={0}
                      y={36}
                      text={percent.toFixed(0) + '%'}
                      font={fontSlider}
                      color="#fff"
                    />
                    <Box box={rrect(rect(20, 3, 5, 18), 0, 0)}>
                      <LinearGradient
                        start={vec(5 / 2, 0)}
                        end={vec(5 / 2, 18)}
                        colors={['#2FB8FF', '#9EECD9']}
                        //positions={[0.6, 1]}
                      />
                      <BoxShadow dx={1} dy={2} blur={2} color="#313437" />
                    </Box>
                  </Canvas>
                </Animated.View>
              </PanGestureHandler>
            </View>
            <View
              style={{
                marginTop: -10,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  fontSize: 15,
                  color: 'hsl(0,0%,70%)',
                }}>
                Set Charge Limit
              </Text>
            </View>
          </View>
          {/* Bottom */}
          <View
            style={{
              marginTop: 40,
              //borderWidth: 1,
              //borderColor: '#fff',
              width: WIDTH_SCREEN,
              alignItems: 'center',
              //height: 100,
            }}>
            <Canvas
              style={{
                width: WIDTH_SCREEN - 50,
                height: HEIGHT_SCREEN * 0.5,
              }}>
              <Box
                box={rrect(
                  rect(0, 0, WIDTH_SCREEN - 50, HEIGHT_SCREEN * 0.4),
                  50,
                  50,
                )}
                color="#1a1b1b">
                {/* <LinearGradient
                start={vec((WIDTH_SCREEN - 50) / 2, 0)}
                end={vec((WIDTH_SCREEN - 50) / 2, HEIGHT_SCREEN * 0.4)}
                colors={['#1a1b1b', '#202122']}
              /> */}
                <BoxShadow dx={6} dy={4} blur={6} color="#131313" inner />
                <BoxShadow dx={-10} dy={-8} blur={5} color="#202122" inner />
              </Box>
            </Canvas>
            <View
              style={{
                position: 'absolute',
                marginTop: 30,
                width: WIDTH_SCREEN - 100,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  //paddingRight: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: '700',
                  }}>
                  Nearby Supercharges
                </Text>
                <Canvas
                  style={{
                    width: 70,
                    height: 70,
                    //borderWidth: 1,
                    //borderColor: '#fff',
                    marginTop: 10,
                  }}>
                  <Box box={rrect(rect(10, 10, 50, 50), 50, 50)}>
                    <LinearGradient
                      start={vec(10, 10)}
                      end={vec(50, 50)}
                      colors={['#2E3236', '#24272A', '#141515']}
                      positions={[0, 0.2, 1]}
                    />
                    <BoxShadow dx={5} dy={5} blur={8} color="#131313" />
                    <BoxShadow dx={-6} dy={-6} blur={4} color="#282B2E" />
                  </Box>
                  <Circle
                    c={vec(35, 35)}
                    r={25}
                    style="stroke"
                    color={'#282B2E'}
                    strokeWidth={2}
                  />
                  <Circle
                    c={vec(35, 35)}
                    r={23}
                    style="stroke"
                    color={'#131313'}
                    strokeWidth={1}
                  />
                  <Path
                    path={
                      'M17.8984 2.49219C18.1426 2.23828 18.2793 1.93555 18.2793 1.57422C18.2793 0.832031 17.6934 0.246094 16.9707 0.246094C16.5996 0.246094 16.2578 0.392578 16.0039 0.65625L9.49023 7.3457L2.99609 0.65625C2.74219 0.392578 2.39063 0.246094 2.03906 0.246094C1.30664 0.246094 0.720703 0.832031 0.720703 1.57422C0.720703 1.93555 0.847656 2.24805 1.10156 2.49219L8.44531 10.002C8.75781 10.3242 9.09961 10.4707 9.5 10.4805C9.90039 10.4805 10.2422 10.3242 10.5547 10.002L17.8984 2.49219Z'
                    }
                    color="rgba(235,235,245,0.6)"
                    transform={[{translateX: 25}, {translateY: 30}]}
                  />
                </Canvas>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: 10,
                  marginTop: 20,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#fff',
                      fontWeight: '600',
                    }}>
                    Tesla Supercharger-
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#fff',
                      fontWeight: '600',
                    }}>
                    Montreal, QC
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#fff',
                      fontWeight: '600',
                    }}>
                    2{' '}
                    <Text
                      style={{
                        color: 'hsl(0,0%,40%)',
                      }}>
                      / 4 available
                    </Text>
                  </Text>
                </View>
                <View>
                  <Canvas
                    style={{
                      width: 40,
                      height: 40,
                      //borderWidth: 1,
                      //borderColor: '#FFFFFF',
                    }}>
                    <Path
                      path={
                        'M1.12276 15.2053L10.5201 34L19.9175 15.2053C23.4104 8.21943 18.3305 0 10.5201 0C2.70974 0 -2.37015 8.21942 1.12276 15.2053Z'
                      }
                      transform={[{translateX: 9}, {translateY: 2}]}>
                      <LinearGradient
                        start={vec(22 / 2, 0)}
                        end={vec(22 / 2, 34)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Path>
                    <Path
                      path={
                        'M0.69165 8.15332C0.69165 8.40088 0.88208 8.58496 1.14868 8.58496H4.73511L2.84351 13.7266C2.59595 14.3804 3.27515 14.7295 3.70044 14.1963L9.47046 6.98535C9.57837 6.85205 9.6355 6.7251 9.6355 6.5791C9.6355 6.33789 9.44507 6.14746 9.17847 6.14746H5.59204L7.48364 1.00586C7.7312 0.352051 7.052 0.00292969 6.62671 0.54248L0.856689 7.74707C0.748779 7.88672 0.69165 8.01367 0.69165 8.15332Z'
                      }
                      transform={[{translateX: 15}, {translateY: 7}]}></Path>
                  </Canvas>
                  <Text
                    style={{
                      color: 'hsl(0,0%,80%)',
                      fontSize: 14,
                    }}>
                    1.7Km
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: 10,
                  marginTop: 20,
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#fff',
                      fontWeight: '600',
                    }}>
                    Tesla Supercharger-
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      color: '#fff',
                      fontWeight: '600',
                    }}>
                    Montreal, QC
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#fff',
                      fontWeight: '600',
                    }}>
                    2{' '}
                    <Text
                      style={{
                        color: 'hsl(0,0%,40%)',
                      }}>
                      / 2 available
                    </Text>
                  </Text>
                </View>
                <View>
                  <Canvas
                    style={{
                      width: 40,
                      height: 40,
                      //borderWidth: 1,
                      //borderColor: '#FFFFFF',
                    }}>
                    <Path
                      path={
                        'M1.12276 15.2053L10.5201 34L19.9175 15.2053C23.4104 8.21943 18.3305 0 10.5201 0C2.70974 0 -2.37015 8.21942 1.12276 15.2053Z'
                      }
                      transform={[{translateX: 9}, {translateY: 2}]}>
                      <LinearGradient
                        start={vec(22 / 2, 0)}
                        end={vec(22 / 2, 34)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Path>
                    <Path
                      path={
                        'M0.69165 8.15332C0.69165 8.40088 0.88208 8.58496 1.14868 8.58496H4.73511L2.84351 13.7266C2.59595 14.3804 3.27515 14.7295 3.70044 14.1963L9.47046 6.98535C9.57837 6.85205 9.6355 6.7251 9.6355 6.5791C9.6355 6.33789 9.44507 6.14746 9.17847 6.14746H5.59204L7.48364 1.00586C7.7312 0.352051 7.052 0.00292969 6.62671 0.54248L0.856689 7.74707C0.748779 7.88672 0.69165 8.01367 0.69165 8.15332Z'
                      }
                      transform={[{translateX: 15}, {translateY: 7}]}></Path>
                  </Canvas>
                  <Text
                    style={{
                      color: 'hsl(0,0%,80%)',
                      fontSize: 14,
                    }}>
                    1.7Km
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default Charging;
