import { useState } from 'react'
import { useData } from '../context/DataContext'
import { motion } from 'framer-motion'
import { Plus, Search, Filter } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

function MoveHistory() {
  const { moves } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredMoves = moves.filter(move => {
    const matchesSearch = 
      move.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
      move.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      move.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      move.to.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || move.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    const colors = {
      Done: 'bg-green-500/20 text-green-300 border-green-500/50',
      Pending: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      Canceled: 'bg-red-500/20 text-red-300 border-red-500/50'
    }
    return colors[status] || colors.Done
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold text-gradient mb-3">Move History</h1>
          <p className="text-gray-300 text-lg">Track all inventory movements</p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl btn-primary text-white font-bold flex items-center space-x-2 shadow-glow relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          />
          <Plus className="w-5 h-5 relative z-10" />
          <span className="relative z-10">NEW</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative flex-1 max-w-md"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by reference, contact, from, to..."
            className="w-full pl-10 pr-4 py-2 rounded-lg glass border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex items-center space-x-2"
        >
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg glass border border-white/10 text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">All Status</option>
            <option value="Done">Done</option>
            <option value="Pending">Pending</option>
            <option value="Canceled">Canceled</option>
          </select>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Reference</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">From</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">To</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Quantity</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMoves.map((move, index) => (
                <motion.tr
                  key={move.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ 
                    backgroundColor: move.type === 'in' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                  className={`border-b border-white/5 group ${
                    move.type === 'in' ? 'bg-green-500/5' : 'bg-red-500/5'
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="text-white font-semibold group-hover:text-accent transition-colors">
                      {move.reference}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300 group-hover:text-white transition-colors">{move.date}</td>
                  <td className="px-6 py-4 text-gray-300 group-hover:text-white transition-colors">{move.contact}</td>
                  <td className="px-6 py-4 text-gray-300 group-hover:text-white transition-colors">{move.from}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-300 group-hover:text-white transition-colors">{move.to}</span>
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className={`w-4 h-4 ${move.type === 'in' ? 'text-green-400' : 'text-red-400'}`} />
                      </motion.div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <motion.span
                      whileHover={{ scale: 1.2 }}
                      className={`font-bold text-lg ${move.type === 'in' ? 'text-green-400' : 'text-red-400'}`}
                    >
                      {move.type === 'in' ? '+' : '-'}{move.quantity}
                    </motion.span>
                  </td>
                  <td className="px-6 py-4">
                    <motion.span
                      whileHover={{ scale: 1.15, rotate: 2 }}
                      className={`status-badge ${getStatusColor(move.status)} shadow-lg`}
                    >
                      {move.status}
                    </motion.span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

export default MoveHistory

