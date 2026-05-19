import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../api/api";

export const createDoubt = createAsyncThunk(
  "doubt/createDoubt",
  async (data, thunkAPI) => {
    try {
      const res = await API.post("/doubt/create", data);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteDoubt = createAsyncThunk(
  "doubt/deleteDoubt",
  async (id, thunkAPI) => {
    try {
      await API.delete(`/doubt/delete/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getStudentDoubts = createAsyncThunk(
  "doubt/getStudentDoubts",
  async (_, thunkAPI) => {
    try {
      const res = await API.get("/doubt/get-student");
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
export const getTeacherDoubts = createAsyncThunk(
  "doubt/getTeacherDoubts",
  async(_, thunkAPI)=>{
    try {
      const res = await API.get("/doubt/get-teacher")
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
)
const initialState = {
  doubts: [],
  loading: false,
  error: null,
};

const doubtSlice = createSlice({
  name: "doubt",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDoubt.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDoubt.fulfilled, (state, action) => {
        state.loading = false;
        state.doubts.push(action.payload);
      })
      .addCase(createDoubt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder.addCase(getStudentDoubts.fulfilled, (state, action) => {
      state.doubts = action.payload;
    });

    builder
      .addCase(deleteDoubt.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteDoubt.fulfilled, (state, action) => {
        state.loading = false;
        state.doubts = state.doubts.filter(
          (d) => d._id !== action.payload
        );
      })
      .addCase(deleteDoubt.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      builder.addCase(getTeacherDoubts.fulfilled, (state,action)=>{
        state.doubts = action.payload
      })
  },
});

export const doubtReducer = doubtSlice.reducer;