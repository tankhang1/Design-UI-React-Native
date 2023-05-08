import {View, Text, Dimensions, Pressable} from 'react-native';
import React, {useState} from 'react';
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
  BackdropBlur,
  Text as TextSkia,
} from '@shopify/react-native-skia';
const {width: WIDTH_SCREEN, height: HEIGHT_SCREEN} = Dimensions.get('screen');
const SCREEN_LIST = [
  {
    name: 'Car',
    path: 'M7 5H17L22 11.5V19H19L18 17H6L5 19H2V11.5L7 5Z M17 15H7L6 17H18L17 15ZM2 9H4L6 12H18L20 9H22',
  },
  {
    name: 'Charging',
    path: 'M14.7051 23.1309C14.7051 23.5508 15.0371 23.8633 15.4863 23.8633H21.2578L18.2305 31.9395C17.8105 33.043 18.9629 33.6289 19.6953 32.7305L29.002 21.3047C29.1875 21.0703 29.2852 20.8555 29.2852 20.6211C29.2852 20.1914 28.9531 19.8789 28.5039 19.8789H22.7324L25.7598 11.8125C26.1797 10.6992 25.0273 10.1133 24.2949 11.0117L14.9883 22.4473C14.8027 22.6719 14.7051 22.8867 14.7051 23.1309Z',
  },
  {
    name: 'Plus',
    path: 'M0.628906 15.3086C0.628906 16.5566 1.66602 17.5762 2.89648 17.5762H13.2324V27.9121C13.2324 29.1602 14.252 30.1797 15.5 30.1797C16.748 30.1797 17.7676 29.1602 17.7676 27.9121V17.5762H28.1035C29.3516 17.5762 30.3711 16.5566 30.3711 15.3086C30.3711 14.0605 29.3516 13.041 28.1035 13.041H17.7676V2.70508C17.7676 1.47461 16.748 0.4375 15.5 0.4375C14.252 0.4375 13.2324 1.47461 13.2324 2.70508V13.041H2.89648C1.66602 13.041 0.628906 14.0605 0.628906 15.3086Z',
  },
  {
    name: 'Location',
    path: 'M17.4609 14.499C17.4609 16.3896 18.7393 17.9688 20.4902 18.4092V25.209C20.4902 28.3779 21.0596 30.1074 21.4893 30.1074C21.9297 30.1074 22.4883 28.3887 22.4883 25.209V18.4092C24.2393 17.9795 25.5283 16.3896 25.5283 14.499C25.5283 12.2754 23.7344 10.4492 21.4893 10.4492C19.2549 10.4492 17.4609 12.2754 17.4609 14.499ZM20.3398 14.7246C19.6094 14.7246 18.9648 14.0801 18.9648 13.3281C18.9648 12.5869 19.6094 11.9531 20.3398 11.9531C21.1025 11.9531 21.7256 12.5869 21.7256 13.3281C21.7256 14.0801 21.1025 14.7246 20.3398 14.7246ZM21.5 34.0391C27.9775 34.0391 31.6943 31.8047 31.6943 29.4414C31.6943 26.6055 27.1934 24.876 24.2393 24.8438V26.4121C26.3125 26.4443 29.5244 27.5723 29.5244 29.1836C29.5244 31.0312 26.1191 32.3418 21.5 32.3418C16.8594 32.3418 13.4756 31.0527 13.4756 29.1836C13.4756 27.5723 16.6768 26.4443 18.75 26.4121V24.8438C15.7959 24.876 11.2949 26.6055 11.2949 29.4414C11.2949 31.8047 15.0225 34.0391 21.5 34.0391Z',
  },
  {
    name: 'Info',
    path: 'M22 22.1367C24.2988 22.1367 26.2969 20.0742 26.2969 17.3887C26.2969 14.7354 24.2988 12.7695 22 12.7695C19.7012 12.7695 17.7031 14.7783 17.7031 17.4102C17.7031 20.0742 19.6904 22.1367 22 22.1367ZM14.792 32.084H29.1973C30.3467 32.084 31.0342 31.5469 31.0342 30.6553C31.0342 27.8838 27.5645 24.0596 21.9893 24.0596C16.4248 24.0596 12.9551 27.8838 12.9551 30.6553C12.9551 31.5469 13.6426 32.084 14.792 32.084Z',
  },
];
const CustomTabBar = ({state, navigation}) => {
  const [currentTab, setCurrentTab] = useState(1);
  const onPressHandler = (item, index) => {
    //console.log(index);
    navigation.navigate(item.name);
    setCurrentTab(index);
  };
  return (
    <View
      style={{
        width: WIDTH_SCREEN,
        height: HEIGHT_SCREEN * 0.08,
        backgroundColor: '#131313',
      }}>
      <Canvas
        style={{
          width: WIDTH_SCREEN,
          height: HEIGHT_SCREEN * 0.08,
          position: 'absolute',
          bottom: 0,
        }}>
        <Box
          box={rrect(rect(0, 0, WIDTH_SCREEN, HEIGHT_SCREEN * 0.08), 0, 0)}
          color="rgba(0, 0, 0, 0.5)">
          <LinearGradient
            start={vec(WIDTH_SCREEN / 2, 0)}
            end={vec(WIDTH_SCREEN / 2, HEIGHT_SCREEN * 0.1)}
            colors={['#1e1e1e', '#131313']}
          />
        </Box>
        <Path
          path={
            'M0 30L16.3492 12.94C24.2708 4.67391 35.2237 0 46.6727 0H124.328C132.903 0 141.273 2.62492 148.313 7.52198L169.302 22.1232C184.749 32.8689 205.251 32.8689 220.698 22.1232L241.687 7.52198C248.727 2.62491 257.097 0 265.672 0H343.327C354.776 0 365.729 4.67391 373.651 12.94L390 30V78H0V30Z'
          }
          transform={[{translateX: 1}, {translateY: 15}]}
          color="#00000099"
        />
        <Path
          path={
            'M0 30L16.3492 12.94C24.2708 4.67391 35.2237 0 46.6727 0H124.328C132.903 0 141.273 2.62492 148.313 7.52198L169.302 22.1232C184.749 32.8689 205.251 32.8689 220.698 22.1232L241.687 7.52198C248.727 2.62491 257.097 0 265.672 0H343.327C354.776 0 365.729 4.67391 373.651 12.94L390 30V78H0V30Z'
          }
          transform={[{translateX: 1}, {translateY: 15}]}
          style="stroke"
          color="#2e3033"
          strokeWidth={1.5}
        />
      </Canvas>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: WIDTH_SCREEN,
          //borderWidth: 1,
          //borderColor: '#fff',
          paddingTop: 10,
        }}>
        {SCREEN_LIST.map((item, index) => {
          if (index !== 2)
            return (
              <Pressable
                key={index}
                style={{
                  height: HEIGHT_SCREEN * 0.08,
                  flex: 1,
                  //borderWidth: 1,
                  //borderColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => onPressHandler(item, index)}>
                {currentTab === index ? (
                  <Canvas
                    style={{
                      //flex: 1,
                      height: HEIGHT_SCREEN * 0.08,
                      width: WIDTH_SCREEN / 5,
                      //borderWidth: 1,
                      //borderColor: '#fff',
                      //paddingHorizontal: 20,
                    }}>
                    <Box
                      box={rrect(
                        rect(
                          18,
                          18,
                          WIDTH_SCREEN / 5 - 30,
                          WIDTH_SCREEN / 5 - 30,
                        ),
                        WIDTH_SCREEN / 5,
                        WIDTH_SCREEN / 5,
                      )}>
                      <LinearGradient
                        start={vec((WIDTH_SCREEN / 5 - 30) / 2, 0)}
                        end={vec(
                          (WIDTH_SCREEN / 5 - 30) / 2,
                          WIDTH_SCREEN / 5 - 30,
                        )}
                        colors={['#2FB8FF', '#9EECD9']}
                        positions={[0.6, 1]}
                      />
                      <Blur blur={15} />
                    </Box>
                    <Path
                      path={item.path}
                      color="#fff"
                      transform={[
                        {translateX: 20},
                        {translateY: index === 0 ? 30 : 20},
                      ]}>
                      <LinearGradient
                        start={vec(44 / 2, 0)}
                        end={vec(44 / 2, 44)}
                        colors={['#2FB8FF', '#9EECD9']}
                        positions={[0.2, 1]}
                      />
                    </Path>
                  </Canvas>
                ) : (
                  <Canvas
                    style={{
                      //flex: 1,
                      height: HEIGHT_SCREEN * 0.08,
                      width: WIDTH_SCREEN / 5,
                    }}>
                    <Path
                      path={item.path}
                      color="#fff"
                      transform={[
                        {translateX: 20},
                        {translateY: index === 0 ? 30 : 20},
                      ]}></Path>
                  </Canvas>
                )}
              </Pressable>
            );
          if (index === 2)
            return (
              <Pressable
                key={index}
                style={{
                  height: HEIGHT_SCREEN * 0.1,
                  flex: 1,
                  //borderWidth: 1,
                  //borderColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: -100,
                }}>
                <Canvas
                  style={{
                    //flex: 1,
                    height: HEIGHT_SCREEN * 0.1,
                    width: WIDTH_SCREEN / 5,
                  }}>
                  <Box
                    box={rrect(
                      rect(0, 0, WIDTH_SCREEN / 5, WIDTH_SCREEN / 5),
                      WIDTH_SCREEN / 5,
                      WIDTH_SCREEN / 5,
                    )}
                    style="stroke"
                    color="#2e3033"
                    strokeWidth={2}></Box>
                  <Box
                    box={rrect(
                      rect(0, 0, WIDTH_SCREEN / 5, WIDTH_SCREEN / 5),
                      WIDTH_SCREEN / 5,
                      WIDTH_SCREEN / 5,
                    )}
                    //color="rgba(36,38,46,0.44)"
                    color="#2d2f32">
                    {/* <BackdropBlur
                      blur={4}
                      clip={rrect(
                        rect(0, 0, WIDTH_SCREEN / 5, WIDTH_SCREEN / 5),
                        WIDTH_SCREEN / 5,
                        WIDTH_SCREEN / 5,
                      )}>
                      <Fill color="rgba(0, 0, 0, 0.5)" />
                    </BackdropBlur> */}
                    <BoxShadow
                      dx={0}
                      dy={3}
                      blur={1}
                      color="hsl(0,0%,30%)"
                      inner
                    />
                  </Box>
                  <Path
                    path={item.path}
                    transform={[{translateX: 24}, {translateY: 25}]}>
                    <LinearGradient
                      start={vec(39 / 2, 0)}
                      end={vec(39 / 2, 43)}
                      colors={['#2FB8FF', '#9EECD9']}
                      //positions={[0.6, 1]}
                    />
                  </Path>
                </Canvas>
              </Pressable>
            );
        })}
      </View>
    </View>
  );
};

export default CustomTabBar;
