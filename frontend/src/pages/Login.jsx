import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/AuthContext'
import { API_BASE_URL } from '../config';

const Login = () => {
  const [form, setForm] = useState({
    email : '',
    password : ''
  })

  const {login} = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const submithandler = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, form)
      
      if(res.data.token){
        localStorage.setItem('token', res.data.token); 
        localStorage.setItem('user', JSON.stringify(res.data.user))
        login(res.data.user, res.data.token)
        localStorage.setItem('token', res.data.token)
        navigate('/dashboard')
      }
      else{
        console.log('no token')
      }
    } 
    catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div  className="min-h-screen flex items-center justify-center bg-[#FFF9F3]  px-4 ">
      <div className="bg-[#F5F1EB] shadow-md rounded-xl w-full max-w-md p-8">
      <h1 className="text-2xl font-bold text-center text-[#4A4A48] mb-4">Login</h1>

      <form onSubmit={submithandler} className="space-y-4">
        <input type="email" placeholder='Email'  onChange={(e) => setForm({...form, email : e.target.value})} className="border border-[#EDE7E3] p-2 rounded-lg focus:outline-none focus:border-[#A8DADC] bg-white w-full"/>
    
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Password"
            className="border border-[#EDE7E3] p-2 rounded-lg focus:outline-none focus:border-[#A8DADC] bg-white w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-[#7D7461] hover:text-[#4A4A48]"
          >
            {showPassword ? <i className="ri-eye-off-line"></i> : <i className="ri-eye-line"></i>}
          </button>
        </div>

        <button type="submit" className="bg-cyan-700 text-white p-2 rounded w-full " >Login</button>

      </form>

      <p className="mt-4 text-center text-gray-600">
      Not a user?{' '}
      <span
        className="text-blue-500 hover:underline cursor-pointer"
        onClick={() => navigate('/register')}
      >
        Register
      </span>
    </p>
      </div>
    </div>
  )
}

export default Login
