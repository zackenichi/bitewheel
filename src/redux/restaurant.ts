import { Restaurant } from '@/resources/interfaces/restaurant';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remove, set, shuffle } from 'lodash';

interface RestaurantState {
  restaurants: Restaurant[];
  view: 'simple' | 'details';
  selectedRestaurant: number;
  showRestaurant: boolean;
}

const initialState: RestaurantState = {
  restaurants: [],
  view: 'simple',
  selectedRestaurant: 0,
  showRestaurant: false,
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
    removeRestaurantFromList(state, action: PayloadAction<number>) {
      remove(
        state.restaurants,
        (restaurant, index) => index === action.payload
      );
    },
    setView(state, action: PayloadAction<'simple' | 'details'>) {
      state.view = action.payload;
    },
    setSelectedRestaurant(state, action: PayloadAction<number>) {
      state.selectedRestaurant = action.payload;
    },
    shuffleRestaurants(state) {
      state.restaurants = state.restaurants
        .map((value) => ({ value, sort: Math.random() })) // Assign random sort values
        .sort((a, b) => a.sort - b.sort) // Sort by random values
        .map(({ value }) => value); // Extract values
    },
    setShowRestaurant(state, action: PayloadAction<boolean>) {
      state.showRestaurant = action.payload;
    },
  },
});

export const {
  setRestaurants,
  removeRestaurant,
  setView,
  setSelectedRestaurant,
  shuffleRestaurants,
  setShowRestaurant,
  removeRestaurantFromList,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;
