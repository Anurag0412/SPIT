import { useState } from 'react'
import { useData } from '../../context/DataContext'
import { motion } from 'framer-motion'
import { MapPin, Plus, Save, Edit2, Trash2, X, Check } from 'lucide-react'

function LocationsSettings() {
  const { locations, warehouses, addLocation, updateLocation, deleteLocation } = useData()
  const [formData, setFormData] = useState({
    name: '',
    shortCode: '',
    warehouse: warehouses[0]?.name || ''
  })
  const [editing, setEditing] = useState(null)
  const [editValues, setEditValues] = useState({})
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.shortCode && formData.warehouse) {
      addLocation(formData)
      setFormData({ name: '', shortCode: '', warehouse: warehouses[0]?.name || '' })
      setMessage('Location added successfully!')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  const handleEdit = (location) => {
    setEditing(location.id)
    setEditValues({ name: location.name, shortCode: location.shortCode, warehouse: location.warehouse })
  }

  const handleSaveEdit = (id) => {
    updateLocation(id, editValues)
    setEditing(null)
    setEditValues({})
    setMessage('Location updated successfully!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      deleteLocation(id)
      setMessage('Location deleted successfully!')
      setTimeout(() => setMessage(''), 3000)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Locations Settings</h1>
        <p className="text-gray-400">Manage warehouse locations</p>
      </motion.div>

      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-300 text-sm"
        >
          {message}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent-dark/20 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <h2 className="text-xl font-semibold text-white">Add Location</h2>
          </div>

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
                placeholder="Aisle 1"
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
                placeholder="A1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Warehouse
              </label>
              <select
                value={formData.warehouse}
                onChange={(e) => setFormData(prev => ({ ...prev, warehouse: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                required
              >
                {warehouses.map(wh => (
                  <option key={wh.id} value={wh.name}>{wh.name}</option>
                ))}
              </select>
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
              <span className="relative z-10">Save Location</span>
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
          <h2 className="text-xl font-semibold text-white mb-4">All Locations</h2>
          <div className="space-y-3">
            {locations.map((location, index) => (
              <motion.div
                key={location.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="glass rounded-lg p-4"
              >
                {editing === location.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editValues.name}
                      onChange={(e) => setEditValues(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <input
                      type="text"
                      value={editValues.shortCode}
                      onChange={(e) => setEditValues(prev => ({ ...prev, shortCode: e.target.value.toUpperCase() }))}
                      className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <select
                      value={editValues.warehouse}
                      onChange={(e) => setEditValues(prev => ({ ...prev, warehouse: e.target.value }))}
                      className="w-full px-3 py-2 rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                    >
                      {warehouses.map(wh => (
                        <option key={wh.id} value={wh.name}>{wh.name}</option>
                      ))}
                    </select>
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleSaveEdit(location.id)}
                        className="p-2 rounded text-green-400 hover:bg-green-500/20"
                      >
                        <Check className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setEditing(null)}
                        className="p-2 rounded text-red-400 hover:bg-red-500/20"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">{location.name}</div>
                        <div className="text-sm text-gray-400 mt-1">{location.shortCode}</div>
                        <div className="text-xs text-gray-500 mt-1">{location.warehouse}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(location)}
                          className="p-2 rounded glass hover:bg-white/5 text-gray-300 hover:text-white"
                        >
                          <Edit2 className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(location.id)}
                          className="p-2 rounded glass hover:bg-red-500/20 text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LocationsSettings

