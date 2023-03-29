import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  loading: 'idle',
  users: [],
};
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersLoading(state, action) {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    usersReceived(state, action) {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.users = action.payload;
      }
    },
  },
});

export const {usersLoading, usersReceived} = userSlice.actions;
export default userSlice.reducer;
