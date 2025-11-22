import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, Package, Warehouse, History, Settings, 
  User, LogOut, ChevronDown, Search
} from 'lucide-react'

function AppLayout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/receipts', label: 'Operations', icon: Package },
    { path: '/deliveries', label: 'Operations', icon: Package, hidden: true },
    { path: '/stock', label: 'Stock', icon: Warehouse },
    { path: '/move-history', label: 'Move History', icon: History },
    { path: '/settings/warehouse', label: 'Settings', icon: Settings }
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-strong border-b border-white/10 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center"
            >
              <Package className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white">Inventory Pro</span>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems
              .filter(item => !item.hidden)
              .map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path || 
                  (item.path === '/receipts' && (location.pathname.startsWith('/receipts') || location.pathname.startsWith('/deliveries'))) ||
                  (item.path === '/settings/warehouse' && location.pathname.startsWith('/settings'))
                
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                        isActive
                          ? 'bg-accent text-white'
                          : 'text-gray-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
          </div>

          {/* User Avatar Dropdown */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 glass-strong rounded-lg shadow-xl border border-white/10 overflow-hidden z-50"
                >
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-white/10">
                      <p className="text-sm font-medium text-white">{user?.name}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false)
                        // Navigate to profile (not implemented)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      My Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      {/* Content Area */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 p-6"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  )
}

export default AppLayout

