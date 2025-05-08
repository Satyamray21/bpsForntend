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
const initialState = {
    list:[],
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
        }

    }
)
 export const { setFormField, resetForm, addDrivers , setDrivers} = driverSlice.actions;

 export default driverSlice.reducer;
