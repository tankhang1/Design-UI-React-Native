import {
  autoBatchEnhancer,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import counterReducer from './Slices/counterSlice';
import userReducer from './Slices/userSlice';
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
  enhancers: existingEnhancers => {
    return existingEnhancers.concat(
      autoBatchEnhancer({
        type: 'timer',
        timeout: 5000,
      }),
    );
  },
});
