import { Book } from 'lucide-react'
import React from 'react'

const StudentSub = ({name, teacher, className}) => {
  return (
    <div className='flex flex-col rounded-xl shadow-md gap-1 p-2 bg-white hover:scale-[1.01]'>
      <div className='flex justify-between'>
      <h3 className='text-xl font-sans font-semibold'>
        {name}
      </h3> 
      <Book className='font-light text-indigo-400'/>
      </div>
      <p className='text-gray-400'>
        Class: <span className='text-black'>{className}</span>
      </p>
      <p className='text-gray-400'>
        Teacher: <span className='text-black'>{teacher}</span>
      </p>
    </div>
  )
}

export default StudentSub
