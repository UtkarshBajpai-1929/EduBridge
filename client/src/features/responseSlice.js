import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";
export const createResponse = createAsyncThunk(
  "response/createResponse",
  async(data, thunkAPI)=>{
    try {
      const res = await API.post("/response/create", data)
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
);
export const getResponse = createAsyncThunk(
  "response/getRespone",
  async(id, thunkAPI)=>{
    try {
      console.log(id);
      const res =await API.get(`/response/get/${id}`)
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)
const initialState = {
  singleResponse : null,
  responses : [],     
  loading:false,
  error: null
}
const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder
    .addCase(createResponse.fulfilled, (state,action)=>{
      state.loading = false
      state.responses.push(action.payload)
    })
    .addCase(createResponse.rejected, (state, action)=>{
      state.loading = false
      state.error = action.payload
    })
    .addCase(createResponse.pending, (state)=>{
      state.loading = true
    })

    builder
    .addCase(getResponse.fulfilled, (state, action)=>{
      state.singleResponse = action.payload
    })
  }
})
export const responseReducer = responseSlice.reducer;