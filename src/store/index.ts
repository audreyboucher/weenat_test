import { useDispatch } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';

import calendarSlice from './slice';

const store = configureStore({
  reducer: {
    Calendar: calendarSlice,
  },
});

const rootReducer = combineReducers({
  Calendar: calendarSlice
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  });
};

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>
export default store;
