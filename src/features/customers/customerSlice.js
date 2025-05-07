import  {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api/v2/customers';

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (data, { rejectWithValue }) => {
    try {
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
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const fetchActiveCustomer = createAsyncThunk(
  'customers/fetchActiveCustomer',async(_,thunkApi)=>{
    try{
      const res = await axios.get(`${BASE_URL}/active-list`)
      return res.data.message;
    }
    catch(error)
    {
        return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Active Customer");
    }
  }
) 

export const fetchBlackListedCustomer = createAsyncThunk(
  'customers/fetchBlackListedCustomer',async(_,thunkApi)=>{
    try{
      const res = await axios.get(`${BASE_URL}/blacklisted-list`)
      return res.data.message;
    }
    catch(error)
    {
        return thunkApi.rejectWithValue(error.response?.data?.message || "Failed To fetch Blacklisted  Customer");
    }
  }
) 
const initialState = {
    list: [],
    form: {
        firstName: '',
        middleName: '',
        lastName: '',
        contactNumber: '',
        email: '',
        address: '',
        state: '',
        city: '',
        district: '',
        pincode: '',
        idProof: '',
        idPhoto: null,
        customerPhoto: null
    },
    status: 'idle',
    error: null,
  };

  const customerSlice = createSlice({
    name:'customers',
    initialState,
    reducers: {
        setFormField: (state, action) => {
          const { field, value } = action.payload;
          state.form[field] = value;
        },
        resetForm: (state) => {
          state.form = initialState.form;
        },
        addCustomers: (state, action) => {
          state.list.push(action.payload);
        },
        setCustomers: (state, action) => {
          state.list = action.payload;
        },
      },
      extraReducers: (builder) =>{
        builder
        .addCase(createCustomer.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createCustomer.fulfilled,(state,action)=>{
            state.status = 'succeeded';
            state.error = null;
        })
        .addCase(createCustomer.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload
        })
            .addCase(fetchActiveCustomer.pending,(state)=>{
                state.loading=true;
                state.error=null
              })
              .addCase(fetchActiveCustomer.fulfilled,(state,action)=>{
                state.loading=false;
                state.list=action.payload
              })
              .addCase(fetchActiveCustomer.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
              })
              .addCase(fetchBlackListedCustomer.pending,(state)=>{
                state.loading=true;
                state.error=null
              })
              .addCase(fetchBlackListedCustomer.fulfilled,(state,action)=>{
                state.loading=false;
                state.list=action.payload
              })
              .addCase(fetchBlackListedCustomer.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload
              })
              
        ;
      }
    }

  )
  export const { setFormField, resetForm, addCustomers, setCustomers } = customerSlice.actions;

  export default customerSlice.reducer;
