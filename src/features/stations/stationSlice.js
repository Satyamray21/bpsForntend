import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v2';

// Async Thunks

export const createStation = createAsyncThunk(
  'stations/createStation',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/stations/create`, data);
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchStations = createAsyncThunk(
  'stations/fetchStations',
  async (_, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/stations/getAllStations`);
      return res.data.message;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to fetch Stations");
    }
  }
);

export const deleteStation = createAsyncThunk(
  'stations/deleteStation',
  async (stationId, thunkApi) => {
    try {
      await axios.delete(`${BASE_URL}/stations/delete/${stationId}`);
      return stationId;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to delete the Station");
    }
  }
);

export const searchStationByName = createAsyncThunk(
  'stations/searchByName',
  async (stationName, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/stations/name/${stationName}`);
      const data = res.data.data;
      return Array.isArray(data) ? data : [data];
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to search Stations");
    }
  }
);

export const fetchStationById = createAsyncThunk(
  'stations/fetchStationById',
  async (stationId, thunkApi) => {
    try {
      const res = await axios.get(`${BASE_URL}/stations/searchById/${stationId}`);
      return res.data.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to fetch Station by ID");
    }
  }
);

// Initial State

const initialState = {
  list: [],
  form: {
    stationName: '',
    contact: '',
    email: '',
    address: '',
    state: '',
    city: '',
    pincode: '',
  },
  currentStation: null, // Used in view/edit
  loading: false,
  status: 'idle',
  error: null,
};

// Slice

const stationSlice = createSlice({
  name: 'stations',
  initialState,
  reducers: {
    setFormField: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
    },
    resetForm: (state) => {
      state.form = initialState.form;
    },
    addStation: (state, action) => {
      state.list.push(action.payload);
    },
    setStations: (state, action) => {
      state.list = action.payload;
    },
    setCurrentStation: (state, action) => {
      state.currentStation = action.payload;
    },
    clearCurrentStation: (state) => {
      state.currentStation = null;
    }
  },
  extraReducers: (builder) => {
    builder

      // Create Station
      .addCase(createStation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createStation.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(createStation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch All Stations
      .addCase(fetchStations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStations.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Station
      .addCase(deleteStation.fulfilled, (state, action) => {
        state.list = state.list.filter(station => station.stationId !== action.payload);
      })
      .addCase(deleteStation.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Search Station By Name
      .addCase(searchStationByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchStationByName.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(searchStationByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Station By ID
      .addCase(fetchStationById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchStationById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentStation = action.payload;
      })
      .addCase(fetchStationById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  }
});

export const {
  setFormField,
  resetForm,
  addStation,
  setStations,
  setCurrentStation,
  clearCurrentStation
} = stationSlice.actions;

export default stationSlice.reducer;
