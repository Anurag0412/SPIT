import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import ForgotPassword from './pages/auth/ForgotPassword'
import Dashboard from './pages/Dashboard'
import ReceiptsList from './pages/operations/ReceiptsList'
import ReceiptDetail from './pages/operations/ReceiptDetail'
import DeliveriesList from './pages/operations/DeliveriesList'
import DeliveryDetail from './pages/operations/DeliveryDetail'
import Stock from './pages/Stock'
import MoveHistory from './pages/MoveHistory'
import WarehouseSettings from './pages/settings/WarehouseSettings'
import LocationsSettings from './pages/settings/LocationsSettings'
import AppLayout from './components/AppLayout'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/receipts" element={<ReceiptsList />} />
                <Route path="/receipts/:id" element={<ReceiptDetail />} />
                <Route path="/deliveries" element={<DeliveriesList />} />
                <Route path="/deliveries/:id" element={<DeliveryDetail />} />
                <Route path="/stock" element={<Stock />} />
                <Route path="/move-history" element={<MoveHistory />} />
                <Route path="/settings/warehouse" element={<WarehouseSettings />} />
                <Route path="/settings/locations" element={<LocationsSettings />} />
              </Routes>
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <AppRoutes />
        </Router>
      </DataProvider>
    </AuthProvider>
  )
}

export default App

