import {View, Text, Image} from 'react-native';
import React from 'react';

const ImageUI = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{
          width: 300,
          height: 300,
        }}
        //blurRadius={5}

        fadeDuration={10000}
        source={{
          uri: 'https://imgv3.fotor.com/images/blog-cover-image/part-blurry-image.jpg',
        }}
        // loadingIndicatorSource={{
        //   uri: 'https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg',
        // }}
        onProgress={e => console.log('event', e.nativeEvent.loaded)}
      />
    </View>
  );
};

export default ImageUI;
