import React, { use, useEffect } from "react"
import AppRoutes from "./routes/AppRoutes"
import { useDispatch } from "react-redux"
import { getCurrentUser } from "./features/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getCurrentUser())
  },[dispatch])
  return(
  <>
   <AppRoutes/>
   <ToastContainer position="top-right" autoClose={3000} />
   </>
  )
}

export default App
