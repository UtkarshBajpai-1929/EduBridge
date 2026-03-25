import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RegisterSchool from '../pages/RegisterSchool';
import RegisterUser from '../pages/RegisterUser';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
       <Route path='/register-school' element={<RegisterSchool/>}/>
        <Route path='/register-user' element={<RegisterUser/>}/>
    </Routes>
  )
}

export default AppRoutes;
