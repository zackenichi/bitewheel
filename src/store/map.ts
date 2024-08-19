import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MapState {
  selectedPlace: {
    lat: number;
    lng: number;
    name: string;
  } | null;
}

const initialState: MapState = {
  selectedPlace: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setSelectedPlace(state, action: PayloadAction<MapState['selectedPlace']>) {
      state.selectedPlace = action.payload;
    },
  },
});

export const { setSelectedPlace } = mapSlice.actions;
export default mapSlice.reducer;
