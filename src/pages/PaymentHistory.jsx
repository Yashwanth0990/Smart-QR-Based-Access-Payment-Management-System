import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  tollTransactions, parkingSessions, accessLogs,
  getUserById, getVehicleById, getPlazaById, getLotById, getCommunityById,
  formatCurrency, formatDateTime,
} from '../data/staticData'
import './PaymentHistory.css'

export default function PaymentHistory() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const allTransactions = useMemo(() => {
    const toll = tollTransactions.map(t => ({
      id: t.id,
      type: 'toll',
      typeLabel: 'Toll',
      icon: '🛣️',
      date: t.date,
      amount: t.amount,
      status: t.status,
      user: getUserById(t.userId)?.name || 'Unknown',
      vehicle: getVehicleById(t.vehicleId)?.plateNumber || '',
      location: getPlazaById(t.plazaId)?.name || '',
      method: t.paymentMethod,
      qrCode: t.qrCode,
      details: `${t.journeyType} journey`,
    }))

    const parking = parkingSessions.map(p => ({
      id: p.id,
      type: 'parking',
      typeLabel: 'Parking',
      icon: '🅿️',
      date: p.entryTime,
      amount: p.amount || 0,
      status: p.status,
      user: getUserById(p.userId)?.name || 'Unknown',
      vehicle: getVehicleById(p.vehicleId)?.plateNumber || '',
      location: getLotById(p.lotId)?.name || '',
      method: 'Auto-debit',
      qrCode: p.qrCode,
      details: p.duration ? `${p.duration} • Spot ${p.spotNumber}` : `Spot ${p.spotNumber}`,
    }))

    const access = accessLogs.map(a => ({
      id: a.id,
      type: 'access',
      typeLabel: 'Access',
      icon: '🏘️',
      date: a.entryTime,
      amount: 0,
      status: a.status,
      user: a.visitorName,
      vehicle: '',
      location: getCommunityById(a.communityId)?.name || '',
      method: a.approvedBy,
      qrCode: a.qrCode,
      details: `${a.type} • Unit ${a.unitNumber} • ${a.gate}`,
    }))

    return [...toll, ...parking, ...access].sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [])

  const filteredTransactions = useMemo(() => {
    let filtered = allTransactions
    if (activeFilter !== 'all') {
      filtered = filtered.filter(t => t.type === activeFilter)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(t =>
        t.id.toLowerCase().includes(q) ||
        t.user.toLowerCase().includes(q) ||
        t.vehicle.toLowerCase().includes(q) ||
        t.location.toLowerCase().includes(q) ||
        t.qrCode.toLowerCase().includes(q)
      )
    }
    return filtered
  }, [allTransactions, activeFilter, searchQuery])

  const totals = useMemo(() => ({
    all: allTransactions.length,
    toll: allTransactions.filter(t => t.type === 'toll').length,
    parking: allTransactions.filter(t => t.type === 'parking').length,
    access: allTransactions.filter(t => t.type === 'access').length,
    totalRevenue: allTransactions.reduce((sum, t) => sum + (t.amount || 0), 0),
    tollRevenue: allTransactions.filter(t => t.type === 'toll').reduce((sum, t) => sum + t.amount, 0),
    parkingRevenue: allTransactions.filter(t => t.type === 'parking').reduce((sum, t) => sum + (t.amount || 0), 0),
  }), [allTransactions])

  const filters = [
    { key: 'all', label: 'All', count: totals.all },
    { key: 'toll', label: 'Toll', count: totals.toll, color: '#06b6d4' },
    { key: 'parking', label: 'Parking', count: totals.parking, color: '#8b5cf6' },
    { key: 'access', label: 'Access', count: totals.access, color: '#10b981' },
  ]

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>📜 Payment & Transaction History</h1>
        <p>Complete audit trail of all toll payments, parking sessions, and access events</p>
      </motion.div>

      {/* Summary Cards */}
      <motion.div
        className="history-summary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="summary-card glass-card">
          <div className="summary-icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>💰</div>
          <div>
            <div className="summary-value">{formatCurrency(totals.totalRevenue)}</div>
            <div className="summary-label">Total Revenue</div>
          </div>
        </div>
        <div className="summary-card glass-card">
          <div className="summary-icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>🛣️</div>
          <div>
            <div className="summary-value">{formatCurrency(totals.tollRevenue)}</div>
            <div className="summary-label">Toll Revenue ({totals.toll} txns)</div>
          </div>
        </div>
        <div className="summary-card glass-card">
          <div className="summary-icon" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>🅿️</div>
          <div>
            <div className="summary-value">{formatCurrency(totals.parkingRevenue)}</div>
            <div className="summary-label">Parking Revenue ({totals.parking} txns)</div>
          </div>
        </div>
        <div className="summary-card glass-card">
          <div className="summary-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>🏘️</div>
          <div>
            <div className="summary-value">{totals.access}</div>
            <div className="summary-label">Access Events</div>
          </div>
        </div>
      </motion.div>

      {/* Filters + Search */}
      <motion.div
        className="history-toolbar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="filter-tabs">
          {filters.map(f => (
            <button
              key={f.key}
              className={`filter-tab ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
              <span className="filter-count">{f.count}</span>
            </button>
          ))}
        </div>
        <div className="history-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by ID, name, vehicle, location..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      {/* Transaction Table */}
      <motion.div
        className="history-table-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="history-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Transaction ID</th>
                <th>Date & Time</th>
                <th>User / Visitor</th>
                <th>Vehicle</th>
                <th>Location</th>
                <th>Details</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, i) => (
                <motion.tr
                  key={tx.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <td>
                    <span className={`type-badge ${tx.type}`}>
                      <span>{tx.icon}</span>
                      {tx.typeLabel}
                    </span>
                  </td>
                  <td>
                    <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--accent-primary)' }}>{tx.id}</span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{formatDateTime(tx.date)}</td>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{tx.user}</td>
                  <td><span className="mono">{tx.vehicle || '—'}</span></td>
                  <td>
                    <span className="location-cell">{tx.location.length > 25 ? tx.location.slice(0, 25) + '...' : tx.location}</span>
                  </td>
                  <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{tx.details}</td>
                  <td>
                    {tx.amount > 0 ? (
                      <span className="amount-cell">{formatCurrency(tx.amount)}</span>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>—</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.78rem' }}>{tx.method}</td>
                  <td>
                    <span className={`badge badge-${
                      tx.status === 'completed' ? 'success' :
                      tx.status === 'active' || tx.status === 'inside' ? 'info' :
                      tx.status === 'failed' ? 'danger' : 'warning'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="no-results">
            <span>🔍</span>
            <p>No transactions found matching your criteria.</p>
          </div>
        )}

        <div className="table-footer">
          <span>Showing {filteredTransactions.length} of {allTransactions.length} transactions</span>
        </div>
      </motion.div>
    </div>
  )
}
