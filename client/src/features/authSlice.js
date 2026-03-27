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
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async(_, thunkAPI)=>{
    try {
      const res = await API.get('/user/get-current-user')
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const logout = createAsyncThunk(
  'auth/logout',
  async(_, thunkAPI)=>{
    try {
      const res = await API.post('/user/logout')
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)
const initialState = {
  user:null,
  loading:false,
  isAuthenticated: false,
  error: null,
  isSuccess: false,
  school: null
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
    });

    builder
    .addCase(registerSchool.fulfilled, (state,action)=>{
      state.school = action.payload
      state.loading = false
      state.isSuccess = true
    })
    .addCase(registerSchool.pending, (state,action)=>{
      state.loading = true
    })
    .addCase(registerSchool.rejected, (state,action)=>{
      state.loading = false
      state.error = action.payload
    });

    builder
    .addCase(getCurrentUser.fulfilled, (state,action)=>{
      state.isAuthenticated = true
      state.user = action.payload
      state.loading = false
    })
     .addCase(getCurrentUser.rejected, (state,action)=>{
      state.isAuthenticated = false
      state.error = action.payload
      state.loading = false
    })
      .addCase(getCurrentUser.pending, (state,action)=>{
      state.isAuthenticated = false
      state.loading = true
    })

    builder
    .addCase(logout.fulfilled, (state)=>{
      state.user = null
      state.isAuthenticated = false
      state.loading = false
    })
    .addCase(logout.pending, (state)=>{
      state.loading = true
    })
    .addCase(logout.rejected, (state,action)=>{
      state.error = action.payload
    })
  }
});
export const authReducer = authSlice.reducer;