import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, AlertCircle } from 'lucide-react'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loginId, setLoginId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (loginId && password) {
        login(loginId, password)
        navigate('/')
      } else {
        setError('Please enter both Login ID and Password')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="glass-strong rounded-2xl p-8 shadow-2xl"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          <h1 className="text-2xl font-bold text-center mb-8 text-white">Sign In</h1>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50 flex items-center space-x-2 text-red-300"
              >
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Login ID
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Enter your login ID"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Enter your password"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-accent-dark text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'SIGN IN'}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <Link
              to="/forgot-password"
              className="hover:text-accent transition-colors"
            >
              Forgot Password?
            </Link>
            {' | '}
            <Link
              to="/signup"
              className="hover:text-accent transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Login

