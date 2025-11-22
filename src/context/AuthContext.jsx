import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true'
  })
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : { name: 'John Doe', email: 'john@example.com' }
  })

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated)
    localStorage.setItem('user', JSON.stringify(user))
  }, [isAuthenticated, user])

  const login = (loginId, password) => {
    // Simulate login
    setIsAuthenticated(true)
    setUser({ name: 'John Doe', email: loginId })
    return true
  }

  const signup = (loginId, email, password) => {
    // Simulate signup
    setIsAuthenticated(true)
    setUser({ name: loginId, email })
    return true
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

