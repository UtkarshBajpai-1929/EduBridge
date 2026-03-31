import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/authSlice";
import { schoolReducer } from "../features/schoolSlice";
import { subjectReducer } from "../features/subjectSlice";

export const store = configureStore({
  reducer:{
    auth: authReducer,
    school: schoolReducer,
    subject: subjectReducer,
  }
});