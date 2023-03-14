import {
  View,
  Text,
  Dimensions,
  StatusBar,
  Image,
  ViewComponent,
  ScrollView,
} from 'react-native';
import React from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import {
  Blur,
  Box,
  BoxShadow,
  Canvas,
  Circle,
  Fill,
  Group,
  LinearGradient,
  Path,
  RadialGradient,
  rect,
  Rect,
  RoundedRect,
  rrect,
  vec,
  Text as TextSkia,
  useFont,
  useValue,
  useSharedValueEffect,
  mix,
  useComputedValue,
  Paint,
  BackdropBlur,
  BlurMask,
} from '@shopify/react-native-skia';
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
const {width: WIDTH_SCREEN, height: HEIGHT_SCREEN} = Dimensions.get('screen');
const TeslaChargeScreen = () => {
  const fontFamily = useFont(require('./Font/Roboto-Regular.ttf'), 32);
  const fontFamily_16 = useFont(require('./Font/Roboto-Regular.ttf'), 16);
  const progressCharge = useSharedValue(0);
  const percentageChage = useValue(0);
  const chargeAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: progressCharge.value,
    };
  });
  const triangleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: progressCharge.value}],
    };
  });
  const panHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.currentValue = progressCharge.value;
    },
    onActive: (e, ctx) => {
      if (ctx.currentValue + e.translationX > 275) {
        progressCharge.value = 275;
      } else if (ctx.currentValue + e.translationX < 0) {
        progressCharge.value = 0;
      } else {
        progressCharge.value = ctx.currentValue + e.translationX;
      }
    },
  });
  useSharedValueEffect(() => {
    percentageChage.current = (progressCharge.value / 275) * 100;
  }, progressCharge);
  const updateCharge = useComputedValue(
    () => `${percentageChage.current.toFixed(0)}%`,
    [percentageChage],
  );
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#2A2D32'} />
        <Canvas
          style={{
            flex: 1,
          }}>
          <Fill>
            <LinearGradient
              start={vec(WIDTH_SCREEN / 2, 0)}
              end={vec(WIDTH_SCREEN / 2, HEIGHT_SCREEN)}
              colors={['#2A2D32', '#1D1D1D']}
            />
          </Fill>
        </Canvas>
        <ScrollView
          style={{
            position: 'absolute',
            width: WIDTH_SCREEN,
            flex: 1,
            height: HEIGHT_SCREEN,
          }}
          onScroll={e => console.log(e)}>
          <View
            style={{
              width: WIDTH_SCREEN,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Canvas style={{width: 100, height: 100}}>
                <Circle c={vec(50, 50)} r={31}>
                  <RadialGradient
                    c={vec(50, 50)}
                    r={35}
                    colors={['#5D6167', '#13151A']}
                  />
                  <BoxShadow
                    dx={10}
                    dy={10}
                    blur={10}
                    color="rgba(0,0,0,0.25)"
                  />
                  <Blur blur={10} />
                </Circle>
                <Circle c={vec(50, 50)} r={24} opacity={0.5}>
                  <RadialGradient
                    c={vec(50, 50)}
                    r={28}
                    colors={['#545659', '#232629']}
                  />
                </Circle>
                <Circle c={vec(50, 50)} r={25} style="stroke" strokeWidth={3}>
                  <LinearGradient
                    start={vec(9.5, 15)}
                    end={vec(70, 70)}
                    colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0)']}
                    positions={[0.45, 1]}
                  />
                </Circle>
              </Canvas>
              <View
                style={{
                  position: 'absolute',
                }}>
                <Canvas style={{width: 15, height: 15}}>
                  <Path
                    path={
                      'M0.0297852 8.00684C0.0297852 8.34717 0.154297 8.62939 0.428223 8.89502L6.81982 15.1455C7.02734 15.3613 7.29297 15.4692 7.6001 15.4692C8.22266 15.4692 8.7207 14.9712 8.7207 14.3486C8.7207 14.0332 8.59619 13.7593 8.37207 13.5352L2.69434 7.99854L8.37207 2.47852C8.59619 2.25439 8.7207 1.97217 8.7207 1.66504C8.7207 1.04248 8.22266 0.552734 7.6001 0.552734C7.28467 0.552734 7.02734 0.652344 6.81982 0.868164L0.428223 7.11865C0.154297 7.38428 0.0380859 7.6665 0.0297852 8.00684Z'
                    }
                    color="rgba(235,235,245,0.6)"
                  />
                </Canvas>
              </View>
            </View>
            <Text
              style={{
                fontSize: 24,
                color: 'white',
                fontWeight: '600',
              }}>
              CHARGING
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Canvas style={{width: 100, height: 100}}>
                <Circle c={vec(50, 50)} r={31}>
                  <RadialGradient
                    c={vec(50, 50)}
                    r={35}
                    colors={['#5D6167', '#13151A']}
                  />
                  <BoxShadow
                    dx={10}
                    dy={10}
                    blur={10}
                    color="rgba(0,0,0,0.25)"
                  />
                  <Blur blur={10} />
                </Circle>
                <Circle c={vec(50, 50)} r={24} opacity={0.5}>
                  <RadialGradient
                    c={vec(50, 50)}
                    r={28}
                    colors={['#545659', '#232629']}
                  />
                </Circle>
                <Circle c={vec(50, 50)} r={25} style="stroke" strokeWidth={3}>
                  <LinearGradient
                    start={vec(9.5, 15)}
                    end={vec(70, 70)}
                    colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0)']}
                    positions={[0.45, 1]}
                  />
                </Circle>
              </Canvas>
              <View
                style={{
                  position: 'absolute',
                }}>
                <Canvas style={{width: 20, height: 20}}>
                  <Path
                    path={
                      'M9.15332 18.6128H10.8467C11.5688 18.6128 12.1416 18.1646 12.3076 17.4756L12.6313 16.0728L12.814 16.0063L14.0342 16.7534C14.6484 17.1353 15.3706 17.0356 15.877 16.521L17.0474 15.3589C17.562 14.8359 17.6533 14.1221 17.2715 13.5161L16.5161 12.3042L16.5825 12.1299L17.9771 11.7979C18.666 11.6318 19.1143 11.0591 19.1143 10.3369V8.70996C19.1143 7.99609 18.666 7.41504 17.9771 7.24902L16.5908 6.90869L16.5244 6.72607L17.2798 5.51416C17.6616 4.9165 17.5703 4.20264 17.0474 3.66309L15.8853 2.50098C15.3789 1.99463 14.6567 1.89502 14.0508 2.26855L12.8223 3.01562L12.6313 2.94922L12.3076 1.53809C12.1416 0.849121 11.5688 0.400879 10.8467 0.400879H9.15332C8.43115 0.400879 7.8584 0.849121 7.69238 1.53809L7.36865 2.94922L7.16943 3.01562L5.94922 2.26855C5.34326 1.89502 4.62109 1.99463 4.11475 2.50098L2.94434 3.66309C2.42969 4.20264 2.33838 4.9165 2.72021 5.51416L3.47559 6.72607L3.40918 6.90869L2.02295 7.24902C1.32568 7.42334 0.885742 7.99609 0.885742 8.70996V10.3369C0.885742 11.0591 1.33398 11.6318 2.02295 11.7979L3.41748 12.1299L3.48389 12.3042L2.72852 13.5161C2.34668 14.1221 2.43799 14.8359 2.95264 15.3589L4.12305 16.521C4.62939 17.0356 5.35156 17.1353 5.95752 16.7534L7.18604 16.0063L7.36865 16.0728L7.69238 17.4756C7.8584 18.1646 8.43115 18.6128 9.15332 18.6128ZM9.41895 16.9526C9.27783 16.9526 9.21143 16.8862 9.18652 16.77L8.70508 14.7363C8.15723 14.6118 7.63428 14.396 7.19434 14.1055L5.40967 15.2095C5.31006 15.2759 5.21045 15.2676 5.11084 15.1763L4.29736 14.3628C4.20605 14.2715 4.20605 14.1719 4.27246 14.0723L5.37646 12.2876C5.11914 11.856 4.88672 11.3413 4.77051 10.8018L2.72852 10.3203C2.6123 10.2954 2.5459 10.229 2.5459 10.0879V8.95068C2.5459 8.80957 2.604 8.75146 2.72852 8.71826L4.76221 8.23682C4.88672 7.68066 5.13574 7.14111 5.35986 6.74268L4.26416 4.96631C4.19775 4.8501 4.18945 4.75879 4.28906 4.65918L5.10254 3.8623C5.20215 3.7627 5.29346 3.75439 5.40967 3.8208L7.18604 4.9082C7.57617 4.65918 8.14893 4.41846 8.70508 4.27734L9.18652 2.24365C9.21143 2.12744 9.27783 2.06104 9.41895 2.06104H10.5811C10.7222 2.06104 10.7886 2.12744 10.8135 2.24365L11.3032 4.29395C11.8594 4.41846 12.374 4.65088 12.8057 4.9082L14.582 3.8291C14.6982 3.7627 14.7896 3.771 14.8892 3.8623L15.7026 4.66748C15.8022 4.75879 15.7939 4.8584 15.7275 4.96631L14.6401 6.74268C14.8643 7.14111 15.1133 7.68066 15.2295 8.23682L17.2715 8.71826C17.396 8.75146 17.4541 8.80957 17.4541 8.95068V10.0879C17.4541 10.229 17.3877 10.2954 17.2715 10.3203L15.2295 10.8018C15.105 11.3413 14.8809 11.8643 14.6235 12.2876L15.7192 14.064C15.7856 14.1719 15.7856 14.2632 15.6943 14.3545L14.8809 15.168C14.7812 15.2676 14.6816 15.2676 14.582 15.2012L12.8057 14.1055C12.3574 14.396 11.876 14.6035 11.3032 14.7363L10.8135 16.77C10.7886 16.8945 10.7222 16.9526 10.5811 16.9526H9.41895ZM10 12.6528C11.7266 12.6528 13.1377 11.2417 13.1377 9.50684C13.1377 7.78857 11.7266 6.37744 10 6.37744C8.27344 6.37744 6.854 7.78857 6.854 9.50684C6.854 11.2334 8.27344 12.6528 10 12.6528ZM10 11.1255C9.12012 11.1255 8.38965 10.395 8.38965 9.50684C8.38965 8.63525 9.12012 7.91309 10 7.91309C10.8633 7.91309 11.5938 8.63525 11.5938 9.50684C11.5938 10.3867 10.8633 11.1255 10 11.1255Z'
                    }
                    color="rgba(235,235,245,0.6)"
                  />
                </Canvas>
              </View>
            </View>
          </View>
          <Image
            source={require('./Image/Tesla.png')}
            style={{
              width: WIDTH_SCREEN,
              height: 200,
            }}
            resizeMode="contain"
          />

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 50,
            }}>
            <View
              style={{
                position: 'absolute',
                top: -50,
              }}>
              {fontFamily && (
                <Canvas
                  style={{
                    width: 80,
                    height: 32,
                  }}>
                  <TextSkia
                    text={updateCharge}
                    font={fontFamily}
                    x={0}
                    y={28}
                    color="white"
                  />
                </Canvas>
              )}
            </View>
            <Canvas
              style={{
                width: 280,
                height: 80,
              }}>
              <Group>
                <Path
                  path={
                    'M1.013 24.9031L1.43756 38.0645C1.47237 39.1434 2.35705 40 3.43652 40H272C273.105 40 274 39.1046 274 38V24.8506C274 24.6186 273.96 24.3884 273.881 24.1703L265.977 2.31973C265.691 1.52768 264.939 1 264.097 1H11.3757C10.5471 1 9.80433 1.51093 9.50799 2.28471L1.14425 24.1233C1.04904 24.3719 1.00442 24.6371 1.013 24.9031Z'
                  }
                  color="white"
                  opacity={0.2}>
                  <BoxShadow
                    dx={11}
                    dy={5}
                    blur={9}
                    color="rgba(255,255,255,0.29)"
                    inner
                  />
                  <LinearGradient
                    start={vec(273 / 2, 0)}
                    end={vec(273 / 2, 60)}
                    colors={['white', 'black']}
                  />
                </Path>
                <Rect x={0} y={22} width={274} height={5} color="rgba(0,0,0,1)">
                  <Blur blur={6} />
                </Rect>
                <Path
                  path={
                    'M1.013 24.9031L1.43756 38.0645C1.47237 39.1434 2.35705 40 3.43652 40H272C273.105 40 274 39.1046 274 38V24.8506C274 24.6186 273.96 24.3884 273.881 24.1703L265.977 2.31973C265.691 1.52768 264.939 1 264.097 1H11.3757C10.5471 1 9.80433 1.51093 9.50799 2.28471L1.14425 24.1233C1.04904 24.3719 1.00442 24.6371 1.013 24.9031Z'
                  }
                  style="stroke"
                  strokeWidth={1}>
                  <LinearGradient
                    start={vec(273 / 2, 0)}
                    end={vec(273 / 2, 73 + 39)}
                    colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}
                  />
                </Path>
              </Group>
            </Canvas>
            <View
              style={{
                width: 280,
                top: 0,
                position: 'absolute',
              }}>
              <Animated.View style={chargeAnimatedStyle}>
                <Canvas
                  style={{
                    width: '100%',
                    height: 120,
                    top: -80,
                    position: 'absolute',
                  }}>
                  <Group>
                    <Rect x={0} y={0} width={180} height={150}>
                      <LinearGradient
                        start={vec(83.9807, 9.91579)}
                        end={vec(83, 127)}
                        colors={[
                          'rgba(47,184,255,0)',
                          'rgba(75,198,245,0.4)',
                          'rgba(107,212,235,0.7)',
                          'rgba(133,224,225,1)',
                        ]}
                        positions={[0.195856, 0.546579, 0.83609, 1]}
                      />
                      <Blur blur={20} />
                    </Rect>
                  </Group>
                </Canvas>
                <Canvas
                  style={{
                    width: '100%',
                    height: 60,
                  }}>
                  <Group>
                    <Path
                      path={
                        'M1.013 24.9031L1.43756 38.0645C1.47237 39.1434 2.35705 40 3.43652 40H272C273.105 40 274 39.1046 274 38V24.8506C274 24.6186 273.96 24.3884 273.881 24.1703L265.977 2.31973C265.691 1.52768 264.939 1 264.097 1H11.3757C10.5471 1 9.80433 1.51093 9.50799 2.28471L1.14425 24.1233C1.04904 24.3719 1.00442 24.6371 1.013 24.9031Z'
                      }
                      opacity={0.7}>
                      <LinearGradient
                        start={vec(273 / 2, 0)}
                        end={vec(273 / 2, 50)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Path>
                    <Rect x={0} y={22} width={274} height={5}>
                      <Blur blur={6} />
                      <LinearGradient
                        start={vec(273 / 2, 0)}
                        end={vec(273 / 2, 5)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Rect>
                    <Path
                      path={
                        'M1.013 24.9031L1.43756 38.0645C1.47237 39.1434 2.35705 40 3.43652 40H272C273.105 40 274 39.1046 274 38V24.8506C274 24.6186 273.96 24.3884 273.881 24.1703L265.977 2.31973C265.691 1.52768 264.939 1 264.097 1H11.3757C10.5471 1 9.80433 1.51093 9.50799 2.28471L1.14425 24.1233C1.04904 24.3719 1.00442 24.6371 1.013 24.9031Z'
                      }
                      style="stroke"
                      strokeWidth={1}
                      opacity={0.7}>
                      <LinearGradient
                        start={vec(273 / 2, 0)}
                        end={vec(273 / 2, 50)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Path>
                  </Group>
                </Canvas>
              </Animated.View>
            </View>
            <View
              style={{
                width: 280,

                flexDirection: 'row',
                position: 'absolute',
                justifyContent: 'flex-end',
                top: 50,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: 45,
                  justifyContent: 'space-between',
                  right: '25%',
                  position: 'absolute',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  75%
                </Text>
                <Canvas
                  style={{
                    width: 2,
                    height: 10,
                  }}>
                  <RoundedRect x={0} y={0} width={2} height={9} r={2}>
                    <LinearGradient
                      start={vec(1, 0)}
                      end={vec(1, 9)}
                      colors={['#2FB8FF', '#9EECD9']}
                    />
                  </RoundedRect>
                </Canvas>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: 45,
                  justifyContent: 'space-between',
                  right: 5,
                  position: 'absolute',
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                  }}>
                  100%
                </Text>
                <Canvas
                  style={{
                    width: 2,
                    height: 10,
                  }}>
                  <RoundedRect x={0} y={0} width={2} height={9} r={2}>
                    <LinearGradient
                      start={vec(1, 0)}
                      end={vec(1, 9)}
                      colors={['#2FB8FF', '#9EECD9']}
                    />
                  </RoundedRect>
                </Canvas>
              </View>
              <View style={{width: 280, marginTop: 40}}>
                <Canvas
                  style={{
                    width: '100%',
                    height: 15,
                  }}>
                  <Box
                    box={rrect(rect(0, 0, 275, 10), 10, 10)}
                    color="rgba(36, 37, 40, 0.7)">
                    <BoxShadow
                      dx={-2}
                      dy={-2}
                      blur={4}
                      color="rgba(255,255,255,0.08)"
                      inner
                    />
                    <BoxShadow
                      dx={4}
                      dy={4}
                      blur={4}
                      color="rgba(0,0,0,0.8)"
                      inner
                    />
                  </Box>
                </Canvas>
                <PanGestureHandler onGestureEvent={panHandler}>
                  <Animated.View
                    style={[
                      {
                        width: 30,
                        height: 30,
                        position: 'absolute',
                        top: -12,
                        left: -15,
                      },
                      triangleAnimatedStyle,
                    ]}>
                    <Canvas
                      style={{
                        width: 30,
                        height: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Path
                        path={
                          'M17.3595 20.9571L24.9323 8.56532C25.6774 7.34611 27.4236 7.2789 28.2602 8.43724L37.2098 20.829C38.1651 22.1517 37.22 24 35.5885 24H19.0661C17.5043 24 16.5451 22.2898 17.3595 20.9571Z'
                        }
                        color="red"
                        transform={[{translateX: -12}]}>
                        <LinearGradient
                          start={vec(15, 0)}
                          end={vec(15, 30)}
                          colors={['#2FB8FF', '#9EECD9']}
                        />
                      </Path>
                    </Canvas>
                  </Animated.View>
                </PanGestureHandler>
              </View>
              <Text
                style={{
                  position: 'absolute',
                  color: '#EBEBF5',
                  opacity: 0.6,
                  bottom: -30,
                  width: 280,
                  textAlign: 'center',
                }}>
                Set Charge Limit
              </Text>
            </View>
          </View>

          <View
            style={{
              width: WIDTH_SCREEN,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 80,
            }}>
            <Canvas
              style={{
                width: 330,
                height: 300,
              }}>
              <RoundedRect x={0} y={0} width={330} height={300} r={40}>
                <Paint color={'#202122'} />
                <BoxShadow dx={-12} dy={-6} blur={2} color="black" inner />
                <BoxShadow dx={12} dy={6} blur={2} color="#252627" inner />
              </RoundedRect>
            </Canvas>
            <ScrollView
              style={{
                position: 'absolute',
                // justifyContent: 'flex-start',
                // alignItems: 'flex-start',
                height: 300,
                paddingTop: 20,
              }}
              showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 300,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 20,
                    fontWeight: '600',
                  }}>
                  Nearby Superchargers
                </Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Canvas style={{width: 100, height: 100}}>
                    <Circle c={vec(50, 50)} r={31}>
                      <RadialGradient
                        c={vec(50, 50)}
                        r={35}
                        colors={['#5D6167', '#13151A']}
                      />
                      <BoxShadow
                        dx={10}
                        dy={10}
                        blur={10}
                        color="rgba(0,0,0,0.25)"
                      />
                      <Blur blur={10} />
                    </Circle>
                    <Circle c={vec(50, 50)} r={24} opacity={0.5}>
                      <RadialGradient
                        c={vec(50, 50)}
                        r={28}
                        colors={['#545659', '#232629']}
                      />
                    </Circle>
                    <Circle
                      c={vec(50, 50)}
                      r={25}
                      style="stroke"
                      strokeWidth={3}>
                      <LinearGradient
                        start={vec(9.5, 15)}
                        end={vec(70, 70)}
                        colors={['rgba(0,0,0,0.45)', 'rgba(0,0,0,0)']}
                        positions={[0.45, 1]}
                      />
                    </Circle>
                  </Canvas>
                  <View
                    style={{
                      position: 'absolute',
                      transform: [{rotate: '90deg'}],
                    }}>
                    <Canvas style={{width: 15, height: 15}}>
                      <Path
                        path={
                          'M0.0297852 8.00684C0.0297852 8.34717 0.154297 8.62939 0.428223 8.89502L6.81982 15.1455C7.02734 15.3613 7.29297 15.4692 7.6001 15.4692C8.22266 15.4692 8.7207 14.9712 8.7207 14.3486C8.7207 14.0332 8.59619 13.7593 8.37207 13.5352L2.69434 7.99854L8.37207 2.47852C8.59619 2.25439 8.7207 1.97217 8.7207 1.66504C8.7207 1.04248 8.22266 0.552734 7.6001 0.552734C7.28467 0.552734 7.02734 0.652344 6.81982 0.868164L0.428223 7.11865C0.154297 7.38428 0.0380859 7.6665 0.0297852 8.00684Z'
                        }
                        color="rgba(235,235,245,0.6)"
                      />
                    </Canvas>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 280,
                }}>
                <View
                  style={{
                    width: '50%',
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                    }}>
                    Tesla Supercharger - Montreal, QC
                  </Text>
                  <Text style={{color: 'white'}}>
                    2{' '}
                    <Text
                      style={{
                        color: 'gray',
                      }}>
                      / 4 available
                    </Text>
                  </Text>
                </View>

                <Canvas style={{width: 50, height: 80}}>
                  <Group transform={[{translateX: 7}]}>
                    <Path
                      path={
                        'M7.60262 15.2053L17 34L26.3974 15.2053C29.8903 8.21943 24.8104 0 17 0C9.18959 0 4.1097 8.21942 7.60262 15.2053Z'
                      }>
                      <LinearGradient
                        start={vec(17, 0)}
                        end={vec(17, 34)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Path>
                    <Path
                      path={
                        'M13.0249 13.1533C13.0249 13.4009 13.2153 13.585 13.4819 13.585H17.0684L15.1768 18.7266C14.9292 19.3804 15.6084 19.7295 16.0337 19.1963L21.8037 11.9854C21.9116 11.8521 21.9688 11.7251 21.9688 11.5791C21.9688 11.3379 21.7783 11.1475 21.5117 11.1475H17.9253L19.8169 6.00586C20.0645 5.35205 19.3853 5.00293 18.96 5.54248L13.1899 12.7471C13.082 12.8867 13.0249 13.0137 13.0249 13.1533Z'
                      }
                      color="black"
                    />
                  </Group>
                  {fontFamily_16 && (
                    <TextSkia
                      x={0}
                      y={60}
                      font={fontFamily_16}
                      text="1.7 Km"
                      color={'#EBEBF5'}
                      opacity={0.6}
                    />
                  )}
                </Canvas>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 280,
                }}>
                <View
                  style={{
                    width: '50%',
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                    }}>
                    Tesla Supercharger - Montreal, QC
                  </Text>
                  <Text style={{color: 'white'}}>
                    2{' '}
                    <Text
                      style={{
                        color: 'gray',
                      }}>
                      / 4 available
                    </Text>
                  </Text>
                </View>

                <Canvas style={{width: 50, height: 80}}>
                  <Group transform={[{translateX: 7}]}>
                    <Path
                      path={
                        'M7.60262 15.2053L17 34L26.3974 15.2053C29.8903 8.21943 24.8104 0 17 0C9.18959 0 4.1097 8.21942 7.60262 15.2053Z'
                      }>
                      <LinearGradient
                        start={vec(17, 0)}
                        end={vec(17, 34)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Path>
                    <Path
                      path={
                        'M13.0249 13.1533C13.0249 13.4009 13.2153 13.585 13.4819 13.585H17.0684L15.1768 18.7266C14.9292 19.3804 15.6084 19.7295 16.0337 19.1963L21.8037 11.9854C21.9116 11.8521 21.9688 11.7251 21.9688 11.5791C21.9688 11.3379 21.7783 11.1475 21.5117 11.1475H17.9253L19.8169 6.00586C20.0645 5.35205 19.3853 5.00293 18.96 5.54248L13.1899 12.7471C13.082 12.8867 13.0249 13.0137 13.0249 13.1533Z'
                      }
                      color="black"
                    />
                  </Group>
                  {fontFamily_16 && (
                    <TextSkia
                      x={0}
                      y={60}
                      font={fontFamily_16}
                      text="1.7 Km"
                      color={'#EBEBF5'}
                      opacity={0.6}
                    />
                  )}
                </Canvas>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 280,
                }}>
                <View
                  style={{
                    width: '50%',
                  }}>
                  <Text
                    style={{
                      color: 'gray',
                    }}>
                    Tesla Supercharger - Montreal, QC
                  </Text>
                  <Text style={{color: 'white'}}>
                    2{' '}
                    <Text
                      style={{
                        color: 'gray',
                      }}>
                      / 4 available
                    </Text>
                  </Text>
                </View>

                <Canvas style={{width: 50, height: 80}}>
                  <Group transform={[{translateX: 7}]}>
                    <Path
                      path={
                        'M7.60262 15.2053L17 34L26.3974 15.2053C29.8903 8.21943 24.8104 0 17 0C9.18959 0 4.1097 8.21942 7.60262 15.2053Z'
                      }>
                      <LinearGradient
                        start={vec(17, 0)}
                        end={vec(17, 34)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Path>
                    <Path
                      path={
                        'M13.0249 13.1533C13.0249 13.4009 13.2153 13.585 13.4819 13.585H17.0684L15.1768 18.7266C14.9292 19.3804 15.6084 19.7295 16.0337 19.1963L21.8037 11.9854C21.9116 11.8521 21.9688 11.7251 21.9688 11.5791C21.9688 11.3379 21.7783 11.1475 21.5117 11.1475H17.9253L19.8169 6.00586C20.0645 5.35205 19.3853 5.00293 18.96 5.54248L13.1899 12.7471C13.082 12.8867 13.0249 13.0137 13.0249 13.1533Z'
                      }
                      color="black"
                    />
                  </Group>
                  {fontFamily_16 && (
                    <TextSkia
                      x={0}
                      y={60}
                      font={fontFamily_16}
                      text="1.7 Km"
                      color={'#EBEBF5'}
                      opacity={0.6}
                    />
                  )}
                </Canvas>
              </View>
            </ScrollView>

            <View
              style={{
                width: WIDTH_SCREEN,
                position: 'absolute',
                bottom: -10,
                left: 1,
              }}>
              <Canvas
                style={{
                  width: WIDTH_SCREEN,
                  height: 78,
                }}>
                <Path
                  path={
                    'M0 30L16.3492 12.94C24.2708 4.67391 35.2237 0 46.6727 0H124.328C132.903 0 141.273 2.62492 148.313 7.52198L169.302 22.1232C184.749 32.8689 205.251 32.8689 220.698 22.1232L241.687 7.52198C248.727 2.62491 257.097 0 265.672 0H343.327C354.776 0 365.729 4.67391 373.651 12.94L390 30V78H0V30Z'
                  }
                  color="#000000"
                  opacity={0.9}>
                  <BoxShadow
                    dx={-2}
                    dy={-4}
                    blur={21}
                    color="rgba(255,255,255,0)"
                    inner
                  />
                  <BlurMask blur={6} style="inner" />
                  <BoxShadow
                    dx={0}
                    dy={1}
                    blur={3}
                    color="rgba(255,255,255,0.22)"
                    inner
                  />
                </Path>
                <Path
                  path={
                    'M0 30L16.3492 12.94C24.2708 4.67391 35.2237 0 46.6727 0H124.328C132.903 0 141.273 2.62492 148.313 7.52198L169.302 22.1232C184.749 32.8689 205.251 32.8689 220.698 22.1232L241.687 7.52198C248.727 2.62491 257.097 0 265.672 0H343.327C354.776 0 365.729 4.67391 373.651 12.94L390 30V78H0V30Z'
                  }
                  color="white"
                  opacity={0.2}
                  strokeWidth={2}
                  style={'stroke'}
                />
              </Canvas>

              <View
                style={{
                  position: 'absolute',
                  top: -50,
                  alignSelf: 'center',
                }}>
                <Canvas
                  style={{
                    width: 68,
                    height: 68,
                  }}>
                  <Circle c={vec(68 / 2, 68 / 2)} r={68 / 2 - 1} opacity={0.6}>
                    <BlurMask blur={6} style="inner" />
                  </Circle>
                  <Circle c={vec(68 / 2, 68 / 2)} r={68 / 2} style="stroke">
                    <LinearGradient
                      start={vec(68 / 2, 0)}
                      end={vec(68 / 2, 68)}
                      colors={['rgba(255,255,255,0.6)', 'rgba(0,0,0,0)']}
                    />
                  </Circle>
                  <Group transform={[{translateX: 18}, {translateY: 37 / 2}]}>
                    <Path
                      path={
                        'M0.628906 15.3087C0.628906 16.5568 1.66602 17.5763 2.89648 17.5763H13.2324V27.9122C13.2324 29.1603 14.252 30.1798 15.5 30.1798C16.748 30.1798 17.7676 29.1603 17.7676 27.9122V17.5763H28.1035C29.3516 17.5763 30.3711 16.5568 30.3711 15.3087C30.3711 14.0607 29.3516 13.0411 28.1035 13.0411H17.7676V2.7052C17.7676 1.47473 16.748 0.437622 15.5 0.437622C14.252 0.437622 13.2324 1.47473 13.2324 2.7052V13.0411H2.89648C1.66602 13.0411 0.628906 14.0607 0.628906 15.3087Z'
                      }>
                      <LinearGradient
                        start={vec(15.5, -5.99988)}
                        end={vec(15.5, 37)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Path>
                  </Group>
                </Canvas>
              </View>
              <View
                style={{
                  width: WIDTH_SCREEN,
                  position: 'absolute',
                  top: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Canvas
                  style={{
                    width: 44,
                    height: 44,
                  }}>
                  <Path
                    path={
                      'M7 5H17L22 11.5V19H19L18 17H6L5 19H2V11.5L7 5Z M17 15H7L6 17H18L17 15Z M2 9H4L6 12H18L20 9H22'
                    }
                    style="stroke"
                    color={'#EBEBF5'}
                    opacity={0.6}
                    strokeWidth={2}
                    strokeCap="round"
                    strokeJoin={'round'}
                    transform={[{translateX: 10}, {translateY: 10}]}
                  />
                </Canvas>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '55%',
                  }}>
                  <Canvas
                    style={{
                      width: 44,
                      height: 44,
                    }}>
                    <Path
                      path={
                        'M15.2051 23.1309C15.2051 23.5508 15.5371 23.8633 15.9863 23.8633H21.7578L18.7305 31.9395C18.3105 33.043 19.4629 33.6289 20.1953 32.7305L29.502 21.3047C29.6875 21.0703 29.7852 20.8555 29.7852 20.6211C29.7852 20.1914 29.4531 19.8789 29.0039 19.8789H23.2324L26.2598 11.8125C26.6797 10.6992 25.5273 10.1133 24.7949 11.0117L15.4883 22.4473C15.3027 22.6719 15.2051 22.8867 15.2051 23.1309Z'
                      }
                      //style="stroke"
                      color={'#EBEBF5'}
                      opacity={0.6}
                      strokeWidth={2}
                      strokeCap="round"
                      strokeJoin={'round'}>
                      <LinearGradient
                        start={vec(44 / 2, 12)}
                        end={vec(44 / 2, 28)}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                    </Path>
                    <RoundedRect x={11} y={11} width={22} height={22} r={100}>
                      <RadialGradient
                        c={vec(11, 11)}
                        r={22}
                        colors={['#2FB8FF', '#9EECD9']}
                      />
                      <Blur blur={8} />
                    </RoundedRect>
                  </Canvas>

                  <Canvas
                    style={{
                      width: 44,
                      height: 44,
                    }}>
                    <Path
                      path={
                        'M6.96094 4.49902C6.96094 6.38965 8.23926 7.96875 9.99023 8.40918V15.209C9.99023 18.3779 10.5596 20.1074 10.9893 20.1074C11.4297 20.1074 11.9883 18.3887 11.9883 15.209V8.40918C13.7393 7.97949 15.0283 6.38965 15.0283 4.49902C15.0283 2.27539 13.2344 0.449219 10.9893 0.449219C8.75488 0.449219 6.96094 2.27539 6.96094 4.49902ZM9.83984 4.72461C9.10938 4.72461 8.46484 4.08008 8.46484 3.32812C8.46484 2.58691 9.10938 1.95312 9.83984 1.95312C10.6025 1.95312 11.2256 2.58691 11.2256 3.32812C11.2256 4.08008 10.6025 4.72461 9.83984 4.72461ZM11 24.0391C17.4775 24.0391 21.1943 21.8047 21.1943 19.4414C21.1943 16.6055 16.6934 14.876 13.7393 14.8438V16.4121C15.8125 16.4443 19.0244 17.5723 19.0244 19.1836C19.0244 21.0312 15.6191 22.3418 11 22.3418C6.35938 22.3418 2.97559 21.0527 2.97559 19.1836C2.97559 17.5723 6.17676 16.4443 8.25 16.4121V14.8438C5.2959 14.876 0.794922 16.6055 0.794922 19.4414C0.794922 21.8047 4.52246 24.0391 11 24.0391Z'
                      }
                      style="stroke"
                      color={'#EBEBF5'}
                      opacity={0.6}
                      strokeWidth={2}
                      strokeCap="round"
                      strokeJoin={'round'}
                      transform={[{translateX: 10}, {translateY: 10}]}
                    />
                  </Canvas>
                </View>

                <Canvas
                  style={{
                    width: 44,
                    height: 44,
                  }}>
                  <Path
                    path={
                      'M22 22.1367C24.2988 22.1367 26.2969 20.0742 26.2969 17.3887C26.2969 14.7354 24.2988 12.7695 22 12.7695C19.7012 12.7695 17.7031 14.7783 17.7031 17.4102C17.7031 20.0742 19.6904 22.1367 22 22.1367ZM14.792 32.084H29.1973C30.3467 32.084 31.0342 31.5469 31.0342 30.6553C31.0342 27.8838 27.5645 24.0596 21.9893 24.0596C16.4248 24.0596 12.9551 27.8838 12.9551 30.6553C12.9551 31.5469 13.6426 32.084 14.792 32.084Z'
                    }
                    style="stroke"
                    color={'#EBEBF5'}
                    opacity={0.6}
                    strokeWidth={2}
                    strokeCap="round"
                    strokeJoin={'round'}
                  />
                </Canvas>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default TeslaChargeScreen;
<svg
  width="44"
  height="44"
  viewBox="0 0 44 44"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M22 22.1367C24.2988 22.1367 26.2969 20.0742 26.2969 17.3887C26.2969 14.7354 24.2988 12.7695 22 12.7695C19.7012 12.7695 17.7031 14.7783 17.7031 17.4102C17.7031 20.0742 19.6904 22.1367 22 22.1367ZM14.792 32.084H29.1973C30.3467 32.084 31.0342 31.5469 31.0342 30.6553C31.0342 27.8838 27.5645 24.0596 21.9893 24.0596C16.4248 24.0596 12.9551 27.8838 12.9551 30.6553C12.9551 31.5469 13.6426 32.084 14.792 32.084Z"
    fill="#EBEBF5"
    fill-opacity="0.6"
  />
</svg>;
