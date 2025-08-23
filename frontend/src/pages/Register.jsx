import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config';
const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    first_name : '',
    last_name : '',
    email : '',
    password : ''
  })
 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handlesubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true);

    try {const res = await axios.post(`${API_BASE_URL}/api/auth/register`, form)
      console.log("Register success:", res.data);
      console.log("yes")
      navigate('/login')
    }
    catch(error){
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message); 
      } else {
        alert("Something went wrong. Try again.");
      }
      console.log(error)
    }
    finally {
      setIsLoading(false);
    }

  }
  return (
    <div className = "min-h-screen flex items-center justify-center  bg-[#FFF9F3] px-4">
      <form onSubmit={handlesubmit} className="flex flex-col gap-4 bg-[#F5F1EB] p-6 rounded-md shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-[#4A4A48]">Register</h1>
        <input type="text" onChange={(e) => setForm({...form, first_name : e.target.value})}  placeholder='First Name' className="border border-[#EDE7E3] p-2 rounded-lg focus:outline-none focus:border-[#A8DADC] bg-white" />
        <input type="text" onChange={(e) => setForm({...form, last_name : e.target.value})}  placeholder='Last Name' className="border border-[#EDE7E3] p-2 rounded-lg focus:outline-none focus:border-[#A8DADC] bg-white" />
        <input type="email" onChange={(e) => setForm({...form, email : e.target.value})}   placeholder='Email' className="border border-[#EDE7E3] p-2 rounded-lg focus:outline-none focus:border-[#A8DADC] bg-white" />
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


        <button
  type="submit"
  className="bg-cyan-700 text-white p-2 rounded w-full flex items-center justify-center disabled={isLoading}">
    {isLoading ? (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        ) : (
          "Register"
        )}
</button>


        <p className="mt-4 text-center text-gray-600">
          Already have an account?{' '}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Log in
          </span>
          </p>
      </form>

    </div>
  )
}

export default Register
