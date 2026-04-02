import React, { useEffect } from 'react'

import { ClipboardList, MessageSquare, BookOpen, MessagesSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import WelcomeHeader from '../components/WelcomeHeader';
import StatCard from '../components/StatCard';
import { getSubjects } from '../features/subjectSlice';
import StudentSub from '../components/StudentSub';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const {subjects} = useSelector(state=>state.subject);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getSubjects(user?.className))
  },[dispatch]);
  return (
    <div>

      <WelcomeHeader
        name={`Welcome back,${user?.name}` || "Student"}
        subtitle="Continue your learning journey"
        buttonText="Ask a Doubt"
        onClick={() => console.log("Ask Doubt")}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Class"
          value={`${user?.className}th`}
          subtitle="+6 this week"
          icon={< ClipboardList className="text-blue-600" />}
          bgColor="bg-blue-100"
        />

        <StatCard
          title="Doubts Posted"
          value="2"
          subtitle="0 resolved"
          icon={<MessageSquare className="text-purple-600" />}
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Subjects"
          value="6"
          subtitle="Active learning"
          icon={<BookOpen className="text-green-600" />}
          bgColor="bg-green-100"
        />
      </div>

      <div className='w-full flex flex-col p-4 rounded-2xl shadow-sm mt-4 bg-purple-50'>
        <h3 className='text-2xl font-bold text-indigo-500'>My Active Subjects</h3>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4'>
          {
            subjects?.map((s)=>
              <StudentSub
              name={s.name}
              className={s.class}
              teacher={s.teacher?.name}
              />
            )
          }
        </div>
      </div>

      <div className='flex flex-col w-full shadow-md bg-white rounded-2xl mt-4 p-4 pb-16'>
        <div className='flex justify-between'>
          <p className='text-black font-semibold text-lg'>Ask Your Doubt Here 
            <p className='text-gray-500 font-light text-sm'>
             Track your questions and teacher responses
            </p>
          </p>
          <button className= 'bg-black text-white hover:bg-gray-800 px-4 py-1 rounded-md '>View All</button>
        </div>
           <div className='flex flex-col justify-center items-center sm:mt-20'>
        <MessagesSquare size={48} className='text-gray-400'/>
        <p className='text-gray-400'> Ask your doubts here</p>
        <button className='mt-2 px-16 py-2 text-white bg-black rounded-md hover:bg-gray-800'>+ &nbsp; &nbsp;&nbsp;Ask doubt</button>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
