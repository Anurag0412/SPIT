import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { motion } from 'framer-motion'
import { Warehouse as WarehouseIcon, Plus, Save } from 'lucide-react'

function WarehouseSettings() {
  const { warehouses, addWarehouse } = useData()
  const [formData, setFormData] = useState({
    name: '',
    shortCode: '',
    address: ''
  })
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.shortCode) {
      addWarehouse(formData)
      setFormData({ name: '', shortCode: '', address: '' })
      setMessage('Warehouse added successfully!')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Warehouse Settings</h1>
        <p className="text-gray-400">Manage warehouse information</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-dark/20 flex items-center justify-center">
              <WarehouseIcon className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-white">Add Warehouse</h2>
          </div>

          {message && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 text-sm"
            >
              {message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="Main Warehouse"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Short Code
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={formData.shortCode}
                onChange={(e) => setFormData(prev => ({ ...prev, shortCode: e.target.value.toUpperCase() }))}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                placeholder="WH-MAIN"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Address
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                placeholder="123 Industrial Blvd, City, State"
                rows={3}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-4 rounded-xl btn-primary text-white font-bold shadow-glow flex items-center justify-center space-x-2 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
              />
              <Save className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Save Warehouse</span>
            </motion.button>
          </form>
        </motion.div>

        {/* List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Existing Warehouses</h2>
          <div className="space-y-3">
            {warehouses.map((warehouse, index) => (
              <motion.div
                key={warehouse.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-lg p-4"
              >
                <div className="font-medium text-white">{warehouse.name}</div>
                <div className="text-sm text-gray-400 mt-1">{warehouse.shortCode}</div>
                {warehouse.address && (
                  <div className="text-xs text-gray-500 mt-1">{warehouse.address}</div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default WarehouseSettings

