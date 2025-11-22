import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useData } from '../../context/DataContext'
import { useAuth } from '../../context/AuthContext'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, CheckCircle, AlertTriangle, ChevronRight } from 'lucide-react'

function DeliveryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deliveries, updateDelivery, addDelivery, stock } = useData()
  const { user } = useAuth()
  const isNew = id === 'new'

  const [formData, setFormData] = useState({
    reference: '',
    from: 'Main Warehouse',
    to: '',
    deliveryAddress: '',
    scheduleDate: new Date().toISOString().split('T')[0],
    responsible: user?.name || '',
    operationType: 'Standard',
    products: [{ product: 'DESK001', name: 'Desk', quantity: 6 }]
  })

  useEffect(() => {
    if (!isNew && deliveries.length > 0) {
      const delivery = deliveries.find(d => d.id === parseInt(id))
      if (delivery) {
        setFormData(delivery)
      }
    } else if (isNew) {
      const newId = Math.max(...deliveries.map(d => d.id), 0) + 1
      setFormData(prev => ({
        ...prev,
        reference: `WH/OUT/${String(newId).padStart(4, '0')}`
      }))
    }
  }, [id, isNew, deliveries])

  const handleStatusChange = (newStatus) => {
    if (isNew) {
      const newId = addDelivery({ ...formData, status: newStatus })
      navigate(`/deliveries/${newId}`)
    } else {
      updateDelivery(parseInt(id), { status: newStatus })
    }
  }

  const getCurrentDelivery = () => {
    if (isNew) return { status: 'Draft' }
    return deliveries.find(d => d.id === parseInt(id)) || { status: 'Draft' }
  }

  const currentDelivery = getCurrentDelivery()
  const status = currentDelivery.status

  const statusFlow = ['Draft', 'Waiting', 'Ready', 'Done']
  const currentIndex = statusFlow.indexOf(status)

  const handleAddProduct = () => {
    setFormData(prev => ({
      ...prev,
      products: [...prev.products, { product: '', name: '', quantity: 1 }]
    }))
  }

  const handleProductChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      )
    }))
  }

  const checkStock = (productCode, quantity) => {
    const stockItem = stock.find(s => s.product === productCode)
    if (!stockItem) return { available: 0, insufficient: true }
    return {
      available: stockItem.free,
      insufficient: stockItem.free < quantity
    }
  }

  return (
    <div className="space-y-6">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/deliveries')}
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Deliveries</span>
      </motion.button>

      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">Delivery</h1>
          <p className="text-gray-400">{formData.reference}</p>
        </motion.div>

        <div className="flex items-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/deliveries/new')}
            className="px-4 py-2 rounded-lg glass hover:bg-white/5 text-white"
          >
            New
          </motion.button>

          {status === 'Ready' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStatusChange('Done')}
              className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Validate</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Status Indicator */}
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Status</h2>
        </div>
        <div className="flex items-center space-x-2">
          {statusFlow.map((s, index) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex items-center flex-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    index <= currentIndex
                      ? 'bg-accent text-white'
                      : 'bg-white/5 text-gray-500'
                  }`}
                >
                  {index + 1}
                </motion.div>
                <div className="ml-3">
                  <div className={`font-medium ${index <= currentIndex ? 'text-white' : 'text-gray-500'}`}>
                    {s}
                  </div>
                  {s === 'Draft' && <div className="text-xs text-gray-400">Initial state</div>}
                  {s === 'Waiting' && <div className="text-xs text-gray-400">Waiting for stock</div>}
                  {s === 'Ready' && <div className="text-xs text-gray-400">Ready to deliver</div>}
                  {s === 'Done' && <div className="text-xs text-gray-400">Delivered</div>}
                </div>
              </div>
              {index < statusFlow.length - 1 && (
                <ChevronRight className="w-5 h-5 text-gray-500 mx-2" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-2xl p-6"
          >
            <h2 className="text-lg font-semibold text-white mb-4">Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Reference</label>
                <input
                  type="text"
                  value={formData.reference}
                  readOnly
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Delivery Address</label>
                <input
                  type="text"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, deliveryAddress: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="123 Main St, City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Responsible</label>
                <input
                  type="text"
                  value={formData.responsible}
                  onChange={(e) => setFormData(prev => ({ ...prev, responsible: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Schedule Date</label>
                <input
                  type="date"
                  value={formData.scheduleDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduleDate: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Operation Type</label>
                <select
                  value={formData.operationType}
                  onChange={(e) => setFormData(prev => ({ ...prev, operationType: e.target.value }))}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="Standard">Standard</option>
                  <option value="Express">Express</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-strong rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Products</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.products.map((product, index) => {
                    const stockCheck = checkStock(product.product, product.quantity)
                    return (
                      <tr key={index} className={`border-b ${stockCheck.insufficient ? 'border-red-500/50 bg-red-500/5' : 'border-white/5'}`}>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            value={product.product ? `[${product.product}] ${product.name}` : ''}
                            onChange={(e) => {
                              const match = e.target.value.match(/\[(\w+)\]\s*(.+)/)
                              if (match) {
                                handleProductChange(index, 'product', match[1])
                                handleProductChange(index, 'name', match[2])
                              } else {
                                handleProductChange(index, 'name', e.target.value)
                              }
                            }}
                            className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                            placeholder="[DESK001] Desk"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              value={product.quantity}
                              onChange={(e) => handleProductChange(index, 'quantity', parseInt(e.target.value) || 0)}
                              className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-accent"
                              min="1"
                            />
                            {stockCheck.insufficient && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center space-x-1 text-red-400"
                                title={`Only ${stockCheck.available} available`}
                              >
                                <AlertTriangle className="w-4 h-4" />
                              </motion.div>
                            )}
                          </div>
                          {stockCheck.insufficient && (
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-xs text-red-400 mt-1"
                            >
                              Insufficient stock. Available: {stockCheck.available}
                            </motion.p>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                  <tr>
                    <td colSpan={2} className="px-4 py-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAddProduct}
                        className="w-full px-4 py-2 rounded-lg glass hover:bg-white/5 text-gray-300 hover:text-white flex items-center justify-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>New Product</span>
                      </motion.button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DeliveryDetail

