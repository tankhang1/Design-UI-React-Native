import {
  View,
  Text,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useReducer} from 'react';
import {calculateDate, Month, Week} from './Data';
import {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {memo} from 'react';
import {useCallback} from 'react';
const {width: WIDTH_WD, height: HEIGHT_WD} = Dimensions.get('window');
const sizePress = (WIDTH_WD * 0.8) / 7;
const LEFT_ACTION = 'LEFT_ACTION';
const RIGHT_ACTION = 'RIGHT_ACTION';
const reducer = (state, action) => {
  switch (action.type) {
    case LEFT_ACTION:
      if (state.curMonth === 0)
        return {
          ...state,
          curMonth: 11,
          curYear: state.curYear - 1,
          dates: calculateDate(state.curYear - 1, 11),
        };
      else
        return {
          ...state,
          curMonth: state.curMonth - 1,
          dates: calculateDate(state.curYear, state.curMonth - 1),
        };
    case RIGHT_ACTION: {
      if (state.curMonth === 11)
        return {
          ...state,
          curMonth: 1,
          curYear: state.curYear + 1,
          dates: calculateDate(state.curYear + 1, 1),
        };
      else
        return {
          ...state,
          curMonth: state.curMonth + 1,
          dates: calculateDate(state.curYear, state.curMonth + 1),
        };
    }
    default:
      break;
  }
};
const Calander_Picker = () => {
  const [state, dispatch] = useReducer(reducer, {
    curMonth: new Date().getMonth(),
    curYear: new Date().getFullYear(),
    dates: calculateDate(),
  });

  const [datePress, setDatePress] = useState();
  const leftPress = useCallback(() => {
    dispatch({type: LEFT_ACTION});
  }, [state.curMonth]);
  const rightPress = useCallback(() => {
    dispatch({type: RIGHT_ACTION});
  }, [state.curMonth]);
  const onDatePress = useCallback(
    item => {
      setDatePress(item);
      if (item.getUTCMonth() < state.curMonth) {
        dispatch({type: LEFT_ACTION});
      }
      if (item.getUTCMonth() > state.curMonth) {
        dispatch({type: RIGHT_ACTION});
      }
    },
    [datePress, state.curMonth],
  );

  const renderDates = useCallback(
    ({item, index}) => {
      return (
        <Pressable
          key={index}
          style={[
            styles.datesStyle,
            {
              backgroundColor:
                datePress?.getTime() === item.getTime() ? '#3CDA5E' : 'white',
            },
          ]}
          onPress={() => {
            onDatePress(item);
          }}>
          <Text
            style={[
              styles.dateTxtStyle,
              {
                color:
                  datePress?.getTime() === item.getTime()
                    ? 'white'
                    : state.curMonth !== item.getUTCMonth()
                    ? 'grey'
                    : 'black',
              },
            ]}>
            {item.getUTCDate()}
          </Text>
        </Pressable>
      );
    },
    [datePress, state.curMonth],
  );
  return (
    <View style={styles.container}>
      {/*Calendar Header */}
      <View style={styles.contentStyle}>
        <Pressable onPress={leftPress} hitSlop={10}>
          <Entypo name="chevron-left" size={24} color="black" />
        </Pressable>
        <Text style={styles.headerTxt}>
          {Month[state.curMonth]} {state.curYear}
        </Text>
        <Pressable onPress={rightPress} hitSlop={10}>
          <Entypo name="chevron-right" size={24} color="black" />
        </Pressable>
      </View>
      <View style={styles.weekStyle}>
        {Week.map((w, i) => {
          return (
            <View key={i} style={styles.weekContentStyle}>
              <Text style={styles.weekContentTxtStyle}>{w}</Text>
            </View>
          );
        })}
      </View>
      <View>
        <FlatList
          data={state.dates}
          renderItem={renderDates}
          numColumns={7}
          removeClippedSubviews={true}
        />
      </View>
    </View>
  );
};

export default memo(Calander_Picker);
const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderWidth: 1,
  },
  contentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerTxt: {
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
    marginVertical: 10,
  },
  weekStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  weekContentStyle: {
    width: sizePress,
    height: sizePress,
    justifyContent: 'center',
    alignItems: 'center',
  },
  weekContentTxtStyle: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  datesStyle: {
    width: sizePress,
    height: sizePress,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 100,
  },
  dateTxtStyle: {
    fontSize: 14,

    fontWeight: '500',
  },
});
