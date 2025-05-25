import { useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import { eventSlice } from './slices';

const store = configureStore({
  reducer: {
    event: eventSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export default store;
