import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegisterSchool from '../pages/RegisterSchool';
import RegisterUser from '../pages/RegisterUser';
import AdminDashboard from '../pages/AdminDashboard';
import StudentDashboard from '../pages/StudentDashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import ProtectedRoutes from './ProtectedRoutes';
import StudentLayout from '../components/StudentLayout';
const AppRoutes = () => {
  return (
    <Routes>
      
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/register-school' element={<RegisterSchool/>}/>
      <Route path='/register-user' element={<RegisterUser/>}/>
      <Route path='/admin/dashboard' element={<ProtectedRoutes roles={["admin"]}><AdminDashboard/></ProtectedRoutes>} />
      <Route path='/teacher/dashboard' element={<ProtectedRoutes roles={["teacher"]}><TeacherDashboard/></ProtectedRoutes>} />
      <Route path='/student' element={<StudentLayout/>}>
       <Route index element={<Navigate to="dashboard" replace />} />
         <Route path='/student/dashboard' element={<ProtectedRoutes roles={["student"]}> <StudentDashboard/></ProtectedRoutes>} />
      </Route>
    </Routes>
  )
}

export default AppRoutes;
