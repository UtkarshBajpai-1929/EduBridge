import { Dot, User } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'

const   Doubt = ({name, grade, subject, title}) => {
  return (
    <>
    <div className='px-2 py-2 hover:bg-gray-100 cursor-pointer rounded'>
      <div className='flex justify-between'>
        <div className='flex gap-2 mt-4'>
          <div className='py-1'>
            <User/>
          </div>
        <div className='flex flex-col justify-center'>
          <h3 className='font-semibold'>{name}</h3>
          <p className='text-gray-400'>Grade {grade} &bull; {subject}</p>
          <h3 className='text-red-800'>{title}</h3>
          </div>
        </div>
        <div>
        <button className='px-2 bg-gray-200 rounded'>Pending</button>
        </div>
      </div>
    </div>
    <hr/>
      </>
  )
}

export default Doubt
