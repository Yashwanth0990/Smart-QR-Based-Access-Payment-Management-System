import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  dashboardStats, revenueData, tollTransactions, parkingSessions,
  accessLogs, getUserById, getVehicleById, getPlazaById, getLotById,
  getCommunityById, formatCurrency, formatDateTime,
} from '../data/staticData'
import './Dashboard.css'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const maxRevenue = Math.max(...revenueData.map(d => d.toll + d.parking + d.access))

  const statCards = [
    { label: 'Total Revenue', value: formatCurrency(dashboardStats.totalRevenue), change: `+${dashboardStats.revenueGrowth}%`, icon: '💰', color: '#06b6d4', positive: true },
    { label: 'Transactions Today', value: dashboardStats.qrScansToday.toLocaleString(), change: `+${dashboardStats.transactionGrowth}%`, icon: '📊', color: '#8b5cf6', positive: true },
    { label: 'Active Users', value: dashboardStats.activeUsers.toLocaleString(), change: `+${dashboardStats.userGrowth}%`, icon: '👥', color: '#10b981', positive: true },
    { label: 'Avg Processing', value: dashboardStats.avgProcessingTime, change: 'Real-time', icon: '⚡', color: '#f59e0b', positive: true },
  ]

  const moduleStats = [
    { label: 'Toll Passes', value: dashboardStats.tollPassesToday, icon: '🛣️', color: '#06b6d4' },
    { label: 'Parking Sessions', value: dashboardStats.parkingSessionsToday, icon: '🅿️', color: '#8b5cf6' },
    { label: 'Access Scans', value: dashboardStats.accessScansToday, icon: '🏘️', color: '#10b981' },
    { label: 'System Uptime', value: dashboardStats.systemUptime, icon: '🟢', color: '#22c55e' },
  ]

  const recentActivity = [
    ...tollTransactions.slice(0, 3).map(t => ({
      id: t.id, type: 'toll', time: t.date, status: t.status,
      desc: `Toll payment at ${getPlazaById(t.plazaId)?.name?.split(' - ')[0] || 'Unknown'}`,
      amount: t.amount, user: getUserById(t.userId)?.name,
      vehicle: getVehicleById(t.vehicleId)?.plateNumber,
    })),
    ...parkingSessions.slice(0, 2).map(p => ({
      id: p.id, type: 'parking', time: p.entryTime, status: p.status,
      desc: `Parking at ${getLotById(p.lotId)?.name || 'Unknown'}`,
      amount: p.amount, user: getUserById(p.userId)?.name,
      vehicle: getVehicleById(p.vehicleId)?.plateNumber,
    })),
    ...accessLogs.slice(0, 2).map(a => ({
      id: a.id, type: 'access', time: a.entryTime, status: a.status,
      desc: `${a.visitorName} at ${getCommunityById(a.communityId)?.name?.split(' ')[0] || 'Unknown'}`,
      amount: null, user: a.visitorName,
    })),
  ].sort((a, b) => new Date(b.time) - new Date(a.time))

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>Admin Dashboard</h1>
        <p>Real-time overview of the Smart QR Access & Payment System</p>
      </motion.div>

      {/* Stat Cards */}
      <motion.div
        className="stats-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statCards.map((card, i) => (
          <motion.div key={i} className="dash-stat-card glass-card" variants={itemVariants}>
            <div className="dash-stat-top">
              <div>
                <div className="dash-stat-label">{card.label}</div>
                <div className="dash-stat-value">{card.value}</div>
              </div>
              <div className="dash-stat-icon" style={{ background: `${card.color}15`, color: card.color }}>
                <span>{card.icon}</span>
              </div>
            </div>
            <div className="dash-stat-change" style={{ color: card.positive ? '#10b981' : '#ef4444' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points={card.positive ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
              </svg>
              {card.change}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Module Stats */}
      <motion.div
        className="module-stats-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {moduleStats.map((stat, i) => (
          <motion.div key={i} className="module-stat-chip" variants={itemVariants}>
            <span className="module-stat-icon">{stat.icon}</span>
            <span className="module-stat-label">{stat.label}</span>
            <span className="module-stat-value" style={{ color: stat.color }}>{stat.value}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Revenue Chart + Recent Activity */}
      <div className="dash-grid-2col">
        {/* Revenue Chart */}
        <motion.div
          className="dash-chart-card glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="dash-card-header">
            <div>
              <h3>Weekly Revenue</h3>
              <p className="dash-card-subtitle">Revenue breakdown by module (last 7 days)</p>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="legend-dot" style={{ background: '#06b6d4' }}></span>Toll</span>
              <span className="legend-item"><span className="legend-dot" style={{ background: '#8b5cf6' }}></span>Parking</span>
              <span className="legend-item"><span className="legend-dot" style={{ background: '#10b981' }}></span>Access</span>
            </div>
          </div>
          <div className="chart-container">
            {revenueData.map((d, i) => (
              <div key={i} className="chart-bar-group">
                <div className="chart-bars">
                  <div
                    className="chart-bar toll-bar"
                    style={{ height: `${(d.toll / maxRevenue) * 100}%` }}
                    title={`Toll: ${formatCurrency(d.toll)}`}
                  ></div>
                  <div
                    className="chart-bar parking-bar"
                    style={{ height: `${(d.parking / maxRevenue) * 100}%` }}
                    title={`Parking: ${formatCurrency(d.parking)}`}
                  ></div>
                  <div
                    className="chart-bar access-bar"
                    style={{ height: `${(d.access / maxRevenue) * 100}%` }}
                    title={`Access: ${formatCurrency(d.access)}`}
                  ></div>
                </div>
                <span className="chart-label">{d.day}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="dash-activity-card glass-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="dash-card-header">
            <div>
              <h3>Recent Activity</h3>
              <p className="dash-card-subtitle">Latest transactions and access events</p>
            </div>
          </div>
          <div className="activity-list">
            {recentActivity.slice(0, 6).map((item, i) => (
              <div key={i} className="activity-item">
                <div className={`activity-type-dot ${item.type}`}></div>
                <div className="activity-info">
                  <div className="activity-desc">{item.desc}</div>
                  <div className="activity-meta">
                    {item.user} • {formatDateTime(item.time)}
                  </div>
                </div>
                <div className="activity-right">
                  {item.amount && (
                    <div className="activity-amount">{formatCurrency(item.amount)}</div>
                  )}
                  <span className={`badge badge-${item.status === 'completed' ? 'success' : item.status === 'active' || item.status === 'inside' ? 'info' : 'danger'}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="quick-actions glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          <a href="/toll" className="action-btn">
            <div className="action-icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>🛣️</div>
            <span>New Toll Pass</span>
          </a>
          <a href="/parking" className="action-btn">
            <div className="action-icon" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>🅿️</div>
            <span>Parking Entry</span>
          </a>
          <a href="/access" className="action-btn">
            <div className="action-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>🏘️</div>
            <span>Generate Pass</span>
          </a>
          <a href="/simulation" className="action-btn">
            <div className="action-icon" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>▶️</div>
            <span>Run Simulation</span>
          </a>
          <a href="/history" className="action-btn">
            <div className="action-icon" style={{ background: 'rgba(59, 130, 246, 0.15)' }}>📜</div>
            <span>View History</span>
          </a>
        </div>
      </motion.div>
    </div>
  )
}
