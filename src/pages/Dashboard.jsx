import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'
import { motion } from 'framer-motion'
import { Package, Clock, AlertCircle } from 'lucide-react'

function Dashboard() {
  const navigate = useNavigate()
  const { receipts, deliveries } = useData()

  const receiptStats = {
    toReceive: receipts.filter(r => r.status === 'Ready' || r.status === 'Draft').length,
    late: receipts.filter(r => {
      if (r.status === 'Done') return false
      const scheduleDate = new Date(r.scheduleDate)
      const today = new Date()
      return scheduleDate < today
    }).length,
    operations: receipts.length
  }

  const deliveryStats = {
    toDeliver: deliveries.filter(d => d.status === 'Ready' || d.status === 'Waiting').length,
    late: deliveries.filter(d => {
      if (d.status === 'Done') return false
      const scheduleDate = new Date(d.scheduleDate)
      const today = new Date()
      return scheduleDate < today
    }).length,
    waiting: deliveries.filter(d => d.status === 'Waiting').length,
    operations: deliveries.length
  }

  return (
    <div className="space-y-8 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-gradient mb-3">Dashboard</h1>
        <p className="text-gray-300 text-lg">Overview of your inventory operations</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, x: -30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.03, y: -8, rotateY: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/receipts')}
          className="glass-strong rounded-3xl p-8 cursor-pointer card-glow relative overflow-hidden group"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Receipt</h2>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/30 via-accent/20 to-primary/30 flex items-center justify-center shadow-glow"
              >
                <Package className="w-8 h-8 text-accent" />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.08, x: 5 }}
              className="inline-block mb-6"
            >
              <div className="px-6 py-3 rounded-full bg-gradient-accent text-white font-bold text-base shadow-glow relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <span className="relative z-10">{receiptStats.toReceive} to receive</span>
              </div>
            </motion.div>

            <div className="space-y-3 text-sm">
              {receiptStats.late > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-danger/10 border border-danger/30"
                >
                  <AlertCircle className="w-5 h-5 text-danger animate-pulse" />
                  <span className="text-danger font-semibold">{receiptStats.late} Late</span>
                </motion.div>
              )}
              <div className="flex items-center space-x-3 text-gray-300">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-medium">{receiptStats.operations} operations</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delivery Card */}
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.03, y: -8, rotateY: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/deliveries')}
          className="glass-strong rounded-3xl p-8 cursor-pointer card-glow relative overflow-hidden group"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Delivery</h2>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary/30 via-secondary/20 to-accent/30 flex items-center justify-center shadow-glow-primary"
              >
                <Package className="w-8 h-8 text-secondary" />
              </motion.div>
            </div>

            <motion.div
              whileHover={{ scale: 1.08, x: 5 }}
              className="inline-block mb-6"
            >
              <div className="px-6 py-3 rounded-full bg-gradient-to-r from-secondary via-primary to-accent text-white font-bold text-base shadow-glow-primary relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5 }}
                />
                <span className="relative z-10">{deliveryStats.toDeliver} to Deliver</span>
              </div>
            </motion.div>

            <div className="space-y-3 text-sm">
              {deliveryStats.late > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-danger/10 border border-danger/30"
                >
                  <AlertCircle className="w-5 h-5 text-danger animate-pulse" />
                  <span className="text-danger font-semibold">{deliveryStats.late} Late</span>
                </motion.div>
              )}
              {deliveryStats.waiting > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-warning/10 border border-warning/30"
                >
                  <Clock className="w-5 h-5 text-warning" />
                  <span className="text-warning font-semibold">{deliveryStats.waiting} waiting</span>
                </motion.div>
              )}
              <div className="flex items-center space-x-3 text-gray-300">
                <Clock className="w-5 h-5 text-primary" />
                <span className="font-medium">{deliveryStats.operations} operations</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard

