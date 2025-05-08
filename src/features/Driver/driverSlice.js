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

export const fetchtotalCount =  createAsyncThunk(
    'driver/totalCount',async(_,thunkApi)=>{
        try{
            const res = await axios.get(`${BASE_URL}/total-count`);
            return {totalCount:res.data.message};
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Total Driver count");
        }
    }
)
export const fetchavailableCount = createAsyncThunk(
    'driver/availableCount',async(_,thunkApi)=>{
        try{
            const res = await axios.get(`${BASE_URL}/available-count`);
            return  {availableCount:res.data.message};
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Available Driver count");
        }
    }
)
export const fetchblacklistedCount = createAsyncThunk(
 'driver/blacklistedCount',async(_,thunkApi)=>{
    try{
        const res = await axios.get(`${BASE_URL}/blacklisted-count`);
        return {blacklistedCount:res.data.message}
    }
    catch(error)
    {
        return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Blacklisted Driver count");
    }
 }
)
export const  fetchdeactivatedCount = createAsyncThunk(
    'driver/deactivatedCount',async(_,thunkApi)=>{
        try{
            const res = await axios.get(`${BASE_URL}/deactive-count`);
            return {deactivatedCount:res.data.message};
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Deactivated Driver count");
        }
    }
)
export const fetchtotalList = createAsyncThunk(
    'drivers/totalList',async(_,thunkApi)=>{
        try{
            const res = await axios.get(`${BASE_URL}/all`);
            return res.data.message;
        }
        catch(error)
        {
            return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Total List Driver count");
        }
    }
)

export const fetchavailableList = createAsyncThunk(
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
export const fetchblacklistedList = createAsyncThunk(
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
export const fetchdeactivatedList = createAsyncThunk(
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
    availableCount:0,
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
            .addCase(fetchtotalCount.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(fetchtotalCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.totalCount = action.payload.totalCount;
              })
              .addCase(fetchtotalCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // AVAILABLE COUNT
              .addCase(fetchavailableCount.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(fetchavailableCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.availableCount = action.payload.availableCount;
              })
              .addCase(fetchavailableCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // BLACKLISTED COUNT
              .addCase(fetchblacklistedCount.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(fetchblacklistedCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blacklistedCount = action.payload.blacklistedCount;
              })
              .addCase(fetchblacklistedCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // DEACTIVATED COUNT
              .addCase(fetchdeactivatedCount.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(fetchdeactivatedCount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.deactivatedCount = action.payload.deactivatedCount;
              })
              .addCase(fetchdeactivatedCount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // TOTAL LIST
              .addCase(fetchtotalList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(fetchtotalList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
              })
              .addCase(fetchtotalList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // AVAILABLE LIST
              .addCase(fetchavailableList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(fetchavailableList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
              })
              .addCase(fetchavailableList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // BLACKLISTED LIST
              .addCase(fetchblacklistedList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(fetchblacklistedList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
              })
              .addCase(fetchblacklistedList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              })
        
              // DEACTIVATED LIST
              .addCase(fetchdeactivatedList.pending, (state) => {
                state.status = 'loading';
                state.error = null;
              })
              .addCase(fetchdeactivatedList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
              })
              .addCase(fetchdeactivatedList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
              });
        }

    }
)
 export const { setFormField, resetForm, addDrivers , setDrivers} = driverSlice.actions;

 export default driverSlice.reducer;
