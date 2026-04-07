import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";
export const createDoubt = createAsyncThunk(
  'doubt/createDoubt',
  async(data, thunkAPI)=>{
    try {
      const res = await API.post('/doubt/create', data);
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getStudentDoubts = createAsyncThunk(
  'doubt/getStudentDoubts',
  async(_, thunkAPI)=>{
    try {
      const res =await API.get('/doubt/get-student');
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)
const initialState = {
  doubts: [],
  loading: false,
  error: null
}
const doubtSlice = createSlice({
  name:'doubt',
  initialState,
  reducers:{

  },
  extraReducers: (builder)=>{
    builder
    .addCase(createDoubt.fulfilled, (state, action)=>{
      state.loading = false
      state.doubts = action.payload
    })
    .addCase(createDoubt.rejected, (state,action)=>{
      state.error = action.payload
    })
    .addCase(createDoubt.pending, (state)=>{
      state.loading = true
    });

    builder
    .addCase(getStudentDoubts.fulfilled, (state,action)=>{
      console.log(action.payload);
      state.doubts = action.payload
    })
  }
});

export const doubReducer = doubtSlice.reducer