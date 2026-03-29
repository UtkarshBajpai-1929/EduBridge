import React, { useEffect } from 'react'
import { useState } from "react";
import { GraduationCap } from "lucide-react";
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from 'react-router-dom'
import {registerUser} from '../features/authSlice'
import Loader from '../components/Loader';
const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    schoolId: "",
    className: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading} = useSelector((state)=> state.auth);
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if(result.meta.requestStatus === 'fulfilled'){
      navigate('/login');
    }
  };
  if(loading){
    return <Loader/>
  }
  return (
    <div className='bg-blue-50 flex flex-col justify-center items-center gap-4 py-10'>
      <Link to="/">
        <div className="flex items-center gap-2">
          <GraduationCap className="text-blue-500 w-7 h-7" />
          <h1 className="text-center text-2xl font-bold text-gray-800">
            EduBridge
          </h1>
        </div>
        </Link>
    <div className="min-h-screen flex items-center justify-center">
      
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        {/* Heading */}
        <h2 className="text-2xl font-semibold">Sign Up</h2>
        <p className="text-gray-500 mb-6">
          Join your school on EduBridge
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="your.email@school.edu"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block mb-1 font-medium">I am a</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* School ID */}
          <div>
            <label className="block mb-1 font-medium">School ID</label>
            <input
              type="text"
              name="schoolId"
              placeholder="e.g., SHS2024"
              value={form.schoolId}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the unique School ID provided by your school
            </p>
          </div>

          {/* Class */}
          <div>
            <label className="block mb-1 font-medium">Class/Grade</label>
            <select
              name="className"
              value={form.className}
              onChange={handleChange}
              className="w-full p-3 bg-gray-100 rounded-lg outline-none"
            >
              <option value="">Select your class</option>
              <option value="6">Class 6</option>
              <option value="7">Class 7</option>
              <option value="8">Class 8</option>
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-900 transition mt-4"
          >
            Create Account
          </button>

        </form>
      </div>
    </div>
    </div>
  );
};

export default Signup;
