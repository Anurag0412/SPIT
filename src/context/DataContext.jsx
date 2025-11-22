import { createContext, useContext, useState } from 'react'

const DataContext = createContext()

// Sample data
const initialReceipts = [
  {
    id: 1,
    reference: 'WH/IN/0001',
    from: 'Supplier A',
    to: 'Main Warehouse',
    contact: 'supplier@example.com',
    scheduleDate: '2024-01-15',
    status: 'Draft',
    responsible: 'John Doe',
    products: [{ product: 'DESK001', name: 'Desk', quantity: 10 }]
  },
  {
    id: 2,
    reference: 'WH/IN/0002',
    from: 'Supplier B',
    to: 'Main Warehouse',
    contact: 'supplierb@example.com',
    scheduleDate: '2024-01-16',
    status: 'Ready',
    responsible: 'John Doe',
    products: [{ product: 'TABLE001', name: 'Table', quantity: 5 }]
  },
  {
    id: 3,
    reference: 'WH/IN/0003',
    from: 'Supplier C',
    to: 'Main Warehouse',
    contact: 'supplierc@example.com',
    scheduleDate: '2024-01-14',
    status: 'Done',
    responsible: 'John Doe',
    products: [{ product: 'CHAIR001', name: 'Chair', quantity: 20 }]
  },
  {
    id: 4,
    reference: 'WH/IN/0004',
    from: 'Supplier A',
    to: 'Main Warehouse',
    contact: 'supplier@example.com',
    scheduleDate: '2024-01-17',
    status: 'Draft',
    responsible: 'John Doe',
    products: [{ product: 'DESK001', name: 'Desk', quantity: 15 }]
  }
]

const initialDeliveries = [
  {
    id: 1,
    reference: 'WH/OUT/0001',
    from: 'Main Warehouse',
    to: 'Customer A',
    contact: 'customer@example.com',
    scheduleDate: '2024-01-18',
    status: 'Draft',
    deliveryAddress: '123 Main St, City',
    responsible: 'John Doe',
    operationType: 'Standard',
    products: [{ product: 'DESK001', name: 'Desk', quantity: 6 }]
  },
  {
    id: 2,
    reference: 'WH/OUT/0002',
    from: 'Main Warehouse',
    to: 'Customer B',
    contact: 'customerb@example.com',
    scheduleDate: '2024-01-19',
    status: 'Waiting',
    deliveryAddress: '456 Oak Ave, City',
    responsible: 'John Doe',
    operationType: 'Express',
    products: [{ product: 'TABLE001', name: 'Table', quantity: 10 }]
  },
  {
    id: 3,
    reference: 'WH/OUT/0003',
    from: 'Main Warehouse',
    to: 'Customer C',
    contact: 'customerc@example.com',
    scheduleDate: '2024-01-20',
    status: 'Ready',
    deliveryAddress: '789 Pine Rd, City',
    responsible: 'John Doe',
    operationType: 'Standard',
    products: [{ product: 'CHAIR001', name: 'Chair', quantity: 30 }]
  }
]

const initialStock = [
  { id: 1, product: 'DESK001', name: 'Desk', cost: 3000, onHand: 50, free: 45 },
  { id: 2, product: 'TABLE001', name: 'Table', cost: 3000, onHand: 50, free: 50 },
  { id: 3, product: 'CHAIR001', name: 'Chair', cost: 1500, onHand: 100, free: 80 }
]

const initialMoves = [
  {
    id: 1,
    reference: 'WH/IN/0001',
    date: '2024-01-10',
    contact: 'supplier@example.com',
    from: 'Supplier A',
    to: 'Main Warehouse',
    quantity: 10,
    status: 'Done',
    product: 'DESK001',
    type: 'in'
  },
  {
    id: 2,
    reference: 'WH/OUT/0001',
    date: '2024-01-12',
    contact: 'customer@example.com',
    from: 'Main Warehouse',
    to: 'Customer A',
    quantity: 5,
    status: 'Done',
    product: 'DESK001',
    type: 'out'
  }
]

const initialWarehouses = [
  { id: 1, name: 'Main Warehouse', shortCode: 'WH-MAIN', address: '123 Industrial Blvd' }
]

const initialLocations = [
  { id: 1, name: 'Aisle 1', shortCode: 'A1', warehouse: 'Main Warehouse' },
  { id: 2, name: 'Aisle 2', shortCode: 'A2', warehouse: 'Main Warehouse' }
]

export function DataProvider({ children }) {
  const [receipts, setReceipts] = useState(initialReceipts)
  const [deliveries, setDeliveries] = useState(initialDeliveries)
  const [stock, setStock] = useState(initialStock)
  const [moves, setMoves] = useState(initialMoves)
  const [warehouses, setWarehouses] = useState(initialWarehouses)
  const [locations, setLocations] = useState(initialLocations)

  const updateReceipt = (id, updates) => {
    setReceipts(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r))
  }

  const addReceipt = (receipt) => {
    const newId = Math.max(...receipts.map(r => r.id), 0) + 1
    const newRef = `WH/IN/${String(newId).padStart(4, '0')}`
    setReceipts(prev => [...prev, { ...receipt, id: newId, reference: newRef }])
    return newId
  }

  const updateDelivery = (id, updates) => {
    setDeliveries(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d))
  }

  const addDelivery = (delivery) => {
    const newId = Math.max(...deliveries.map(d => d.id), 0) + 1
    const newRef = `WH/OUT/${String(newId).padStart(4, '0')}`
    setDeliveries(prev => [...prev, { ...delivery, id: newId, reference: newRef }])
    return newId
  }

  const updateStock = (id, updates) => {
    setStock(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s))
  }

  const addMove = (move) => {
    const newId = Math.max(...moves.map(m => m.id), 0) + 1
    setMoves(prev => [...prev, { ...move, id: newId }])
  }

  const addWarehouse = (warehouse) => {
    const newId = Math.max(...warehouses.map(w => w.id), 0) + 1
    setWarehouses(prev => [...prev, { ...warehouse, id: newId }])
  }

  const addLocation = (location) => {
    const newId = Math.max(...locations.map(l => l.id), 0) + 1
    setLocations(prev => [...prev, { ...location, id: newId }])
  }

  const updateLocation = (id, updates) => {
    setLocations(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l))
  }

  const deleteLocation = (id) => {
    setLocations(prev => prev.filter(l => l.id !== id))
  }

  return (
    <DataContext.Provider
      value={{
        receipts,
        deliveries,
        stock,
        moves,
        warehouses,
        locations,
        updateReceipt,
        addReceipt,
        updateDelivery,
        addDelivery,
        updateStock,
        addMove,
        addWarehouse,
        addLocation,
        updateLocation,
        deleteLocation
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext)
}

