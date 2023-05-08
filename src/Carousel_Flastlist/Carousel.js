import {
  View,
  Text,
  Dimensions,
  Image,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import React from 'react';

import {useRef} from 'react';
import {useEffect} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
const IMAGES = [
  '',
  'https://i.pinimg.com/564x/ff/51/94/ff51944843c14ad15ea1fc1056ee3bce.jpg',
  'https://i.pinimg.com/564x/97/6a/d3/976ad361b93f0a2438024759c1e17de8.jpg',
  'https://i.pinimg.com/564x/84/d3/81/84d38128f7b2cf29af9167388a2109c8.jpg',
  'https://i.pinimg.com/564x/56/c6/77/56c677fb49d84aafd8eb2ad5bf59b529.jpg',
  'https://i.pinimg.com/564x/15/4a/66/154a6638fcf59b56b0a4aaf052752aa8.jpg',
  'https://i.pinimg.com/564x/e6/b3/e3/e6b3e31f86374371c63cddf8546e1a49.jpg',
  'https://i.pinimg.com/564x/f9/71/47/f971476d48ed412505cf5bad38994ba4.jpg',
  'https://i.pinimg.com/564x/f2/b4/ba/f2b4baf1012cd831b3bb575a89bfd95e.jpg',
  'https://i.pinimg.com/564x/f7/70/d6/f770d6b297c92d2a8de5a28922e42d80.jpg',
  '',
];
const {width, height} = Dimensions.get('screen');

const IMAGES_HEIGHT = 280;
const marginHorizontal = 20;
const IMAGES_WIDTH = (width - marginHorizontal * 2) / 2;
const Carousel = () => {
  const scrollX = useSharedValue(0);
  const ImageAnimatedStyle = IMAGES.map((_, index) =>
    useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: interpolate(
              scrollX.value,
              [index - 1, index - 0.5, index],
              [20, -50, 20],
              Extrapolate.CLAMP,
            ),
          },
        ],
      };
    }),
  );
  const renderImage = ({item, index}) => {
    if (item === '') {
      return (
        <View
          key={index}
          style={{
            width: IMAGES_WIDTH,
            height: IMAGES_HEIGHT,
            marginRight: index === IMAGES.length - 1 ? marginHorizontal : 0,
            marginLeft: marginHorizontal,
          }}
        />
      );
    }
    return (
      <Animated.Image
        key={index}
        source={{uri: item}}
        style={[
          {
            width: IMAGES_WIDTH,
            height: IMAGES_HEIGHT,
            resizeMode: 'contain',
            marginLeft: marginHorizontal,
            borderRadius: 15,
          },
          ImageAnimatedStyle[index],
        ]}
      />
    );
  };
  const scrollRef = useRef(null);
  const scrollFlastlist = value => {
    const x = value - 0;

    scrollRef.current?.scrollToOffset({
      offset: (x + 0.5) * width,
      animated: true,
    });
  };
  useDerivedValue(() => {
    runOnJS(scrollFlastlist)(scrollX.value);
  });
  const renderBackImage = ({item, index}) => {
    if (item === '') {
      return (
        <View
          key={index}
          style={{
            width,
            height,
          }}
        />
      );
    } else {
      return (
        <ImageBackground
          key={index}
          source={{uri: item}}
          style={{
            width,
            height: height / 1.2,
          }}
          resizeMode="cover"
          blurRadius={0.8}
        />
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <FlatList
        ref={scrollRef}
        scrollEnabled={false}
        data={IMAGES}
        renderItem={renderBackImage}
        horizontal
        pagingEnabled
        initialScrollIndex={1}
        contentOffset={{x: width}}
        renderToHardwareTextureAndroid
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        snapToAlignment="center"
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        snapToInterval={IMAGES_WIDTH + marginHorizontal}
        snapToAlignment={'center'}
        removeClippedSubviews={false}
        getItemLayout={(_, index) => ({
          length: IMAGES_WIDTH + marginHorizontal,
          offset: (IMAGES_WIDTH + marginHorizontal) * index,
          index,
        })}
        onScroll={e =>
          (scrollX.value = (
            e.nativeEvent.contentOffset.x /
            (IMAGES_WIDTH + marginHorizontal)
          ).toPrecision(6))
        }
        style={{
          height: 400,
          position: 'absolute',
          bottom: 30,
          zIndex: 44,
        }}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        renderToHardwareTextureAndroid
        contentOffset={{x: IMAGES_WIDTH / 2 + marginHorizontal}}
        data={IMAGES}
        renderItem={renderImage}
        horizontal
      />
      <View
        style={{
          width: width * 1.2,
          height: width,
          borderRadius: width * 1.2,
          backgroundColor: 'white',
          position: 'absolute',
          bottom: -width / 2,
          alignSelf: 'center',
          zIndex: 3,
          opacity: 0.9,
        }}
      />
    </View>
  );
};

export default Carousel;
