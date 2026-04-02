import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";
export const addSubject = createAsyncThunk(
  'subject/addSubject',
  async(data, thunkAPI)=>{
    try {
      const res = await API.post('/subject/create', data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)
export const getAllSubjects = createAsyncThunk(
  'subject.getAllSubjects',
  async(_, thunkAPI)=>{
    try {
      const res = await API.get('/subject/get-all')
      return res.data.data;
    } catch (error) {
      thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const deleteSubject = createAsyncThunk(
  'subject/deleteSubject',
  async(id, thunkAPI)=>{
    try {
      const res = await API.delete(`/subject/delete/${id}`)
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const getSubjects = createAsyncThunk(
  'subject/getSubjects',
  async(className, thunkAPI)=>{
    try {
      const res = await API.get('/subject/get',{
        params:{
          class: className }
      })
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)
const initialState = {
  loading: false,
  subjects: [],
  error: null
}
const subjectSlice = createSlice({
  name: "subject",
  initialState,
  reducers:{

  },
  extraReducers:(builder)=>{
    builder
    .addCase(getAllSubjects.fulfilled, (state,action)=>{
      state.loading = false
      state.subjects = action.payload;
    });

     builder
    .addCase(addSubject.fulfilled, (state,action)=>{
      state.subjects.push(action.payload);
    });

    builder
    .addCase(deleteSubject.fulfilled, (state,action)=>{
      state.subjects = state.subjects.filter((s)=> s._id !== action.payload);
    });

    builder
    .addCase(getSubjects.fulfilled, (state,action)=>{
      state.subjects = action.payload;
    })
  }
});

export const subjectReducer = subjectSlice.reducer;