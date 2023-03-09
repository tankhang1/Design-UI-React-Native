import {
  View,
  Text,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Message from './Message';
import {DataMessage, RandomDataMessage} from './DataMessage';
import Keyboard from './Keyboard';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Lottie from 'lottie-react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const {width, height} = Dimensions.get('screen');

const Drag_Drop_V1 = () => {
  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  const [randomMessage, setRandomMessage] = useState(
    shuffle(RandomDataMessage),
  );
  const locationButtonX = RandomDataMessage.map(() => useSharedValue(0));
  const locationButtonY = RandomDataMessage.map(() => useSharedValue(0));
  const buttonAnimatedStyle = RandomDataMessage.map((_, index) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {translateX: locationButtonX[index].value},
          {translateY: locationButtonY[index].value},
        ],
      };
    }),
  );
  const [layoutView_1, setLayoutView_1] = useState(null);
  const [layoutView_2, setLayoutView_2] = useState(null);
  const listWidth = RandomDataMessage.map(() => useSharedValue(0));
  const listSentence = useSharedValue([]);
  const listTouch = useSharedValue([]);
  const numberRow = useSharedValue(0);
  const sentences = useRef([]);

  const [openModal, setOpenModal] = useState(false);

  const refreshPress = () => {
    RandomDataMessage.map((_, index) => {
      locationButtonX[index].value = withTiming(0);
      locationButtonY[index].value = withTiming(0);
    });
    listSentence.value = [];
    listTouch.value = [];
    numberRow.value = 0;
    sentences.current = [];
  };
  const reSort = () => {};
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <Modal
        visible={openModal}
        animationType="fade"
        transparent
        onRequestClose={() => {
          setOpenModal(!openModal);
          refreshPress();
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(186,186,186,0.8)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '80%',
              backgroundColor: 'white',
              height: 250,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {[...sentences.current.map(value => value.message)].join(' ') ===
            DataMessage ? (
              <Lottie
                source={{
                  uri: 'https://assets7.lottiefiles.com/packages/lf20_xcz6wutt.json',
                }}
                loop
                autoPlay
              />
            ) : (
              <Lottie
                source={{
                  uri: 'https://assets9.lottiefiles.com/packages/lf20_78nlkhud.json',
                }}
                loop
                autoPlay
              />
            )}
          </View>
        </View>
      </Modal>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white',
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}>
        {/*Header*/}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Feather name="x" size={30} color="hsl(0,0%,60%)" />
          <View
            style={{
              width: '75%',
              height: 15,
              borderRadius: 20,
              backgroundColor: 'hsl(0,0%,90%)',
            }}>
            <View
              style={{
                width: '20%',
                height: 15,
                backgroundColor: 'hsl(99,85%,50%)',
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '50%',
                  height: 5,
                  backgroundColor: 'hsl(0,0%,98%)',
                  opacity: 0.3,
                  borderRadius: 20,
                }}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '12%',
            }}>
            <Ionicons name="heart" size={30} color="red" />
            <Text
              style={{
                color: 'red',
                fontWeight: '600',
              }}>
              5
            </Text>
          </View>
        </View>
        {/*Txt */}
        <Text
          style={{
            fontSize: 18,
            color: 'black',
            fontWeight: '600',
            marginVertical: 15,
          }}>
          Translate this sentence
        </Text>
        {/*Image and message */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <Image
            source={require('./Images/character.png')}
            style={{
              width: (2 * width) / 4,
              height: 250,
              resizeMode: 'cover',
            }}
          />
          <Message />
        </View>
        {/*Drag and Drop */}
        <View
          onLayout={e =>
            setLayoutView_1({
              x: e.nativeEvent.layout.x,
              y: e.nativeEvent.layout.y,
              width: e.nativeEvent.layout.height,
              height: e.nativeEvent.layout.width,
            })
          }>
          <View
            style={{
              borderBottomWidth: 1,
              height: 40,
              borderColor: 'hsl(0,0%,80%)',
              marginBottom: 10,
            }}></View>
          <View
            style={{
              borderBottomWidth: 1,
              height: 40,
              borderColor: 'hsl(0,0%,80%)',
              marginBottom: 10,
            }}></View>
          <View
            style={{
              borderBottomWidth: 1,
              height: 40,
              borderColor: 'hsl(0,0%,80%)',
            }}></View>
        </View>

        {/*Button Options */}
        <View
          style={{
            flexWrap: 'wrap',
            flex: 1,
            flexDirection: 'row',
            marginVertical: 30,
          }}
          onLayout={e =>
            setLayoutView_2({
              x: e.nativeEvent.layout.x,
              y: e.nativeEvent.layout.y,
              width: e.nativeEvent.layout.height,
              height: e.nativeEvent.layout.width,
            })
          }>
          {randomMessage.length !== 0 &&
            randomMessage.map((message, index) => {
              const tapHandler = useAnimatedGestureHandler({
                onEnd: (e, ctx) => {
                  if (layoutView_1 && layoutView_2 && listWidth) {
                    let listIndex = listSentence.value.map(item => item.index);
                    if (listIndex.includes(index)) {
                      let elementRemove =
                        listSentence.value[listIndex.indexOf(index)];
                      if (listSentence.value.length !== 1) {
                        listTouch.value = listTouch.value.filter(
                          value => value !== index,
                        );

                        listSentence.value = listSentence.value.filter(
                          value => {
                            if (value.index !== index) {
                              return value;
                            }
                          },
                        );

                        locationButtonX[index].value = withTiming(0);
                        locationButtonY[index].value = withTiming(0);
                      } else {
                        listTouch.value = [];
                        listSentence.value = [];
                        numberRow.value = 0;
                        locationButtonX[index].value = withTiming(0);
                        locationButtonY[index].value = withTiming(0);
                      }
                      console.log(elementRemove);
                      listSentence.value = listSentence.value.map(
                        (tmpItem, tmpIndex) => {
                          let obj = {...tmpItem};
                          if (tmpItem.currIndex >= elementRemove.currIndex) {
                            if (elementRemove.row === obj.row) {
                              locationButtonX[tmpItem.index].value = withTiming(
                                locationButtonX[tmpItem.index].value -
                                  listWidth[elementRemove.index].value.width -
                                  5,
                              );
                            }

                            console.log('pre', obj);
                            obj.currIndex -= 1;
                            console.log('after', obj);
                          }
                          console.log('done', obj);
                          return obj;
                        },
                      );
                      console.log('finish', listSentence.value);
                    } else {
                      let sumWidth = listTouch.value.reduce(
                        (acc, curr, index) => {
                          if (index === 0)
                            return acc + listWidth[curr].value.width;
                          else return acc + listWidth[curr].value.width + 5;
                        },
                        0,
                      );

                      let offsetY =
                        layoutView_1.y -
                        listWidth[index].value.y -
                        layoutView_2.y +
                        numberRow.value * 50;
                      let offsetX =
                        listTouch.value.length === 0
                          ? layoutView_1.x
                          : sumWidth - listWidth[index].value.x + 10;
                      if (
                        sumWidth + listWidth[index].value.width >
                        width - 40
                      ) {
                        numberRow.value = numberRow.value + 1;
                        offsetY = offsetY + 50;
                        listTouch.value = [];

                        offsetX = layoutView_1.x - listWidth[index].value.x + 5;
                        locationButtonX[index].value = withTiming(offsetX);

                        locationButtonY[index].value = withTiming(offsetY);
                      } else {
                        locationButtonX[index].value = withTiming(
                          listTouch.value.length === 0
                            ? -listWidth[index].value.x + 5
                            : offsetX,
                        );

                        locationButtonY[index].value = withTiming(offsetY);
                      }

                      listTouch.value.push(index);
                      listSentence.value.push({
                        message,
                        index,
                        currIndex: listSentence.value.length,
                        row: numberRow.value,
                      });
                    }
                  }
                },
              });
              return (
                <TapGestureHandler onGestureEvent={tapHandler} key={index}>
                  <AnimatedPressable
                    onPress={() => {
                      if (
                        sentences.current
                          .map(item => item.index)
                          .includes(index)
                      ) {
                        sentences.current = sentences.current.filter(
                          value => value.index !== index,
                        );
                      } else {
                        sentences.current.push({message, index});
                      }
                    }}
                    onLayout={e => {
                      listWidth[index].value = {
                        width: e.nativeEvent.layout.width,
                        height: e.nativeEvent.layout.height,
                        x: e.nativeEvent.layout.x,
                        y: e.nativeEvent.layout.y,
                      };
                    }}
                    style={[
                      {
                        paddingHorizontal: 0.5,
                        paddingVertical: 0.5,
                        paddingBottom: 4,
                        backgroundColor: 'hsl(0,0%,73%)',
                        marginHorizontal: 5,
                        marginVertical: 5,
                        borderRadius: 10,
                      },
                      buttonAnimatedStyle[index],
                      // postionAnimatedStyle[index],
                    ]}>
                    <View
                      key={index}
                      style={{
                        paddingHorizontal: 20,
                        paddingVertical: 8,
                        backgroundColor: 'white',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: 'black',
                        }}>
                        {message}
                      </Text>
                    </View>
                  </AnimatedPressable>
                </TapGestureHandler>
              );
            })}
        </View>
        {/*Bottom */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 30,
          }}>
          <View
            style={{
              backgroundColor: 'hsl(0,0%,73%)',
              paddingVertical: 0.5,
              paddingHorizontal: 0.5,
              paddingBottom: 4,
              width: 51,
              height: 44.5,
              borderRadius: 10,
            }}>
            <Pressable
              onPress={refreshPress}
              style={{
                width: 50,
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'white',
              }}>
              <FontAwesome name="refresh" size={30} color="hsl(198,86%,71%)" />
            </Pressable>
          </View>
          <View
            style={{
              backgroundColor: 'hsl(0,0%,73%)',
              paddingVertical: 0.5,
              paddingHorizontal: 0.5,
              paddingBottom: 4,
              width: '80%',
              height: 44.5,
              borderRadius: 10,
            }}>
            <Pressable
              onPress={() => {
                setOpenModal(!openModal);
              }}
              style={{
                width: '100%',
                height: 40,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: 'hsl(99,85%,50%)',
              }}>
              <Text style={{color: 'white', fontWeight: '700'}}>CHECK</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default Drag_Drop_V1;
