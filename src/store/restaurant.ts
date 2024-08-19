import { Restaurant } from '@/resources/interfaces/restaurant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remove } from 'lodash';

interface RestaurantState {
  restaurants: Restaurant[];
  view: 'simple' | 'details';
}

const initialState: RestaurantState = {
  restaurants: [],
  view: 'simple',
};

const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants(state, action: PayloadAction<Restaurant[]>) {
      state.restaurants = action.payload;
    },
    removeRestaurant(state, action: PayloadAction<string>) {
      state.restaurants = state.restaurants.filter(
        (restaurant) => restaurant.id !== action.payload
      );
    },
    setView(state, action: PayloadAction<'simple' | 'details'>) {
      state.view = action.payload;
    },
  },
});

export const { setRestaurants, removeRestaurant, setView } =
  restaurantSlice.actions;
export default restaurantSlice.reducer;
