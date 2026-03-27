import React from 'react'
import {useSelector} from 'react-redux';
import Loader from '../components/Loader';
import {Navigate} from 'react-router-dom'
const ProtectedRoutes = ({children, roles}) => {
  const {isAuthenticated,user, loading} = useSelector(state=>state.auth);

  if(loading) return <Loader/>
  if(user){
  if(roles && !roles.includes(user.role)){
    return null
  }
}
  if(!isAuthenticated){
    return <Navigate to='/login'/>;
  }

  return children
}

export default ProtectedRoutes
