import React from 'react'
import { createContext, useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { API_BASE_URL } from './config';

const AuthContext = createContext()

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
    const [loading, setLoading] = useState(true)

    const token = localStorage.getItem('token')

    useEffect(() => {

      const fetchUser =  async () => {
        if(!token){
          setLoading(false)
          return
        }

        try {
          const res = await axios.get(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          setUser(res.data)
          setLoading(false)
          localStorage.setItem('user', JSON.stringify(res.data)); 

        } catch (error) {
          console.error('Error fetching user:', error)
          setLoading(false)
        }
      }

      fetchUser()
    }, [token])

    const login = (userdata, token) => {
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userdata));

      setUser(userdata)
    }

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user');

      setUser(null)
    }

    return (
      <AuthContext.Provider value={{user, login, logout, loading}}>
        {children}
      </AuthContext.Provider>
    )
}



 export const useAuth = () => useContext(AuthContext)
 export { AuthProvider }
