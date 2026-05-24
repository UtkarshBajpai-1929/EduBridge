import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/authSlice";
import { schoolReducer } from "../features/schoolSlice";
import { subjectReducer } from "../features/subjectSlice";
import { doubtReducer } from "../features/doubtSlice";
import { responseReducer } from "../features/responseSlice";
import { videoReducer } from "../features/videoSlice";

export const store = configureStore({
  reducer:{
    auth: authReducer,
    school: schoolReducer,
    subject: subjectReducer,
    doubt: doubtReducer,
    response: responseReducer,
    video: videoReducer,
  }
});