import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";
const BASE_URL = "http://localhost:8000/api/v2/driver"

export const addDriver = createAsyncThunk(
    'drivers/addDriver', async(data,{ rejectWithValue })=>{
        try{
            const formData = new FormData();
      for (const key in data) {
        if (data[key]) {
          formData.append(key, data[key]);
        }
      }
      const response = await axios.post(`${BASE_URL}/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.message;
        }
        catch(error)
        {
            return rejectWithValue(error.response?.data?.message || error.message)
        }
    });

export const totalCount =  createAsyncThunk(
    'driver/totalCount',async(_,thunkApi)=>{
        try{
            const res = await axios.get(`${BASE_URL}/total-count`);
            return res.data.message;
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Total Driver count");
        }
    }
)
export const availableCount = createAsyncThunk(
    'driver/availableCount',async(_,thunkApi)=>{
        try{
            const res = await axios.get(`${BASE_URL}/available-count`);
            return  res.data.message;
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Available Driver count");
        }
    }
)
export const blacklistedCount = createAsyncThunk(
 'driver/blacklistedCount',async(_,thunkApi)=>{
    try{
        const res = await axios.get(`${BASE_URL}/blacklisted-count`);
        return res.data.message
    }
    catch(error)
    {
        return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Blacklisted Driver count");
    }
 }
)
export const  deactivatedCount = createAsyncThunk(
    'driver/deactivatedCount',async(_,thunkApi)=>{
        try{
            const res = axios.get(`${BASE_URL}/deactive-count`);
            return res.data.message;
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Deactivated Driver count");
        }
    }
)
export const totalList = createAsyncThunk(
    'drivers/totalList',async(_,thunkApi)=>{
        try{
            const res = axios.get(`${BASE_URL}/all`);
            return res.data.message;
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Total List Driver count");
        }
    }
)

export const availableList = createAsyncThunk(
    'driver/availableList',async(_,thunkApi)=>{
        try{
            const res = await axios.get(`${BASE_URL}/available-list`);
            return res.data.message
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Available List Driver count");
        }
    }
)
export const blacklistedList = createAsyncThunk(
    'driver/blacklistedList',async(_,thunkApi)=>{
        try{
            const res = await axios.get(`${BASE_URL}/blacklisted-list`);
            return res.data.message
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Blacklisted List Driver count");
        }

    }
)
export const deactivatedList = createAsyncThunk(
    'driver/deactivatedList',async(_,thunkApi)=>{
        try{
            const res = await axios.get(`${BASE_URL}/deactive-list`);
            return res.data.message
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Deactivated List Driver count");   
        }
        
    }
)
const initialState = {
    list:[],
    totalCount:0,
    activeCount:0,
    blacklistedCount:0,
    deactivatedCount:0,

    form:{
        firstName: '',
            middleName: '',
            lastName: '',
            contactNumber: '',
            emailId: '',
            password: '',
            address: '',
            state: '',
            city: '',
            district: '',
            pincode: '',
            idProof: '',
            idProofPhoto: null,
            dlNumber: '',
            driverProfilePhoto: null
    },
    status: 'idle',
    error: null,
};
const driverSlice =  createSlice(
    {
        name:'drivers',
        initialState,
        reducers:{
            setFormField: (state, action) => {
                      const { field, value } = action.payload;
                      state.form[field] = value;
                    },
                    resetForm: (state) => {
                      state.form = initialState.form;
                    },
                    addDrivers: (state, action) => {
                      state.list.push(action.payload);
                    },
                    setDrivers: (state, action) => {
                      state.list = action.payload;
                    },
        },
        extraReducers: (builder)=>{
            builder
            .addCase(addDriver.pending,(state)=>{
                state.loading=true;
                state.error=false
            })
            .addCase(addDriver.fulfilled,(state,action)=>{
                state.status = 'succeeded';
                state.error = null;

            })
            .addCase(addDriver.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
            })
            .addCase(totalCount.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(totalCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.totalCount = action.payload;
              })
              .addCase(totalCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // AVAILABLE COUNT
              .addCase(availableCount.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(availableCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.activeCount = action.payload;
              })
              .addCase(availableCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // BLACKLISTED COUNT
              .addCase(blacklistedCount.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(blacklistedCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blacklistedCount = action.payload;
              })
              .addCase(blacklistedCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // DEACTIVATED COUNT
              .addCase(deactivatedCount.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(deactivatedCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deactivatedCount = action.payload;
              })
              .addCase(deactivatedCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // TOTAL LIST
              .addCase(totalList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(totalList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
              })
              .addCase(totalList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // AVAILABLE LIST
              .addCase(availableList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(availableList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
              })
              .addCase(availableList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // BLACKLISTED LIST
              .addCase(blacklistedList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(blacklistedList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
              })
              .addCase(blacklistedList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // DEACTIVATED LIST
              .addCase(deactivatedList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(deactivatedList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
              })
              .addCase(deactivatedList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              });
        }

    }
)
 export const { setFormField, resetForm, addDrivers , setDrivers} = driverSlice.actions;

 export default driverSlice.reducer;
