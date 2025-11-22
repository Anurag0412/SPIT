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
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Overview of your inventory operations</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Receipt Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/receipts')}
          className="glass-strong rounded-2xl p-6 cursor-pointer transition-all hover:shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Receipt</h2>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-dark/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-accent" />
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-accent to-accent-dark text-white font-semibold text-sm">
              {receiptStats.toReceive} to receive
            </div>
          </motion.div>

          <div className="space-y-2 text-sm">
            {receiptStats.late > 0 && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span>{receiptStats.late} Late</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{receiptStats.operations} operations</span>
            </div>
          </div>
        </motion.div>

        {/* Delivery Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02, y: -5 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/deliveries')}
          className="glass-strong rounded-2xl p-6 cursor-pointer transition-all hover:shadow-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Delivery</h2>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-dark/20 flex items-center justify-center">
              <Package className="w-6 h-6 text-accent" />
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block mb-4"
          >
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-accent to-accent-dark text-white font-semibold text-sm">
              {deliveryStats.toDeliver} to Deliver
            </div>
          </motion.div>

          <div className="space-y-2 text-sm">
            {deliveryStats.late > 0 && (
              <div className="flex items-center space-x-2 text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span>{deliveryStats.late} Late</span>
              </div>
            )}
            {deliveryStats.waiting > 0 && (
              <div className="flex items-center space-x-2 text-yellow-400">
                <Clock className="w-4 h-4" />
                <span>{deliveryStats.waiting} waiting</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{deliveryStats.operations} operations</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard

