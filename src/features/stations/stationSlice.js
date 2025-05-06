import { createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v2';

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
  'stations/fetchStations',async(_,thunkApi)=>{
    try{
      const res = await axios.get(`${BASE_URL}/stations/getAllStations`);
      return res.data.message;
    }catch(error)
    {
        return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Stations");
    }
  }
);
export const deleteStation = createAsyncThunk(
  'stations/deleteStation',async(stationId,thunkApi)=>{
    try{
      const res = await axios.delete(`${BASE_URL}/stations/delete/${stationId}`);
      return stationId
    }
    catch(error)
    {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to delete the Stations");
    }
  }
);

export const searchStationByName = createAsyncThunk(
  'stations/searchByName',async(stationName,thunkApi)=>{
    try{
      const res = await axios.get(`${BASE_URL}/stations/name/${stationName}`);
      return res.data.data
    }
    catch(error)
    {
      return thunkApi.rejectWithValue(error.response?.data?.message || "Failed to delete the Stations");
    }
  }
)

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
  status: 'idle',
  error: null,
};

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createStation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(createStation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchStations.pending,(state)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(fetchStations.fulfilled,(state,action)=>{
        state.loading=false;
        state.list=action.payload
      })
      .addCase(fetchStations.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload
      })
      .addCase(deleteStation.fulfilled,(state,action)=>{
        state.list = state.list.filter(station=>station.stationId !== action.payload);
      })
      .addCase(searchStationByName.loading,(state,action)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(searchStationByName.fulfilled,(state,action)=>{
      state.loading=false;
      state.stations=action.payload
      })
      ;
  },
});


export const { setFormField, resetForm, addStation, setStations } = stationSlice.actions;

export default stationSlice.reducer;