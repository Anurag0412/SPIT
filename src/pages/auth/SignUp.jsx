import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { Package, CheckCircle, XCircle } from 'lucide-react'

function SignUp() {
  const navigate = useNavigate()
  const { signup } = useAuth()
  const [formData, setFormData] = useState({
    loginId: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validatePassword = (password) => {
    const rules = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password)
    }
    return rules
  }

  const passwordRules = validatePassword(formData.password)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.loginId) newErrors.loginId = 'Login ID is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    if (!Object.values(passwordRules).every(Boolean)) {
      newErrors.password = 'Password does not meet requirements'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      signup(formData.loginId, formData.email, formData.password)
      navigate('/')
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

          <h1 className="text-2xl font-bold text-center mb-8 text-white">Sign Up</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Login ID
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="loginId"
                value={formData.loginId}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Choose a login ID"
              />
              {errors.loginId && (
                <p className="mt-1 text-sm text-red-400">{errors.loginId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email ID
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Create a password"
              />
              {formData.password && (
                <div className="mt-2 space-y-1 text-xs">
                  <div className={`flex items-center space-x-2 ${passwordRules.length ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordRules.length ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${passwordRules.uppercase ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordRules.uppercase ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${passwordRules.lowercase ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordRules.lowercase ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>One lowercase letter</span>
                  </div>
                  <div className={`flex items-center space-x-2 ${passwordRules.number ? 'text-green-400' : 'text-gray-400'}`}>
                    {passwordRules.number ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>One number</span>
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Re-enter Password
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-accent-dark text-white font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'SIGN UP'}
            </motion.button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-accent hover:text-accent-light transition-colors"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default SignUp

