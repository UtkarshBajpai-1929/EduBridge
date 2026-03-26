import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegisterSchool from '../pages/RegisterSchool';
import RegisterUser from '../pages/RegisterUser';
import AdminDashboard from '../pages/AdminDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
       <Route path='/register-school' element={<RegisterSchool/>}/>
        <Route path='/register-user' element={<RegisterUser/>}/>
      <Route path='/admin-dashboard' element={<AdminDashboard/>} />
      <Route path='/teacher-dashboard' element={<TeacherDashboard/>} />
      <Route path='/student-dashboard' element={<StudentDashboard/>} />
    </Routes>
  )
}

export default AppRoutes;
