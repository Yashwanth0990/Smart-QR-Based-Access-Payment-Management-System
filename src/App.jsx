import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import TollManagement from './pages/TollManagement'
import ParkingManagement from './pages/ParkingManagement'
import AccessControl from './pages/AccessControl'
import Simulation from './pages/Simulation'
import PaymentHistory from './pages/PaymentHistory'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/toll" element={<TollManagement />} />
        <Route path="/parking" element={<ParkingManagement />} />
        <Route path="/access" element={<AccessControl />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/history" element={<PaymentHistory />} />
      </Route>
    </Routes>
  )
}

export default App
