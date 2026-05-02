import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
  communities, accessLogs, getCommunityById,
  formatDateTime,
} from '../data/staticData'
import './AccessControl.css'

const passTypes = [
  { key: 'visitor', label: 'Visitor Pass', icon: '👤', duration: '4 hours', color: '#06b6d4' },
  { key: 'delivery', label: 'Delivery Pass', icon: '📦', duration: '1 hour', color: '#f59e0b' },
  { key: 'service', label: 'Service Pass', icon: '🔧', duration: '8 hours', color: '#8b5cf6' },
  { key: 'recurring', label: 'Recurring Pass', icon: '🔄', duration: '30 days', color: '#10b981' },
]

export default function AccessControl() {
  const [selectedCommunity, setSelectedCommunity] = useState('')
  const [selectedPassType, setSelectedPassType] = useState('')
  const [visitorName, setVisitorName] = useState('')
  const [unitNumber, setUnitNumber] = useState('')
  const [generatedPass, setGeneratedPass] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [activeTab, setActiveTab] = useState('generate')

  const generatePass = useCallback(() => {
    if (!selectedCommunity || !selectedPassType || !visitorName || !unitNumber) return
    const community = getCommunityById(selectedCommunity)
    const passType = passTypes.find(p => p.key === selectedPassType)
    const passId = `ACC${Date.now().toString().slice(-6)}`

    setGeneratedPass({
      id: passId,
      community: community.name,
      communityId: community.id,
      visitorName,
      unitNumber,
      type: passType.key,
      typeLabel: passType.label,
      duration: passType.duration,
      generatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + (passType.key === 'recurring' ? 30 * 24 * 3600000 : passType.key === 'delivery' ? 3600000 : passType.key === 'service' ? 8 * 3600000 : 4 * 3600000)).toISOString(),
      qrData: `ACCESS|${passId}|${community.id}|${visitorName}|${unitNumber}|${selectedPassType}|${Date.now()}`,
      status: 'valid',
    })
  }, [selectedCommunity, selectedPassType, visitorName, unitNumber])

  const simulateGateScan = useCallback(() => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanResult({
        verified: true,
        message: 'Identity verified. Gate access granted.',
        gate: `Gate ${Math.floor(Math.random() * 3) + 1}`,
        timestamp: new Date().toISOString(),
      })
    }, 2000)
  }, [])

  const resetAll = () => {
    setGeneratedPass(null)
    setScanResult(null)
    setScanning(false)
    setVisitorName('')
    setUnitNumber('')
  }

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🏘️ Access Control</h1>
        <p>QR-based entry management for gated communities and townships</p>
      </motion.div>

      {/* Community Cards */}
      <motion.div
        className="community-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {communities.map((comm, i) => (
          <motion.div
            key={comm.id}
            className={`community-card glass-card ${selectedCommunity === comm.id ? 'selected' : ''}`}
            onClick={() => setSelectedCommunity(comm.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="comm-header">
              <div className="comm-icon">🏘️</div>
              <div>
                <h4>{comm.name}</h4>
                <p>{comm.location}</p>
              </div>
            </div>
            <div className="comm-stats">
              <div className="comm-stat">
                <span className="comm-stat-value">{comm.totalUnits}</span>
                <span className="comm-stat-label">Units</span>
              </div>
              <div className="comm-stat">
                <span className="comm-stat-value">{comm.registeredResidents}</span>
                <span className="comm-stat-label">Residents</span>
              </div>
              <div className="comm-stat">
                <span className="comm-stat-value">{comm.gates}</span>
                <span className="comm-stat-label">Gates</span>
              </div>
            </div>
            <div className="comm-footer">
              <span className={`badge badge-${comm.securityLevel === 'Premium' ? 'secondary' : 'primary'}`}>
                {comm.securityLevel} Security
              </span>
              <span className="badge badge-success">{comm.status}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div className="access-tabs">
        <button
          className={`access-tab ${activeTab === 'generate' ? 'active' : ''}`}
          onClick={() => setActiveTab('generate')}
        >
          Generate Pass
        </button>
        <button
          className={`access-tab ${activeTab === 'logs' ? 'active' : ''}`}
          onClick={() => setActiveTab('logs')}
        >
          Access Logs
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'generate' ? (
          <motion.div
            key="generate"
            className="access-layout"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Pass Generation Form */}
            <div className="access-left">
              <div className="access-form-card glass-card">
                <h3>Generate Access Pass</h3>

                <div className="toll-form">
                  <div className="input-group">
                    <label>Community</label>
                    <select
                      className="input-field"
                      value={selectedCommunity}
                      onChange={e => setSelectedCommunity(e.target.value)}
                    >
                      <option value="">Select community...</option>
                      {communities.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="input-group">
                    <label>Pass Type</label>
                    <div className="pass-type-grid">
                      {passTypes.map(pt => (
                        <button
                          key={pt.key}
                          className={`pass-type-btn ${selectedPassType === pt.key ? 'active' : ''}`}
                          onClick={() => setSelectedPassType(pt.key)}
                          style={{ '--pass-color': pt.color }}
                        >
                          <span className="pass-type-icon">{pt.icon}</span>
                          <span className="pass-type-label">{pt.label}</span>
                          <span className="pass-type-duration">{pt.duration}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="input-group">
                    <label>Visitor Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter visitor name..."
                      value={visitorName}
                      onChange={e => setVisitorName(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label>Unit / Flat Number</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., T5-1204"
                      value={unitNumber}
                      onChange={e => setUnitNumber(e.target.value)}
                    />
                  </div>

                  <button
                    className="btn btn-primary btn-lg"
                    onClick={generatePass}
                    disabled={!selectedCommunity || !selectedPassType || !visitorName || !unitNumber}
                    style={{ width: '100%' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    Generate QR Access Pass
                  </button>
                </div>
              </div>
            </div>

            {/* Generated Pass Display */}
            <div className="access-right">
              {generatedPass ? (
                <motion.div
                  className="access-pass-card glass-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="pass-header">
                    <h3>Digital Access Pass</h3>
                    <span className={`badge ${scanResult ? 'badge-success' : 'badge-primary'}`}>
                      {scanResult ? 'VERIFIED' : 'VALID'}
                    </span>
                  </div>

                  <div className="pass-visitor-info">
                    <div className="pass-visitor-avatar">
                      {generatedPass.visitorName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="pass-visitor-name">{generatedPass.visitorName}</div>
                      <div className="pass-visitor-type">{generatedPass.typeLabel}</div>
                    </div>
                  </div>

                  <div className="pass-qr-wrapper">
                    <div className={`pass-qr-frame ${scanning ? 'scanning' : ''} ${scanResult ? 'verified' : ''}`}>
                      <QRCodeSVG
                        value={generatedPass.qrData}
                        size={160}
                        bgColor="transparent"
                        fgColor="#10b981"
                        level="H"
                      />
                      {scanning && <div className="scan-line-active" style={{ background: 'linear-gradient(90deg, transparent, #10b981, transparent)' }}></div>}
                      {scanResult && (
                        <div className="scan-check">
                          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="receipt-details">
                    <div className="receipt-row">
                      <span>Pass ID</span>
                      <span className="mono">{generatedPass.id}</span>
                    </div>
                    <div className="receipt-row">
                      <span>Community</span>
                      <span>{generatedPass.community}</span>
                    </div>
                    <div className="receipt-row">
                      <span>Unit Number</span>
                      <span className="mono">{generatedPass.unitNumber}</span>
                    </div>
                    <div className="receipt-row">
                      <span>Pass Type</span>
                      <span>{generatedPass.typeLabel}</span>
                    </div>
                    <div className="receipt-row">
                      <span>Valid For</span>
                      <span>{generatedPass.duration}</span>
                    </div>
                    <div className="receipt-row">
                      <span>Generated</span>
                      <span>{formatDateTime(generatedPass.generatedAt)}</span>
                    </div>
                    <div className="receipt-row">
                      <span>Expires</span>
                      <span>{formatDateTime(generatedPass.expiresAt)}</span>
                    </div>
                  </div>

                  {scanResult && (
                    <motion.div
                      className="gate-result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="gate-result-icon">🚪</div>
                      <p className="gate-result-text">{scanResult.message}</p>
                      <p className="gate-result-meta">{scanResult.gate} • {formatDateTime(scanResult.timestamp)}</p>
                    </motion.div>
                  )}

                  <div className="receipt-actions">
                    {!scanResult && (
                      <button
                        className="btn btn-success btn-lg"
                        onClick={simulateGateScan}
                        disabled={scanning}
                        style={{ width: '100%' }}
                      >
                        {scanning ? (
                          <>
                            <span className="spinner"></span>
                            Scanning at Gate...
                          </>
                        ) : (
                          <>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            </svg>
                            Simulate Gate Scan
                          </>
                        )}
                      </button>
                    )}
                    <button className="btn btn-secondary" onClick={resetAll} style={{ width: '100%' }}>
                      Generate New Pass
                    </button>
                  </div>
                </motion.div>
              ) : (
                <div className="access-empty-state glass-card">
                  <div className="empty-icon">🔐</div>
                  <h4>No Pass Generated</h4>
                  <p>Fill in the details on the left to generate a QR access pass for visitors, delivery, or service personnel.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="logs"
            className="access-logs-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="glass-card" style={{ padding: 24 }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 20 }}>Access Log History</h3>
              <div className="access-log-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Visitor</th>
                      <th>Type</th>
                      <th>Community</th>
                      <th>Unit</th>
                      <th>Gate</th>
                      <th>Entry</th>
                      <th>Exit</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accessLogs.map(log => {
                      const comm = getCommunityById(log.communityId)
                      return (
                        <tr key={log.id}>
                          <td className="mono" style={{ fontSize: '0.8rem' }}>{log.id}</td>
                          <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{log.visitorName}</td>
                          <td>
                            <span className={`badge badge-${log.type === 'delivery' ? 'warning' : log.type === 'visitor' ? 'primary' : log.type === 'service' ? 'secondary' : 'success'}`}>
                              {log.type}
                            </span>
                          </td>
                          <td>{comm?.name?.split(' ').slice(0, 2).join(' ')}</td>
                          <td className="mono">{log.unitNumber}</td>
                          <td>{log.gate}</td>
                          <td>{formatDateTime(log.entryTime)}</td>
                          <td>{log.exitTime ? formatDateTime(log.exitTime) : '—'}</td>
                          <td>
                            <span className={`badge badge-${log.status === 'completed' ? 'success' : 'info'}`}>
                              {log.status}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
