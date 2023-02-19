import {View, Text, Dimensions, Pressable} from 'react-native';
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
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
const {width, height} = Dimensions.get('screen');
const homeSvg =
  'M39.434,20.718c0,1.104-0.895,2-2,2c-0.004,0-0.012,0-0.02,0h-3.805v10.637c0,1.104-0.896,2-2,2h-6.568 c-1.104,0-2-0.896-2-2v-5.638c0-1.838-1.496-3.333-3.333-3.333c-1.838,0-3.334,1.495-3.334,3.333v5.638c0,1.104-0.896,2-2,2H7.805 c-1.104,0-2-0.896-2-2V22.718H2c-0.844,0-1.598-0.528-1.882-1.322c-0.285-0.795-0.043-1.682,0.606-2.22L18.432,4.538 c0.74-0.611,1.81-0.611,2.549,0L38.526,19.04C39.072,19.398,39.434,20.016,39.434,20.718z';
const lineSvg =
  'M59,51.5h-1v-37H46v37h-3v-45H31v45h-3v-14H16v14h-3v-23H1v23c-0.552,0-1,0.447-1,1s0.448,1,1,1h12h3h12h3h12h3h12h1 c0.552,0,1-0.447,1-1S59.552,51.5,59,51.5z M3,51.5v-21h8v21H3z M18,51.5v-12h8v12H18z M38,51.5c0-0.552-0.448-1-1-1s-1,0.448-1,1 h-3v-3v-6v-6v-6v-6v-6v-6v-4h4h4v4v6v6v6v6v6v6v3H38z M48,51.5v-35h8v35H48z';
const plusSvg =
  'M54.454,23.18l-18.609-0.002L35.844,5.91C35.845,2.646,33.198,0,29.934,0c-3.263,0-5.909,2.646-5.909,5.91v17.269 L5.91,23.178C2.646,23.179,0,25.825,0,29.088c0.002,3.264,2.646,5.909,5.91,5.909h18.115v19.457c0,3.267,2.646,5.91,5.91,5.91 c3.264,0,5.909-2.646,5.91-5.908V34.997h18.611c3.262,0,5.908-2.645,5.908-5.907C60.367,25.824,57.718,23.178,54.454,23.18z';
const pencilSvg =
  'M30.154,3.586c-1.586-0.873-3.379-1.334-5.186-1.334c-2.646,0-5.162,0.968-7.111,2.696 c-1.953-1.729-4.474-2.696-7.119-2.696c-1.801,0-3.593,0.461-5.187,1.336C2.127,5.484,0,9.088,0,12.994 c0,1.102,0.172,2.193,0.51,3.248c1.773,7.637,15.946,16.607,16.551,16.986c0.244,0.154,0.521,0.23,0.798,0.23 c0.276,0,0.554-0.078,0.797-0.23c0.605-0.379,14.769-9.352,16.546-16.987c0.336-1.054,0.508-2.146,0.508-3.248 C35.708,9.088,33.582,5.484,30.154,3.586z M32.328,15.378c-0.016,0.046-0.025,0.093-0.037,0.141 c-1.115,5.003-10.146,11.833-14.433,14.657C13.569,27.354,4.536,20.527,3.422,15.52c-0.011-0.048-0.023-0.097-0.039-0.143 C3.129,14.604,3,13.803,3,12.995c0-2.814,1.534-5.414,4-6.779c1.146-0.63,2.438-0.963,3.736-0.963c2.311,0,4.484,1.022,5.968,2.806 C16.989,8.401,17.412,8.6,17.857,8.6h0.001c0.447,0,0.869-0.199,1.153-0.543c1.477-1.781,3.646-2.804,5.957-2.804 c1.301,0,2.592,0.333,3.732,0.96c2.471,1.368,4.004,3.967,4.004,6.782C32.708,13.803,32.582,14.605,32.328,15.378z';
const personSvg =
  'M35.7502,28 C38.0276853,28 39.8876578,29.7909151 39.9950978,32.0427546 L40,32.2487 L40,33 C40,36.7555 38.0583,39.5669 35.0798,41.3802 C32.1509,43.1633 28.2139,44 24,44 C19.7861,44 15.8491,43.1633 12.9202,41.3802 C10.0319285,39.6218485 8.11862909,36.9249713 8.00532378,33.3388068 L8,33 L8,32.2489 C8,29.9703471 9.79294995,28.1122272 12.0440313,28.0048972 L12.2499,28 L35.7502,28 Z M35.7502,30.5 L12.2499,30.5 C11.331345,30.5 10.5787597,31.2066575 10.5057976,32.1054618 L10.5,32.2489 L10.5,33 C10.5,35.7444 11.8602,37.8081 14.2202,39.2448 C16.6297,40.7117 20.0677,41.5 24,41.5 C27.9323,41.5 31.3703,40.7117 33.7798,39.2448 C36.0555143,37.8594107 37.4015676,35.8910074 37.4948116,33.2914406 L37.5,33 L37.5,32.2488 C37.5,31.331195 36.7934328,30.5787475 35.8937801,30.5057968 L35.7502,30.5 Z M24,4 C29.5228,4 34,8.47715 34,14 C34,19.5228 29.5228,24 24,24 C18.4772,24 14,19.5228 14,14 C14,8.47715 18.4772,4 24,4 Z M24,6.5 C19.8579,6.5 16.5,9.85786 16.5,14 C16.5,18.1421 19.8579,21.5 24,21.5 C28.1421,21.5 31.5,18.1421 31.5,14 C31.5,9.85786 28.1421,6.5 24,6.5 Z';
