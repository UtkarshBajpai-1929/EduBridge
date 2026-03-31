import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";
export const getAllStudents = createAsyncThunk(
  'school/getAllStudents',
  async(_, thunkAPI)=>{
   try {
     const res = await API.get('/school/get-students')
     return res.data.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
   }
  }
);

export const getAllTeachers = createAsyncThunk(
  'school/getAllTeachers',
  async(_, thunkAPI)=>{
   try {
     const res = await API.get('/school/get-teachers')
     return res.data.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
   }
  }
);

export const getAllDoubts = createAsyncThunk(
  'school/getAllDoubts',
  async(_, thunkAPI)=>{
   try {
     const res = await API.get('/school/get-doubts')
     return res.data.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
   }
  }
);

export const deleteUser = createAsyncThunk(
  'school/deleteUser',
  async(userId, thunkAPI)=>{
    try {
      const res = await API.delete(`/school/delete-user/${userId}`)
      return userId; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
);

const initialState = {
  students:null,
  teachers: null,
  doubts:null,
  videos:null,
  loading:false,
  error:null,
}
const schoolSlice = createSlice({
  name: "school",
  initialState,
  reducers:{

  },
  extraReducers: (builder)=>{
    builder
    .addCase(getAllStudents.fulfilled, (state,action)=>{
      state.students = action.payload
      state.loading = false
    })
    .addCase(getAllStudents.pending, (state,action)=>{
      state.loading = true
    })
    .addCase(getAllStudents.rejected, (state,action)=>{
      state.error = action.payload
      state.loading = false
    });

       builder
    .addCase(getAllTeachers.fulfilled, (state,action)=>{
      state.teachers = action.payload
      state.loading = false
    })
    .addCase(getAllTeachers.pending, (state)=>{
      state.loading = true
    })
    .addCase(getAllTeachers.rejected, (state,action)=>{
      state.error = action.payload
      state.loading = false
    });

    builder
    .addCase(getAllDoubts.fulfilled, (state,action)=>{
      state.doubts = action.payload
      state.loading = false
    })
    .addCase(getAllDoubts.pending, (state)=>{
      state.loading = true
    })
    .addCase(getAllDoubts.rejected, (state,action)=>{
      state.error = action.payload
      state.loading = false
    });

    builder
    .addCase(deleteUser.fulfilled, (state,action)=>{
      state.loading = false
      const deletedId = action.payload;
      state.students = state.students.filter(user => user._id !== deletedId);
      state.teachers = state.teachers.filter(user => user._id !== deletedId);
    });
  }
});

export const schoolReducer = schoolSlice.reducer;