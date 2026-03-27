import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from "../features/authSlice";
import Loader from "../components/Loader";
export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    schoolId: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, user} = useSelector(state=>state.auth);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(()=>{
    if(user){
    if(user.role === "admin"){
      navigate('/admin/dashboard')
    }else if(user.role === "teacher"){
      navigate('/teacher/dashboard')
    }else{
      navigate('/student/dashboard')
    }
  }
  },[user]);
  if(loading){
    return <Loader/>
  }
  return (
    <>
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center px-4">
      
   
      <Link to="/">
        <div className="flex items-center gap-2 mb-6">
          <GraduationCap className="text-blue-500 w-7 h-7" />
          <h1 className="text-2xl font-bold text-gray-800">
            EduBridge
          </h1>
        </div>
      </Link>

    
      <div className="bg-white w-full max-w-md rounded-xl shadow-md p-6">
        
       
        <h2 className="text-2xl font-semibold mb-1">
          Login
        </h2>
        <p className="text-gray-500 mb-6">
          Enter your credentials to access your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
        
          <div>
            <label className="block font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="admin@school.edu"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

         
          <div>
            <label className="block font-medium mb-1">
              School ID
            </label>
            <input
              type="text"
              name="schoolId"
              placeholder="Enter your School ID"
              value={form.schoolId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

  
          <div>
            <label className="block font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition"
          >
            Login
          </button>
        </form>

        
        <p className="text-sm text-gray-500 mt-4 text-center">
          Don’t have a school?{" "}
          <Link to="/register-school" className="text-blue-500 font-medium">
            Register here
          </Link>
        </p>
      </div>
    </div>
    </>
  );
}
