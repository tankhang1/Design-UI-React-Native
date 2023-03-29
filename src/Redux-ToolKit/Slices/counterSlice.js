import {createSlice, prepareAutoBatched} from '@reduxjs/toolkit';
const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    incrementBatched: {
      reducer(state) {
        state.value += 1;
      },
      prepare: prepareAutoBatched(),
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {incrementBatched, increment, decrement, incrementByAmount} =
  counterSlice.actions;
export default counterSlice.reducer;
