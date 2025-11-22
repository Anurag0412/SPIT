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
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Top Navigation Bar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-strong border-b border-white/20 px-6 py-4 sticky top-0 z-50 backdrop-blur-xl"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 rounded-xl bg-gradient-accent flex items-center justify-center shadow-glow relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
              />
              <Package className="w-6 h-6 text-white relative z-10" />
            </motion.div>
            <span className="text-xl font-bold text-gradient">Inventory Pro</span>
          </Link>

          {/* Menu Items */}
          <div className="hidden md:flex items-center space-x-2">
            {menuItems
              .filter(item => !item.hidden)
              .map((item, index) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path || 
                  (item.path === '/receipts' && (location.pathname.startsWith('/receipts') || location.pathname.startsWith('/deliveries'))) ||
                  (item.path === '/settings/warehouse' && location.pathname.startsWith('/settings'))
                
                return (
                  <Link key={item.path} to={item.path}>
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-all relative overflow-hidden ${
                        isActive
                          ? 'bg-gradient-accent text-white shadow-glow'
                          : 'text-gray-300 hover:text-white glass-hover'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-accent rounded-xl"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                      <Icon className={`w-4 h-4 relative z-10 ${isActive ? 'text-white' : ''}`} />
                      <span className={`text-sm font-semibold relative z-10 ${isActive ? 'text-white' : ''}`}>
                        {item.label}
                      </span>
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
              className="flex items-center space-x-2 px-3 py-2 rounded-xl glass-hover transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
                <User className="w-5 h-5 text-white relative z-10" />
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${userDropdownOpen ? 'rotate-180' : ''}`} />
            </motion.button>

            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-56 glass-strong rounded-2xl shadow-2xl border border-white/20 overflow-hidden z-50"
                >
                  <div className="py-2">
                    <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-accent/10 to-primary/10">
                      <p className="text-sm font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-gray-300 mt-0.5">{user?.email}</p>
                    </div>
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setUserDropdownOpen(false)
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-gray-300 hover:bg-white/10 hover:text-white transition-colors flex items-center space-x-2"
                    >
                      <User className="w-4 h-4" />
                      <span>My Profile</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLogout}
                      className="w-full px-4 py-3 text-left text-sm text-danger hover:bg-danger/10 hover:text-danger transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </motion.button>
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
        transition={{ delay: 0.1, duration: 0.5 }}
        className="flex-1 p-6 md:p-8"
      >
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </motion.main>
    </div>
  )
}

export default AppLayout

