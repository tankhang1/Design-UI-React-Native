import {View, Text, Button} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrement,
  increment,
  incrementBatched,
  incrementByAmount,
} from '../Slices/counterSlice';
import {createAction, createReducer} from '@reduxjs/toolkit';
import {usersLoading, usersReceived} from '../Slices/userSlice';
import {useEffect} from 'react';

const First_Screen = () => {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  //Create action ex1
  const addTodo_1 = text => {
    return {
      type: 'ADD_TODO',
      payload: {text},
    };
  };
  //Create action ex2
  const addTodo_2 = createAction('ADD_TODO');
  addTodo_2({text: 'Buy milk'});

  console.log(addTodo_2.toString());
  console.log(addTodo_2.type);

  const reducer = createReducer({}, builder => {
    builder.addCase(addTodo_2, (state, action) => {
      state.text = 'HELLO' + Math.floor(Math.random() * 1000);
      console.log(action);
    });
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button title="Increase Amount" onPress={() => dispatch(increment())} />
      <Button title="Decrease Amount" onPress={() => dispatch(decrement())} />
      <Button
        title="Increase By Amount"
        onPress={() => dispatch(incrementByAmount(Math.random()))}
      />
      <Button
        title="Increase By Batched"
        onPress={() => dispatch(incrementBatched())}
      />
      <Text
        style={{
          color: 'black',
          fontSize: 20,
        }}>
        {count}
      </Text>
    </View>
  );
};

export default First_Screen;
