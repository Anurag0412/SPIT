import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Table, LayoutGrid } from 'lucide-react'

function DeliveriesList() {
  const navigate = useNavigate()
  const { deliveries } = useData()
  const [viewMode, setViewMode] = useState('table')
  const [searchQuery, setSearchQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)

  const filteredDeliveries = deliveries.filter(delivery =>
    delivery.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    delivery.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    delivery.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    delivery.contact.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status) => {
    const colors = {
      Draft: 'bg-gray-500/20 text-gray-300 border-gray-500/50',
      Waiting: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      Ready: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      Done: 'bg-green-500/20 text-green-300 border-green-500/50',
      Canceled: 'bg-red-500/20 text-red-300 border-red-500/50'
    }
    return colors[status] || colors.Draft
  }

  const groupedByStatus = {
    Draft: filteredDeliveries.filter(d => d.status === 'Draft'),
    Waiting: filteredDeliveries.filter(d => d.status === 'Waiting'),
    Ready: filteredDeliveries.filter(d => d.status === 'Ready'),
    Done: filteredDeliveries.filter(d => d.status === 'Done'),
    Canceled: filteredDeliveries.filter(d => d.status === 'Canceled')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl font-bold text-gradient mb-3">Delivery</h1>
          <p className="text-gray-300 text-lg">Manage outgoing inventory</p>
        </motion.div>

        <div className="flex items-center space-x-3">
          <AnimatePresence>
            {showSearch && (
              <motion.input
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 250, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search deliveries..."
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent"
                autoFocus
              />
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-lg glass hover:bg-white/5 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-300" />
          </motion.button>

          <div className="flex items-center glass rounded-xl p-1.5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setViewMode('table')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'table' 
                  ? 'bg-gradient-accent text-white shadow-glow' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Table className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setViewMode('kanban')}
              className={`p-2.5 rounded-lg transition-all ${
                viewMode === 'kanban' 
                  ? 'bg-gradient-accent text-white shadow-glow' 
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/deliveries/new')}
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
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'table' ? (
          <motion.div
            key="table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass-strong rounded-2xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-secondary/10 via-primary/10 to-accent/10 border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Reference</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">From</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">To</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Schedule Date</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeliveries.map((delivery, index) => (
                    <motion.tr
                      key={delivery.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ 
                        backgroundColor: 'rgba(139, 92, 246, 0.08)',
                        x: 4,
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => navigate(`/deliveries/${delivery.id}`)}
                      className="border-b border-white/5 cursor-pointer transition-all group relative"
                    >
                      <td className="px-6 py-4">
                        <span className="text-white font-semibold group-hover:text-secondary transition-colors">
                          {delivery.reference}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300 group-hover:text-white transition-colors">{delivery.from}</td>
                      <td className="px-6 py-4 text-gray-300 group-hover:text-white transition-colors">{delivery.to}</td>
                      <td className="px-6 py-4 text-gray-300 group-hover:text-white transition-colors">{delivery.contact}</td>
                      <td className="px-6 py-4 text-gray-300 group-hover:text-white transition-colors">{delivery.scheduleDate}</td>
                      <td className="px-6 py-4">
                        <motion.span
                          whileHover={{ scale: 1.15, rotate: 2 }}
                          className={`status-badge ${getStatusColor(delivery.status)} shadow-lg`}
                        >
                          {delivery.status}
                        </motion.span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="kanban"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {Object.entries(groupedByStatus).map(([status, items]) => (
              <div key={status} className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                  {status} ({items.length})
                </h3>
                <div className="space-y-2">
                  {items.map((delivery) => (
                    <motion.div
                      key={delivery.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate(`/deliveries/${delivery.id}`)}
                      className="glass rounded-lg p-4 cursor-pointer"
                    >
                      <div className="font-medium text-white mb-1">{delivery.reference}</div>
                      <div className="text-xs text-gray-400">{delivery.to}</div>
                      <div className="text-xs text-gray-400 mt-1">{delivery.scheduleDate}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DeliveriesList

