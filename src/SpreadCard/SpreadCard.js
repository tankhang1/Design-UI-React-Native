import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const SpreadCard = () => {
  const colors = [
    ['#bd604f', '#d3949a', '#c8a8b9'],
    ['#c25e6f', '#dd91b8', '#cc9fcf'],
    ['#b26df7', '#cfa1fa', '#d2b6fb'],
    ['#6b7af5', '#90aeff', '#9dbdf9'],
    ['#5d75a1', '#adc8ec', '#bcd3f5'],
    ['#010001', '#2f3041', '#5e607e'],
  ];
  const [backgroundColor, setBackGroundColor] = useState('hsl(208,65%,10%)');
  const rotateValue = useSharedValue(0);

  const panHandler = useAnimatedGestureHandler({
    onStart: (e, ctx) => {
      ctx.currentValue = 0;
    },
    onActive: (e, ctx) => {
      rotateValue.value = ctx.currentValue + e.translationY;
    },
    onEnd: (e, ctx) => {
      if (rotateValue.value > 0) rotateValue.value = withSpring(110);
      if (rotateValue.value < 0) rotateValue.value = withSpring(0);
    },
  });
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: backgroundColor,
        }}>
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View
            style={{margin: 40, position: 'absolute', bottom: 280}}>
            {colors.map((color, index) => {
              const cardAnimatedStyle = useAnimatedStyle(() => {
                const angle = (rotateValue.value / colors.length) * index;
                return {
                  transform: [
                    {translateY: (250 - 25 - 24) / 2},
                    {rotate: `${angle}deg`},
                    {translateY: -(250 - 25 - 24) / 2},
                  ],
                };
              });
              return (
                <Animated.View
                  key={index}
                  style={[
                    {
                      backgroundColor: 'white',
                      width: 70,
                      height: 250,
                      borderRadius: 20,
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      flexDirection: 'column',
                      position: 'absolute',
                    },
                    cardAnimatedStyle,
                  ]}>
                  <View>
                    {color.map((c, i) => (
                      <Pressable
                        onPress={() => setBackGroundColor(c)}
                        key={i}
                        style={{
                          width: 65,
                          height: 60,
                          borderRadius: 10,
                          borderTopLeftRadius: i === 0 ? 25 : 10,
                          borderTopRightRadius: i === 0 ? 25 : 10,
                          backgroundColor: c,
                          marginVertical: 2,
                        }}
                      />
                    ))}
                  </View>
                  <Pressable
                    onPress={() => {
                      if (rotateValue.value === 110)
                        rotateValue.value = withSpring(0);
                      else rotateValue.value = withSpring(110);
                    }}
                    style={{
                      width: 25,
                      height: 25,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 100,
                      marginVertical: 12,
                    }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 100,
                        backgroundColor: 'black',
                      }}
                    />
                  </Pressable>
                </Animated.View>
              );
            })}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

export default SpreadCard;
