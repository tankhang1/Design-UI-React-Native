import {
  View,
  Text,
  Pressable,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useCallback, useEffect, useReducer, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const {width, height} = Dimensions.get('screen');
const ADD_NUMBER = 'ADD_NUMBER';
const DELETE_LIST = 'DELETE_LIST';
const CHANGE_VALUE = 'CHANGE_VALUE';
const EQUAL_VALUE = 'EQUAL_VALUE';
const MODE_VALUE = 'MODE_VALUE';
const DIV_VALUE = 'DIV_VALUE';
const MULTI_VALUE = 'MULTI_VALUE';
const MINUS_VALUE = 'MINUS_VALUE';
const PLUS_VALUE = 'PLUS_VALUE';
const RELOAD_VALUE = 'RELOAD_VALUE';
const actionReducer = (state, action) => {
  switch (action.type) {
    case ADD_NUMBER:
      return {
        ...state,
        tmpValue: state.tmpValue + action.payload,
      };

    case DELETE_LIST:
      return {
        result: '',
        tmpValue: '',
        listValue: [],
      };
    case CHANGE_VALUE:
      return {
        ...state,
        tmpValue: (Number(state.tmpValue) * -1).toString(),
      };
    case MODE_VALUE:
      return {
        result: state.tmpValue,
        listValue: [...state.listValue, state.tmpValue, '%'],
        tmpValue: '',
      };
    case DIV_VALUE:
      return {
        result: state.tmpValue,
        listValue: [...state.listValue, state.tmpValue, '/'],
        tmpValue: '',
      };
    case MULTI_VALUE:
      return {
        result: state.tmpValue,
        listValue: [...state.listValue, state.tmpValue, 'x'],
        tmpValue: '',
      };
    case MINUS_VALUE:
      return {
        result: state.tmpValue,
        listValue: [...state.listValue, state.tmpValue, '-'],
        tmpValue: '',
      };
    case PLUS_VALUE:
      return {
        result: state.tmpValue,
        listValue: [...state.listValue, state.tmpValue, '+'],
        tmpValue: '',
      };
    case EQUAL_VALUE:
      state.listValue.push(state.tmpValue);
      let sum = 0;
      for (let index = 0; index < state.listValue.length; index++) {
        const element = state.listValue[index];
        if (index == 0) {
          sum = Number(element);
        } else {
          if (isNaN(Number(element))) {
            switch (element) {
              case '+':
                sum += Number(state.listValue[index + 1]);
                index++;
                break;
              case '-':
                sum -= Number(state.listValue[index + 1]);
                index++;
                break;
              case '*':
                sum *= Number(state.listValue[index + 1]);
                index++;
                break;
              case '/':
                sum /= Number(state.listValue[index + 1]);
                index++;
                break;
              case '%':
                sum %= Number(state.listValue[index + 1]);
                index++;
              default:
                break;
            }
          }
        }
      }

      return {
        ...state,
        listValue: [],
        tmpValue: sum,
      };
    case RELOAD_VALUE: {
      state.listValue.pop();
      return {
        ...state,
        tmpValue: '',
      };
    }
    default:
      break;
  }
};
const Caculator = () => {
  const blackColor = '#22252d';
  const backgroundBlackColor = 'hsl(224,14%,25%)';
  const backgroundWhiteColor = 'hsl(0,0%,95%)';
  const whiteColor = 'white';
  const deleteValue = () => {
    dispatch({type: DELETE_LIST});
  };
  const changeValue = () => {
    dispatch({type: CHANGE_VALUE});
  };
  const modeValue = () => {
    dispatch({type: MODE_VALUE});
  };
  const divValue = () => {
    dispatch({type: DIV_VALUE});
  };
  const addNumber = number => {
    dispatch({type: ADD_NUMBER, payload: number});
  };

  const multiValue = () => {
    dispatch({type: MULTI_VALUE});
  };
  const minusValue = () => {
    dispatch({type: MINUS_VALUE});
  };
  const plusValue = () => {
    dispatch({type: PLUS_VALUE});
  };
  const reloadValue = () => {
    dispatch({type: RELOAD_VALUE});
  };
  const equalValue = () => {
    dispatch({type: EQUAL_VALUE});
  };

  const [state, dispatch] = useReducer(actionReducer, {
    result: '',
    tmpValue: '',
    listValue: [],
  });

  const listButton = [
    {
      title: 'AC',
      function: () => deleteValue(),
      color: '#3fdabf',
    },
    {
      title: '±',
      function: () => changeValue(),
      color: '#3fdabf',
    },
    {
      title: '%',
      function: () => modeValue(),
      color: '#3fdabf',
    },
    {
      title: '/',
      function: () => divValue(),
      color: '#d68183',
    },
    {
      title: '7',
      function: () => addNumber('7'),
    },
    {
      title: '8',
      function: () => addNumber('8'),
    },
    {
      title: '9',
      function: () => addNumber('9'),
    },
    {
      title: 'x',
      function: () => multiValue(),
      color: '#d68183',
    },
    {
      title: '4',
      function: () => addNumber('4'),
    },
    {
      title: '5',
      function: () => addNumber('5'),
    },
    {
      title: '6',
      function: () => addNumber('6'),
    },
    {
      title: '-',
      function: minusValue,
      color: '#d68183',
    },
    {
      title: '1',
      function: () => addNumber('1'),
    },
    {
      title: '2',
      function: () => addNumber('2'),
    },
    {
      title: '3',
      function: () => addNumber('3'),
    },
    {
      title: '+',
      function: () => plusValue(),
      color: '#d68183',
    },
    {
      title: '⟳',
      function: () => reloadValue(),
    },
    {
      title: '0',
      function: () => addNumber('0'),
    },
    {
      title: '.',
      function: () => addNumber('.'),
    },
    {
      title: '=',
      function: () => equalValue(),
      color: '#d68183',
    },
  ];
  const [checkBlack, setCheckBlack] = useState(true);
  const renderButton = ({item, index}) => {
    return (
      <Pressable
        onPress={item.function}
        key={index}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 5,
          borderRadius: 10,
          backgroundColor: checkBlack ? blackColor : whiteColor,
        }}>
        <Text
          style={{
            fontSize: 20,
            color: item.color ? item.color : checkBlack ? 'white' : 'black',
            fontWeight: '600',
          }}>
          {item.title}
        </Text>
      </Pressable>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: checkBlack ? blackColor : whiteColor,
      }}>
      <StatusBar
        backgroundColor={checkBlack ? blackColor : whiteColor}
        barStyle={checkBlack ? 'light-content' : 'dark-content'}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: 100,
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          height: 40,
          borderRadius: 15,
          backgroundColor: checkBlack
            ? backgroundBlackColor
            : backgroundWhiteColor,
          alignSelf: 'center',
        }}>
        <Pressable onPress={() => setCheckBlack(false)}>
          <Ionicons
            name="ios-sunny-outline"
            size={25}
            color={checkBlack ? 'hsl(0,0%,73%)' : 'white'}
          />
        </Pressable>
        <Pressable onPress={() => setCheckBlack(true)}>
          <Ionicons
            name="moon-outline"
            size={25}
            color={checkBlack ? 'white' : 'hsl(0,0%,73%)'}
          />
        </Pressable>
      </View>
      {/*Body */}
      <View
        style={{
          height: '40%',
          justifyContent: 'flex-end',
          paddingVertical: 30,
          paddingHorizontal: 30,
          alignItems: 'flex-end',
        }}>
        {/*List Value */}
        <Text
          style={{
            color: checkBlack ? 'white' : 'black',
            fontSize: 16,
            marginBottom: 20,
          }}>
          {state.listValue?.join(' ')}
        </Text>

        <Text
          style={{
            color: checkBlack ? 'white' : 'black',
            fontSize: 36,
          }}
          numberOfLines={1}>
          {state.tmpValue}
        </Text>
      </View>
      {/*Button */}
      <View
        style={{
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          backgroundColor: checkBlack
            ? backgroundBlackColor
            : backgroundWhiteColor,
        }}>
        <FlatList
          data={listButton}
          keyExtractor={item => item.title}
          renderItem={renderButton}
          numColumns={4}
          removeClippedSubviews={true}
          columnWrapperStyle={{
            width: width - 40,
            height: 60,
            marginVertical: 12,
            alignSelf: 'center',
          }}
          ListFooterComponent={() => (
            <View
              style={{
                width: '40%',
                height: 5,
                borderRadius: 100,
                backgroundColor: 'hsl(0,0%,50%)',

                alignSelf: 'center',
              }}></View>
          )}
        />
      </View>
    </View>
  );
};

export default Caculator;
