import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import API from "../api/api";
export const registerUser = createAsyncThunk(
  'auth/resisterUser',
  async(data, thunkAPI)=>{
    try {
      const res = await API.post('/user/register',data)
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async(data, thunkAPI)=>{
   try {
    const res = await API.post('/user/login', data);
    return res.data.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
   }
  }
);
export const registerSchool = createAsyncThunk(
  'auth/registerSchool',
  async(data, thunkAPI)=>{
    try {
      const res = await API.post('/school/register', data)
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
) 
const initialState = {
  user:null,
  loading:false,
  isAuthenticated: false,
  error: null,
  isSuccess: false
}
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{
  },
  extraReducers:(builder)=>{
    builder
    .addCase(registerUser.fulfilled, (state, action)=>{
      state.error = null
      state.loading = false
      state.isSuccess = true
      state.user = action.payload
    })
    .addCase(registerUser.pending, (state)=>{
      state.loading = true
    })
    .addCase(registerUser.rejected, (state,action)=>{
      state.loading = false
      state.error = action.payload
    });
    builder
    .addCase(loginUser.fulfilled, (state,action)=>{
      state.loading = false
      state.isAuthenticated = true
      state.user = action.payload
    })
    .addCase(loginUser.rejected, (state,action)=>{
      state.loading = false
      state.error = action.payload
    })
    .addCase(loginUser.pending, (state)=>{
      state.loading = true
    })
  }
});
export const authReducer = authSlice.reducer;