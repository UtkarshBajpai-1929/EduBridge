import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { ClipboardList, MessageSquare, BookOpen } from "lucide-react";
import WelcomeHeader from '../components/WelcomeHeader';
import StatCard from '../components/StatCard';
import { getAllDoubts, getAllStudents, getAllTeachers } from '../features/schoolSlice';
const AdminDashboard = () => {
  const dispatch = useDispatch();
  const {students, teachers, doubts} = useSelector((state) => state.school);
  const {user} = useSelector(state => state.auth);
  useEffect(()=>{
   dispatch(getAllStudents());
   dispatch(getAllTeachers());
   dispatch(getAllDoubts());
},[dispatch]);
  return (
    <div>

      <WelcomeHeader
        name={`Welcome back,${user?.name}`|| "Admin"}
        subtitle="Manage Functonalties for school"
        buttonText="Add Subject"
        onClick={() =>{}}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Total Students"
          value={students?.length}
          subtitle="+100 this year"
          icon={< ClipboardList className="text-blue-600" />}
          bgColor="bg-blue-100"
        />

        <StatCard
          title="Total Teachers"
          value={teachers?.length}
          subtitle="Highly Qualified"
          icon={<MessageSquare className="text-purple-600" />}
          bgColor="bg-purple-100"
        />

        <StatCard
          title="Total Doubts"
          value={doubts?.length}
          subtitle={
            doubts?.length>10? "Higher doubts": "Lesser Doubts"
          }
          icon={<BookOpen className="text-green-600" />}
          bgColor="bg-green-100"
        />

         <StatCard
          title="Total Videos"
          value="6"
          subtitle="Active learning"
          icon={<BookOpen className="text-green-600" />}
          bgColor="bg-green-100"
        />
      </div>

    </div>
  )
}

export default AdminDashboard