const R = 25;
const H = 200 - 40 - 2 * R;
const W = 300 - 2 * R;
const W_2 = 300 / 2 - 4 * R;
const S = 200 - 2 * R;
const arc = (x, y, reverse = false) =>
  `a ${R} ${R} 0 0 ${reverse ? '0' : '1'} ${x} ${y}`;
const d = [
  `M 0 ${R}`,
  arc(R, -R),
  `h ${(3 * (width - 20)) / 5 - 3 * R}`,
  arc(R, R),
  `v 70`,
  arc(-R, R),
  `h ${-(width - 20) / 5 + 2.5 * R}`,
  arc(-R, R / 2, true),
  `v 40`,
  arc(-R, R / 2),
  `h -25`,
  arc(-R, -R / 2),
  `v -40`,
  arc(-R, -R / 2, true),
  `h -10`,
  arc(-R, -R),
  'Z',
].join(' ');
const COLOR = '#02CBD6';
const END_COLOR = '#00B4D4';
const Reflectly_Tabbar = () => {
  const rotateSvg = useSharedValue(0);
  const SvgAnimated = Animated.createAnimatedComponent(Svg);
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const plusPressable = () => {
    rotateSvg.value = withTiming(rotateSvg.value === 0 ? 1 : 0, {
      duration: 500,
    });
  };
  const rotateAnimated = useAnimatedProps(() => {
    return {
      transform: [
        {rotate: `${interpolate(rotateSvg.value, [0, 1], [0, 45])}deg`},
      ],
    };
  });
  const rectAnimated = useAnimatedProps(() => {
    return {
      r: interpolate(rotateSvg.value, [0, 1], [0, 200]),
    };
  });
  const viewAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: interpolate(rotateSvg.value, [0, 1], [50, 10])}],
      opacity: interpolate(rotateSvg.value, [0, 1], [0, 1]),
    };
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'hsl(0,0%,90%)',
      }}>
      {/*Bottom */}
      <View
        style={{
          width: width,
          height: 70,
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Svg
            width={(width - 20) / 5}
            height={70}
            viewBox={`${-(width - 20) / 10 + 5} -5 100 50`}>
            <Path d={homeSvg} fill="hsl(0,0%,73%)" />
          </Svg>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Svg
            width={(width - 20) / 5}
            height={70}
            viewBox={`${-(width - 20) / 10 - 10} 1 150 50`}>
            <Path d={lineSvg} fill="hsl(0,0%,73%)" />
          </Svg>
        </View>

        <Pressable
          onPress={plusPressable}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'hsl(186,94%,41%)',
            borderRadius: 20,
          }}>
          <View
            style={{
              position: 'absolute',
            }}>
            <Svg width={200} height={300}>
              <Defs>
                <LinearGradient
                  id="gradient"
                  x1={200 / 2}
                  y1={0}
                  x2={200 / 2}
                  y2={200}
                  gradientUnits="userSpaceOnUse">
                  <Stop offset={0} stopColor={END_COLOR} />
                  <Stop offset={1} stopColor={COLOR} />
                </LinearGradient>
                <Mask
                  id="Mask"
                  maskUnits="userSpaceOnUse"
                  x={0}
                  y={0}
                  width={300}
                  height={500}>
                  <AnimatedCircle
                    animatedProps={rectAnimated}
                    cx={(width - 20) / 5 + R}
                    cy={160}
                    fill="white"
                    // r={200}
                  />
                </Mask>
              </Defs>
              {/* <Path d={d} mask="url(#mask)" fill={'none'} /> */}
              <Path d={d} mask="url(#Mask)" fill="url(#gradient)" />
            </Svg>
            <Animated.View
              style={[
                {
                  position: 'absolute',
                },
                viewAnimatedStyle,
              ]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 180,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                  }}>
                  Mood check-in
                </Text>
                <Feather name="check-square" color={'white'} size={20} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 180,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                  }}>
                  Voice note
                </Text>
                <MaterialIcons
                  name="keyboard-voice"
                  color={'white'}
                  size={20}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 180,
                  paddingHorizontal: 10,
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'white',
                  }}>
                  Add photo
                </Text>
                <Foundation name="photo" color={'white'} size={20} />
              </View>
            </Animated.View>
          </View>
          <SvgAnimated
            animatedProps={rotateAnimated}
            width={(width - 20) / 5}
            height={70}
            viewBox={`${-(width - 20) / 10 - 10} 0 150 50`}>
            <Path d={plusSvg} fill="white" />
          </SvgAnimated>
        </Pressable>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Svg
            width={(width - 20) / 5}
            height={70}
            viewBox={`${-(width - 20) / 10 + 5} -5 100 50`}>
            <Path d={pencilSvg} fill="hsl(0,0%,73%)" />
          </Svg>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Svg
            width={(width - 20) / 5}
            height={70}
            viewBox={`${-(width - 20) / 10 + 10} 0 100 50`}>
            <Path d={personSvg} fill="hsl(0,0%,73%)" />
          </Svg>
        </View>
      </View>
    </View>
  );
};

export default Reflectly_Tabbar;
