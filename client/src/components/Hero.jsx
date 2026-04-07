import React from 'react'
import { Link } from 'react-router-dom'
import hero from '../assets/hero_final_correct.png'
import Spline from '@splinetool/react-spline';
const Hero = () => {
  return (
    <div className='bg-blue-50 flex flex-col justify-center px-12 py-10'>
      <h1 className='font-bold text-center text-black text-6xl'>
        Bridge the Gap Between
      </h1>
      <h1 className='mt-2 font-bold text-center text-6xl text-blue-700'>
        Teachers and Students
      </h1>
      <p className='mt-8 text-gray-700 text-center text-xl'>
        A modern school management and learning interaction platform that enables seamless<br/>
         communication, doubt resolution, and educational content delivery.
      </p>
      <div className=' mt-8 flex flex-wrap gap-8 justify-center items-center'>
        <Link to='/register-school'>
        <button className='text-white bg-black py-3 px-8 text-center rounded font-semibold hover:bg-gray-900'>
          Register Your School
        </button>
        </Link>
        <Link to='/register-user'>
         <button className='text-black bg-white py-3 px-8 text-center rounded font-semibold hover:bg-gray-200'>
          Join as Student/Teacher
        </button>
        </Link>
      </div>
         <img className='mt-4' src={hero}/>
    </div>
  )
}

export default Hero
