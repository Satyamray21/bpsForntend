import  {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = 'http://localhost:8000/api/v2/customers';

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, data);
      return response.data.message;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
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
        ;
      }
    }

  )
  export const { setFormField, resetForm, addCustomers, setCustomers } = customerSlice.actions;

  export default customerSlice.reducer;
