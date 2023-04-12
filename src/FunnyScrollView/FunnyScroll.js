import {View, Text, Switch, SectionList, Dimensions} from 'react-native';
import React from 'react';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureHandlerRootView,
  PanGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';
import {useRef} from 'react';
import {useState} from 'react';

const dateTime = [
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
  {
    hour: Math.floor(Math.random() * 24),
    minute: Math.floor(Math.random() * 60),
    date: 'T.4 12 Th4',
  },
];
const dataTime_1 = [
  {
    title: 'Tomorrow',
    data: [
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
    ],
  },
  {
    title: 'Today',
    data: [
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
      {
        hour: Math.floor(Math.random() * 24),
        minute: Math.floor(Math.random() * 60),
        date: 'T.4 12 Th4',
      },
    ],
  },
];

const SectionListAnimated = Animated.createAnimatedComponent(SectionList);
const {height: HEIGHT_WD} = Dimensions.get('window');
const FunnyScroll = () => {
  const scrollTranslateY = useSharedValue(0);
  const tmpScroll = useSharedValue(0);
  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(scrollTranslateY.value, [0, 300], [300, 0]),
      opacity: interpolate(scrollTranslateY.value, [0, 300], [1, 0]),
    };
  });
  const [enableScroll, setEnableScroll] = useState(true);
  const panHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.tmp = scrollTranslateY.value;
    },
    onActive: (e, ctx) => {
      console.log(-e.translationY + ctx.tmp);
      if (-e.translationY + ctx.tmp <= 200 && -e.translationY + ctx.tmp >= 0) {
        scrollTranslateY.value = -e.translationY + ctx.tmp;
      } else if (-e.translationY + ctx.tmp > 200) {
        scrollTranslateY.value = withTiming(300);
      }
    },
  });
  const changeEnable = value => {
    if (value === 300) {
      setEnableScroll(true);
    } else {
      setEnableScroll(false);
    }
  };
  useDerivedValue(() => {
    runOnJS(changeEnable)(scrollTranslateY.value);
  });
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      {/*Header */}
      <Animated.View
        style={[
          {
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          },
          headerStyle,
        ]}>
        <Text
          style={{
            fontSize: 28,
            width: '60%',
            alignSelf: 'center',
            fontWeight: '600',
            color: 'black',
            textAlign: 'center',
          }}>
          Tất cả chuông báo đều tắt
        </Text>
      </Animated.View>
      {/* <ScrollView
        showsVerticalScrollIndicator
        stickyHeaderIndices={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        stickyHeaderHiddenOnScroll={true}>
        {dataTime.map((data, index) => {
          return (
            <View
              key={index}
              style={{
                marginHorizontal: 10,
                paddingVertical: 20,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderWidth: 1,
                marginVertical: 10,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 20,
                  fontWeight: '400',
                }}>
                {data.hour >= 10 ? `${data.hour} ` : `0${data.hour} `}:
                {data.minute >= 10 ? ` ${data.minute}` : ` 0${data.minute}`}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '40%',
                }}>
                <Text>{data.date}</Text>
                <Switch />
              </View>
            </View>
          );
        })}
      </ScrollView> */}

      {/* <PanGestureHandler activeOffsetY={[-10, 10]} onGestureEvent={}> */}
      {/* <PanGestureHandler>
        <Animated.View> */}
      <PanGestureHandler onGestureEvent={panHandler}>
        <Animated.View>
          <ScrollView
            showsVerticalScrollIndicator
            scrollEnabled={enableScroll}
            onScrollBeginDrag={e => {
              console.log(e.nativeEvent.contentInset.top);
              if (
                e.nativeEvent.contentOffset.y === 0 &&
                scrollTranslateY.value === 300
              ) {
                scrollTranslateY.value = withTiming(0, {duration: 1000});
              }
            }}
            stickyHeaderHiddenOnScroll={true}>
            {dateTime.map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    marginHorizontal: 10,
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderWidth: 1,
                    marginVertical: 10,
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color: 'grey',
                      fontSize: 20,
                      fontWeight: '400',
                    }}>
                    {data.hour >= 10 ? `${data.hour} ` : `0${data.hour} `}:
                    {data.minute >= 10 ? ` ${data.minute}` : ` 0${data.minute}`}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '40%',
                    }}>
                    <Text>{data.date}</Text>
                    <Switch />
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </PanGestureHandler>

      {/* </PanGestureHandler> */}
    </GestureHandlerRootView>
  );
};

export default FunnyScroll;
