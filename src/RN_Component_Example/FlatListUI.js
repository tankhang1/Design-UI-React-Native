import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Button,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-132-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-213-bd96-145qw571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-123-qwdbd96-43',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-qw1231',
    title: 'Third Item',
  },
  {
    id: '58694a0f-eqeq-12-23-145571ddwe29d72',
    title: 'Third Item',
  },
  {
    id: 'qweqwe-3da1f-123-as-123',
    title: 'Third Item',
  },
  {
    id: 'qwed-3da1-471f-44-dasdaqwd',
    title: 'Third Item',
  },
  {
    id: 'ddqd-3da1-471f-44-qweqwe',
    title: 'Third Item',
  },
  {
    id: '5869qw4a0f-qwdqw-471f-44-qweqw',
    title: 'Third Item',
  },
  {
    id: '58694a0f-qwd-471f-44-qweee',
    title: 'Third Item',
  },
  {
    id: '58694a0f-wdqd-471f-44-asda',
    title: 'Third Item',
  },
  {
    id: '58694a0f-qwd3da1-as-44-112',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-dq-dqwd-112',
    title: 'Third Item',
  },
];
const {width, height} = Dimensions.get('screen');
const FlatListUI = () => {
  const [data, setData] = useState(DATA);

  const onPress = () => {
    setData([
      ...data,
      {
        id: '58694a0f-3da1-471f-44-112' + Math.random() * 1000,
        title: 'Third Item' + Math.random() * 1000,
      },
    ]);
  };
  useEffect(() => {
    console.log(data.length);
  }, [data]);

  const renderItem = ({item, index, separators}) => {
    return (
      <TouchableHighlight
        key={item.id}
        onPress={() => {
          console.log(item);
        }}
        onShowUnderlay={separators.highlight}
        onHideUnderlay={separators.unhighlight}
        style={{
          width: 100,
          marginHorizontal: 10,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
          backgroundColor: 'green',
        }}>
        <Text>{item.title}</Text>
      </TouchableHighlight>
    );
  };
  const refFlatlist = useRef(null);
  const 
  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flex: 1,
          borderWidth: 1,
        }}>
        <FlatList
          ref={refFlatlist}
          data={data}
          renderItem={renderItem}
          ItemSeparatorComponent={({highlighted, leadingItem}) => {
            // if (highlighted) {
            //   console.log('focus', leadingItem);
            // } else {
            //   console.log('blue', leadingItem);
            // }
          }}
          ListEmptyComponent={() => (
            <View>
              <Text>Data empty</Text>
            </View>
          )}
          ListFooterComponent={() => (
            <Text
              style={{
                color: 'white',
              }}>
              I'm in the end of list
            </Text>
          )}
          ListHeaderComponent={() => (
            <Text
              style={{
                color: 'white',
              }}>
              I'm in the top of list
            </Text>
          )}
          ListHeaderComponentStyle={{
            width: 200,
            alignSelf: 'center',
            backgroundColor: 'red',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          ListFooterComponentStyle={{
            width: 200,
            alignSelf: 'center',
            backgroundColor: 'red',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          numColumns={1}
          //   columnWrapperStyle={{
          //     justifyContent: 'space-between',
          //     paddingHorizontal: 10,
          //     marginVertical: 10,
          //   }}
          extraData={data}
          getItemLayout={(data, index) => ({
            length: 100,
            offset: 100 * index,
            index,
          })}
          //horizontal={true}
          scrollEnabled={true}
          initialScrollIndex={4}
          initialNumToRender={5}
          //inverted
          keyExtractor={({id}) => id}
          onEndReached={info => console.log('reach end', info)}
          onEndReachedThreshold={0.2}
          onRefresh={() => console.log('refresh')}
          refreshing={false}
          progressViewOffset={100}
          removeClippedSubviews={true}
        />
      </View>
      <Button title="Add new data" onPress={onPress} />
    </View>
  );
};

export default FlatListUI;
