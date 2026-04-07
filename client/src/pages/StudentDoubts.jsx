import { CrossIcon, Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStudentDoubts } from '../features/doubtSlice';

const StudentDoubts = () => {
  const [value, setValue] = useState("All");
  const {subjects} = useSelector(state=> state.subject)
  const {doubts} = useSelector(state=>state.doubt)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getStudentDoubts())
  },[dispatch]);
  return (
    <div className='px-4 pb-8 min-h-dvh flex flex-col gap-4 bg-gray-100'>
        <h1 className='text-2xl font-bold'>Student Doubts</h1>
        <p className='text-gray-400'>View students doubts and responses</p>
      <div className='pl-4 w-full flex justify-start gap-6 items-center shadow-md rounded-2xl py-4 bg-white'>
        <input
        className='bg-gray-200 p-2 rounded text-center' 
        type='text'
        placeholder='Search doubts'
        />
         <select
            name="subject"
            className="border p-2 rounded-md"
            required
          >
            <option value="">Select Subject</option>
            {subjects?.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
      </div>
      <div className='flex bg-white py-4 shadow-md justify-evenly rounded-xl'>
        <button className='bg-gray-100 rounded-xl py-1 px-4 active:bg-white' 
        onClick={()=>{setValue("All")}}
        >All (5)</button>
        <button className='bg-gray-100 rounded-xl py-1 px-4 active:bg-white'
         onClick={()=>{setValue("Pending")}}
        >Pending (2)</button>
        <button className='bg-gray-100 rounded-xl py-1 px-4 active:bg-white'
         onClick={()=>{setValue("Answered")}}
        >Answered (3)</button>
      </div>
      <div className='flex flex-col gap-4'>
          {
        doubts ? doubts.map((d)=>
        {
          return(
            <div key={d._id} className='flex flex-col px-4 py-4 shadow-sm rounded bg-white'>
          <h3 className='font-semibold text-lg'>{d.title}</h3>
          <div className='flex items-center gap-3'>
            <p className='text-gray-600'>{d.student?.name}</p>
            <button className='bg-gray-300 px-3 rounded text-sm font-semibold'>{`Grade ${d.student?.className}`}</button>
            <button className='border border-gray-300 px-3 rounded text-sm'>{d.subject?.name}</button>
          </div>
          <div className='mt-3'>
            <p className='text-gray-600'>
              {d.questionText}
            </p>
          </div>
          <div className='flex gap-4 mt-4'>
            {
              d.status === "open" ? <button className='bg-red-700 text-white px-4 py-1 rounded'>Pending
              </button> : <button className='bg-emerald-700 text-white px-4 py-1 rounded'>Resolved</button>
            }  
            
          </div>
        </div>
          )
        }): null
      }
      </div>
    </div>
  )
}

export default StudentDoubts
