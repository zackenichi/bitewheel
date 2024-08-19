import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './map';
import restaurantReducer from './restaurant';

export const store = configureStore({
  reducer: {
    map: mapReducer,
    restaurant: restaurantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
