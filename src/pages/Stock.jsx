import { useState } from 'react'
import { useData } from '../context/DataContext'
import { motion } from 'framer-motion'
import { Search, Edit2, Check, X } from 'lucide-react'

function Stock() {
  const { stock, updateStock } = useData()
  const [searchQuery, setSearchQuery] = useState('')
  const [editing, setEditing] = useState(null)
  const [editValues, setEditValues] = useState({})

  const filteredStock = stock.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.product.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEdit = (item) => {
    setEditing(item.id)
    setEditValues({ cost: item.cost, onHand: item.onHand, free: item.free })
  }

  const handleSave = (id) => {
    updateStock(id, editValues)
    setEditing(null)
    setEditValues({})
  }

  const handleCancel = () => {
    setEditing(null)
    setEditValues({})
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Stock</h1>
          <p className="text-gray-400">Manage inventory levels and costs</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 rounded-lg glass border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent w-64"
          />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong rounded-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Product</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Per Unit Cost</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">On Hand</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Free to Use</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStock.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                  className="border-b border-white/5"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-white">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.product}</div>
                  </td>
                  <td className="px-6 py-4">
                    {editing === item.id ? (
                      <input
                        type="number"
                        value={editValues.cost}
                        onChange={(e) => setEditValues(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                        className="w-24 px-2 py-1 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    ) : (
                      <span className="text-gray-300">{item.cost} Rs</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editing === item.id ? (
                      <input
                        type="number"
                        value={editValues.onHand}
                        onChange={(e) => setEditValues(prev => ({ ...prev, onHand: parseInt(e.target.value) || 0 }))}
                        className="w-24 px-2 py-1 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    ) : (
                      <span className="text-gray-300">{item.onHand}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editing === item.id ? (
                      <input
                        type="number"
                        value={editValues.free}
                        onChange={(e) => setEditValues(prev => ({ ...prev, free: parseInt(e.target.value) || 0 }))}
                        className="w-24 px-2 py-1 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                      />
                    ) : (
                      <span className="text-gray-300">{item.free}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {editing === item.id ? (
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSave(item.id)}
                          className="p-1 rounded text-green-400 hover:bg-green-500/20"
                        >
                          <Check className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleCancel}
                          className="p-1 rounded text-red-400 hover:bg-red-500/20"
                        >
                          <X className="w-4 h-4" />
                        </motion.button>
                      </div>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded glass hover:bg-white/5 text-gray-300 hover:text-white"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                    )}
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

export default Stock

