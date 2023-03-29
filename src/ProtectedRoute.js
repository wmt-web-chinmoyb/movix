import React from 'react'
import { useNavigate } from 'react-router-dom'


const ProtectedRoute = ({children}) => {
    const navigate=useNavigate()
    const isLoggedin=localStorage.getItem("isLoggedin")
    if(!isLoggedin){
        return navigate("/login")
    }
  return  children
}

export default ProtectedRoute
