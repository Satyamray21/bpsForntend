import { configureStore } from '@reduxjs/toolkit';
import locationReducer from '../features/Location/locationSlice';
import stationReducer from '../features/stations/stationSlice';

export const store = configureStore({
  reducer: {
    stations: stationReducer,
    location: locationReducer,
  },
});
