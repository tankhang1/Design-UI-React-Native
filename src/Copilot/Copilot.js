import {
  View,
  Text,
  Image,
  Button,
  Modal,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ClipPath, Defs, G, Mask, Path, Rect, Svg} from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {transform} from '@babel/core';
const {width, height} = Dimensions.get('screen');
const Copilot = () => {
  const onPress = () => {
    setOpenModal(!openModal);
    console.log(listLayout);
  };
  const [openModal, setOpenModal] = useState(false);
  const [listLayout, setListLayout] = useState([]);
  const [currentState, setCurrentState] = useState(0);
  const frameWidth = useSharedValue(0);
  const frameHeight = useSharedValue(0);
  const frameX = useSharedValue(0);
  const frameY = useSharedValue(0);
  const onNext = () => {
    if (currentState < listLayout.length - 1) {
      let increase = currentState + 1;
      setCurrentState(increase);

      frameHeight.value = listLayout[increase].height;
      frameWidth.value = listLayout[increase].width;
      frameX.value = listLayout[increase].x;
      frameY.value = listLayout[increase].y;
      // frameHeight.value = withTiming(listLayout[increase].height);
      // frameWidth.value = withTiming(listLayout[increase].width);
      // frameX.value = withTiming(listLayout[increase].x);
      // frameY.value = withTiming(listLayout[increase].y);
      // frameX.value = withTiming(listLayout[increase].x);
      // frameY.value = withTiming(300);

      // frameX.value = withTiming(20);
      // frameY.value = withTiming(50);
    }
  };
  const AnimatedRect = Animated.createAnimatedComponent(Rect);
  const AnimatedClip = Animated.createAnimatedComponent(ClipPath);
  const AnimatedDefs = Animated.createAnimatedComponent(Defs);
  const animatedRectProps = useAnimatedProps(() => {
    return {
      // transform: [{translateX: frameX.value}, {translateY: frameY.value}],
      x: frameX.value,
      y: frameY.value,
      width: frameWidth.value,
      height: frameHeight.value,
    };
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 10,
      }}>
      <Modal
        transparent
        visible={openModal}
        onRequestClose={() => setOpenModal(!openModal)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}>
          {listLayout && frameHeight.value > 0 && (
            <>
              <Svg>
                <AnimatedClip id="rectPath">
                  <AnimatedRect
                    x={frameX.value - 10}
                    y={frameY.value - 5}
                    // x={listLayout[0].x - 10}
                    // y={listLayout[0].y - 5}
                    width={frameWidth.value + 20}
                    height={frameHeight.value + 10}
                    // animatedProps={animatedRectProps}
                  />
                  {/* <Path
                      d={`M ${frameX.value - 10} ${frameY.value - 5} h ${
                        frameWidth.value + 20
                      } v${frameHeight.value + 10} h${
                        -frameWidth.value - 20
                      } z`}
                    /> */}
                  <Rect x={0} y={0} width={width} height={height} />
                </AnimatedClip>

                <Rect
                  width={width}
                  height={height}
                  fill={'rgba(0,0,0,0.2)'}
                  clipPath={'url(#rectPath)'}
                  fillRule="evenodd"
                />

                <Path
                  d={`M ${listLayout[currentState].x} ${
                    listLayout[currentState].y +
                    listLayout[currentState].height +
                    20
                  } l 10 -6 l 10 6 z`}
                  fill={'white'}
                />
              </Svg>

              <View
                style={{
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  width: listLayout[currentState].width,
                  backgroundColor: 'white',
                  top:
                    listLayout[currentState].y +
                    listLayout[currentState].height +
                    20,
                  left: listLayout[currentState].x - 10,
                  position: 'absolute',
                }}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                  }}>
                  Hey! This is the first step
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginVertical: 10,
                  }}>
                  <Pressable
                    style={{
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'green'}}>Skip</Text>
                  </Pressable>
                  <Pressable
                    onPress={onNext}
                    style={{
                      width: 60,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{color: 'green'}}>Next</Text>
                  </Pressable>
                </View>
              </View>
            </>
          )}
        </View>
      </Modal>
      <Text
        onLayout={e => {
          setListLayout([...listLayout, e.nativeEvent.layout]);
          frameHeight.value = e.nativeEvent.layout.height;
          frameWidth.value = e.nativeEvent.layout.width;
          frameX.value = e.nativeEvent.layout.x;
          frameY.value = e.nativeEvent.layout.y;
        }}
        style={{
          fontSize: 28,
          color: 'black',
          width: '70%',
          alignSelf: 'center',
        }}>
        Welcome to the demo of "React Native Pilot"
      </Text>
      <Image
        onLayout={e => setListLayout([...listLayout, e.nativeEvent.layout])}
        source={{
          uri: 'https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/333256948_758694515709613_5812778938808615305_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=0debeb&_nc_ohc=FuwlJ__kxDIAX-T8Z-8&_nc_ht=scontent.fsgn5-12.fna&oh=00_AfB7Zyk3bSYUAE59Hky3SrJUwV92opTM_8C_NNGuarXL4A&oe=642083EE',
        }}
        style={{
          width: 200,
          height: 200,
          borderRadius: 100,
          alignSelf: 'center',
          marginVertical: 20,
        }}
      />
      <Button title="START THE TUTORIAL" onPress={onPress} />
    </View>
  );
};

export default Copilot;
