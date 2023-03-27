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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width, height: HEIGHT_SCREEN} = Dimensions.get('window');
const Copilot = () => {
  const onPress = () => {
    setOpenModal(!openModal);
    console.log(listLayout);
  };
  const [openModal, setOpenModal] = useState(false);
  const [listLayout, setListLayout] = useState([]);
  const [currentState, setCurrentState] = useState(0);
  const [layoutBottom, setLayoutBottom] = useState(0);
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
  const onSkip = () => {
    setCurrentState(listLayout.length - 1);

    frameHeight.value = listLayout[listLayout.length - 1].height;
    frameWidth.value = listLayout[listLayout.length - 1].width;
    frameX.value = listLayout[listLayout.length - 1].x;
    frameY.value = listLayout[listLayout.length - 1].y;
  };
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
                    width={frameWidth.value + 20}
                    height={frameHeight.value + 10}
                  />
                  <Rect x={0} y={0} width={width} height={HEIGHT_SCREEN} />
                </AnimatedClip>

                <Rect
                  width={width}
                  height={HEIGHT_SCREEN}
                  fill={'rgba(0,0,0,0.2)'}
                  clipPath={'url(#rectPath)'}
                  fillRule="evenodd"
                />
                {listLayout[currentState].y > HEIGHT_SCREEN - 200 ? (
                  <Path
                    d={`M ${listLayout[currentState].x} ${
                      listLayout[currentState].y - 20
                    } l 5 12 l 5 -12 z`}
                    fill={'white'}
                  />
                ) : (
                  <Path
                    d={`M ${listLayout[currentState].x} ${
                      listLayout[currentState].y -
                      20 +
                      listLayout[currentState].height +
                      40
                    } l 5 -12 l 5 12 z`}
                    fill={'white'}
                  />
                )}
              </Svg>
              {listLayout[currentState].y < HEIGHT_SCREEN - 200 ? (
                <View
                  style={{
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    width: listLayout[currentState].width,
                    height: 150,
                    backgroundColor: 'white',
                    top:
                      listLayout[currentState].y +
                      listLayout[currentState].height +
                      20,

                    left: listLayout[currentState].x - 10,
                    position: 'absolute',
                    minWidth: 150,
                    transform: [
                      {
                        translateX:
                          listLayout[currentState].width < 150 &&
                          listLayout[currentState].x > width - 150
                            ? -120
                            : listLayout[currentState].x - 150 < 0
                            ? 0
                            : -listLayout[currentState].width,
                      },
                    ],
                  }}>
                  <Text
                    adjustsFontSizeToFit
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
                      height: 50,

                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      zIndex: 999,
                    }}>
                    <Pressable
                      onPress={onSkip}
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
              ) : (
                <View
                  style={{
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    width: listLayout[currentState].width,
                    height: 150,
                    backgroundColor: 'white',
                    top:
                      listLayout[currentState].y -
                      listLayout[currentState].height -
                      150 +
                      11,
                    left: listLayout[currentState].x - 10,
                    position: 'absolute',
                    minWidth: 150,
                    transform: [
                      {
                        translateX:
                          listLayout[currentState].width < 150 &&
                          listLayout[currentState].x > width - 150
                            ? -120
                            : listLayout[currentState].x - 150 < 0
                            ? 0
                            : -listLayout[currentState].width,
                      },
                    ],
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 18,
                    }}
                    adjustsFontSizeToFit>
                    Hey! This is the first step
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                      alignContent: 'space-between',
                      height: 50,
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      zIndex: 999,
                    }}>
                    <Pressable
                      onPress={onSkip}
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
              )}
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
          uri: 'https://github.gallerycdn.vsassets.io/extensions/github/copilot-nightly/1.78.10293/1679622408396/Microsoft.VisualStudio.Services.Icons.Default',
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingVertical: 10,
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
        onLayout={e => console.log(e.nativeEvent.layout)}>
        {['user-circle-o', 'gamepad', 'film', 'cog', 'lock'].map(
          (item, index) => {
            return (
              <Pressable
                key={index}
                onLayout={e => {
                  let height = e.nativeEvent.layout.height;
                  let width = e.nativeEvent.layout.width;
                  let x = e.nativeEvent.layout.x;
                  let y = -e.nativeEvent.layout.y + HEIGHT_SCREEN - 32.5;
                  console.log('key', HEIGHT_SCREEN, {height, width, x, y});
                  setListLayout([...listLayout, {height, width, x, y}]);
                }}>
                <FontAwesome name={item} size={30} />
              </Pressable>
            );
          },
        )}
      </View>
    </View>
  );
};

export default Copilot;
