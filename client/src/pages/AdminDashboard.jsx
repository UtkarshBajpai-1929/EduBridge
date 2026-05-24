import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ClipboardList, MessageSquare, Video, Users } from "lucide-react";
import WelcomeHeader from '../components/WelcomeHeader';
import StatCard from '../components/StatCard';
import { getAllDoubts, getAllStudents, getAllTeachers } from '../features/schoolSlice';
import { getAllSubjects } from '../features/subjectSlice';
import { getAllVideos } from '../features/videoSlice';
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {students, teachers, doubts} = useSelector((state) => state.school);
  const {subjects} = useSelector((state) => state.subject);
  const {video} = useSelector((state) => state.video);
  const {user} = useSelector(state => state.auth);
  useEffect(()=>{
   dispatch(getAllStudents());
   dispatch(getAllTeachers());
   dispatch(getAllDoubts());
   dispatch(getAllSubjects());
   dispatch(getAllVideos());
},[dispatch]);
  const pendingDoubts = useMemo(() => doubts?.filter(d => d.status === "open").length || 0, [doubts]);

  return (
    <div className='min-h-dvh bg-gray-100 px-4 pb-8'>

      <WelcomeHeader
        name={`Welcome back, ${user?.name || "Admin"}`}
        subtitle="Monitor users, subjects, doubts, and learning videos from one place."
        buttonText=""
        onClick={() =>{}}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Students"
          value={students?.length || 0}
          subtitle="Registered learners"
          icon={< ClipboardList className="text-blue-600" />}
          bgColor="bg-blue-100"
          bg="bg-white"
        />

        <StatCard
          title="Total Teachers"
          value={teachers?.length || 0}
          subtitle="Active educators"
          icon={<Users className="text-purple-600" />}
          bgColor="bg-purple-100"
          bg="bg-white"
        />

        <StatCard
          title="Total Doubts"
          value={doubts?.length || 0}
          subtitle={`${pendingDoubts} pending`}
          icon={<MessageSquare className="text-orange-600" />}
          bgColor="bg-orange-100"
          bg="bg-white"
        />

         <StatCard
          title="Total Videos"
          value={video?.length || 0}
          subtitle="Uploaded lectures"
          icon={<Video className="text-green-600" />}
          bgColor="bg-green-100"
          bg="bg-white"
        />
      </div>

      <div className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <section className='rounded bg-white p-5 shadow-sm'>
          <h2 className='text-lg font-semibold'>Recent Doubts</h2>
          <p className='text-sm text-gray-500'>Latest questions from students</p>
          <div className='mt-4 flex flex-col gap-3'>
            {doubts?.slice(0, 5).map(d => (
              <div key={d._id} className='rounded border border-gray-100 p-3'>
                <div className='flex items-center justify-between gap-3'>
                  <p className='font-medium'>{d.title || "Untitled Doubt"}</p>
                  <span className={`rounded px-2 py-1 text-xs ${d.status === "open" ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>
                    {d.status === "open" ? "Pending" : "Resolved"}
                  </span>
                </div>
                <p className='mt-1 text-sm text-gray-500'>{d.student?.name || "Student"} {d.subject?.name ? `- ${d.subject.name}` : ""}</p>
              </div>
            ))}
            {!doubts?.length && <p className='rounded bg-gray-50 p-4 text-center text-gray-500'>No doubts yet.</p>}
          </div>
        </section>

        <section className='rounded bg-white p-5 shadow-sm'>
          <h2 className='text-lg font-semibold'>Subjects Overview</h2>
          <p className='text-sm text-gray-500'>{subjects?.length || 0} active subjects</p>
          <div className='mt-4 flex flex-col gap-3'>
            {subjects?.slice(0, 5).map(s => (
              <div key={s._id} className='flex items-center justify-between rounded border border-gray-100 p-3'>
                <div>
                  <p className='font-medium'>{s.name}</p>
                  <p className='text-sm text-gray-500'>Grade {s.class}</p>
                </div>
                <p className='text-sm text-gray-600'>{s.teacher?.name || "No teacher"}</p>
              </div>
            ))}
            {!subjects?.length && <p className='rounded bg-gray-50 p-4 text-center text-gray-500'>No subjects yet.</p>}
          </div>
        </section>
      </div>

    </div>
  )
}

export default AdminDashboard
