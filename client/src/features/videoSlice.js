import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import API from "../api/api"
export const uploadVideo = createAsyncThunk(
  "video/uploadVideo", async(data, thunkAPI)=>{
   try {
     const res = await API.post('/video/upload', data);
     return res.data.data;
   } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
   }
  }
)
export const getTeacherVideos = createAsyncThunk(
  "video/getTeacherVideo", async(_, thunkAPI)=>{
    try {
      const res = await API.get('/video/get-teacher-video')
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message)
    }
  }
)
export const getStudentVideos = createAsyncThunk(
  "video/getStudentVideos", async(className, thunkAPI)=>{
    try {
      const res = await API.get('/video/get-student-video', {
        params: className ? { class: className } : {}
      })
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch videos")
    }
  }
)
export const getAllVideos = createAsyncThunk(
  "video/getAllVideos", async(_, thunkAPI)=>{
    try {
      const res = await API.get('/school/get-videos')
      return res.data.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch videos")
    }
  }
)
export const deleteVideo = createAsyncThunk(
  "video/deleteVideo", async(id, thunkAPI)=>{
    try {
      await API.delete(`/video/delete/${id}`)
      return id
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to delete video")
    }
  }
)
const initialState = {
  video:[],
  loading: false,
  error: null,
}
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers:{},

  extraReducers: (builder)=>{
    builder
    .addCase(uploadVideo.fulfilled, (state,action)=>{
      state.loading = false;
      state.video.push(action.payload);
    })
    .addCase(uploadVideo.rejected, (state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(uploadVideo.pending, (state)=>{
      state.loading = true
    });

    builder
    .addCase(getTeacherVideos.fulfilled, (state,action)=>{
      state.video = action.payload
      state.loading = false
    })
    .addCase(getTeacherVideos.rejected, (state, action)=>{
      state.error = action.payload
    })
    .addCase(getTeacherVideos.pending, (state)=>{
      state.loading = true
    })

    builder
    .addCase(getAllVideos.fulfilled, (state,action)=>{
      state.video = action.payload
      state.loading = false
    })
    .addCase(getAllVideos.rejected, (state, action)=>{
      state.error = action.payload
      state.loading = false
    })
    .addCase(getAllVideos.pending, (state)=>{
      state.loading = true
    })

    builder
    .addCase(getStudentVideos.fulfilled, (state,action)=>{
      state.video = action.payload
      state.loading = false
    })
    .addCase(getStudentVideos.rejected, (state, action)=>{
      state.error = action.payload
      state.loading = false
    })
    .addCase(getStudentVideos.pending, (state)=>{
      state.loading = true
    })

    builder
    .addCase(deleteVideo.fulfilled, (state, action)=>{
      state.video = state.video.filter(v => v._id !== action.payload)
      state.loading = false
    })
    .addCase(deleteVideo.rejected, (state, action)=>{
      state.error = action.payload
      state.loading = false
    })
    .addCase(deleteVideo.pending, (state)=>{
      state.loading = true
    })
  }
});
export const videoReducer = videoSlice.reducer;
