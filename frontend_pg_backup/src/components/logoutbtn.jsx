import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const logoutbtn = () => {
    const {logout} = useAuth()
    const navigate = useNavigate()
    const handlelogout = () => {
        logout()
        navigate('/login')
    }
  return (
    <button onClick={handlelogout} className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
    </button>
  )
}

export default logoutbtn
