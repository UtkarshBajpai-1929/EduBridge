import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap } from "lucide-react";
const Footer = () => {
  return (
    <div className='flex flex-col w-full'>
      <div className='w-full flex flex-col justify-center items-center py-18 px-12 bg-blue-600'>
        <h1 className='text-white text-3xl text-center font-bold'>Ready to Transform Your School's Learning Experience?</h1>
        <p className='text-xl mt-6 text-gray-200 text-center'>
          Join thousands of schools already using EduBridge to enhance education
        </p>
        <Link to="/register-school">
        <button className='bg-white text-black text-xl text-center px-8 py-2 rounded font-semibold mt-8 hover:bg-gray-100'>
          Register Your School Now
        </button>
        </Link>
      </div>
      <div className='w-full flex flex-col py-18 px-12 bg-gray-900'>
         <div className="flex justify-center items-center gap-2">
          <GraduationCap className="text-blue-500 w-7 h-7" />
          <h1 className="text-xl font-bold text-white">
            EduBridge
          </h1>
        </div>
        <p className='mt-6 text-gray-200 text-center'>Empowering education through technology</p>
        <p className='mt-4 text-xs text-center text-gray-400'>© 2026 EduBridge. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
