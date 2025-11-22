import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Package, CheckCircle, AlertCircle, Mail } from 'lucide-react'

function ForgotPassword() {
  const [step, setStep] = useState(1) // 1: email, 2: OTP, 3: new password
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleSendOTP = (e) => {
    e.preventDefault()
    if (email) {
      setMessage({ type: 'success', text: 'OTP sent to your email!' })
      setTimeout(() => {
        setStep(2)
        setMessage({ type: '', text: '' })
      }, 1500)
    } else {
      setMessage({ type: 'error', text: 'Please enter your email' })
    }
  }

  const handleVerifyOTP = (e) => {
    e.preventDefault()
    if (otp === '123456') { // Simulated OTP
      setMessage({ type: 'success', text: 'OTP verified!' })
      setTimeout(() => {
        setStep(3)
        setMessage({ type: '', text: '' })
      }, 1500)
    } else {
      setMessage({ type: 'error', text: 'Invalid OTP. Try 123456' })
    }
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' })
      return
    }
    if (newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' })
      return
    }
    setMessage({ type: 'success', text: 'Password reset successfully!' })
    setTimeout(() => {
      // Navigate to login
    }, 2000)
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

          <h1 className="text-2xl font-bold text-center mb-8 text-white">Reset Password</h1>

          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`mb-4 p-3 rounded-lg flex items-center space-x-2 ${
                  message.type === 'success'
                    ? 'bg-green-500/20 border border-green-500/50 text-green-300'
                    : 'bg-red-500/20 border border-red-500/50 text-red-300'
                }`}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span className="text-sm">{message.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="email"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleSendOTP}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email ID
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="Enter your email"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-accent-dark text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Send OTP
                </motion.button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.form
                key="otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleVerifyOTP}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter OTP
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all text-center text-2xl tracking-widest"
                    placeholder="000000"
                    maxLength={6}
                  />
                  <p className="mt-2 text-xs text-gray-400 text-center">
                    Enter the 6-digit code sent to {email}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-accent-dark text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Verify OTP
                </motion.button>
              </motion.form>
            )}

            {step === 3 && (
              <motion.form
                key="password"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleResetPassword}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    New Password
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                    placeholder="Confirm new password"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-accent to-accent-dark text-white font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  Reset Password
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-6 text-center text-sm text-gray-400">
            Remember your password?{' '}
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

export default ForgotPassword

