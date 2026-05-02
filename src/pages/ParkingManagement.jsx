import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
  parkingLots, parkingSessions, vehicles, getLotById,
  getVehicleById, getUserById, formatCurrency, formatDateTime,
} from '../data/staticData'
import './ParkingManagement.css'

export default function ParkingManagement() {
  const [selectedLot, setSelectedLot] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [activeSession, setActiveSession] = useState(null)
  const [timer, setTimer] = useState(0)
  const [showExit, setShowExit] = useState(false)
  const [exitProcessing, setExitProcessing] = useState(false)
  const [exitComplete, setExitComplete] = useState(false)
  const [barrierState, setBarrierState] = useState('closed') // closed, entry-open, exit-open

  // Timer for active parking session
  useEffect(() => {
    let interval
    if (activeSession && !exitComplete) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeSession, exitComplete])

  const formatTimer = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const calculateFee = (seconds, ratePerHour) => {
    const hours = Math.max(1, Math.ceil(seconds / 3600))
    return hours * ratePerHour
  }

  const startSession = useCallback(() => {
    if (!selectedLot || !selectedVehicle) return
    const lot = getLotById(selectedLot)
    const vehicle = getVehicleById(selectedVehicle)
    const sessionId = `PS${Date.now().toString().slice(-6)}`

    setActiveSession({
      id: sessionId,
      lot: lot,
      vehicle: vehicle,
      entryTime: new Date().toISOString(),
      spotNumber: `${String.fromCharCode(65 + Math.floor(Math.random() * 4))}-${Math.floor(Math.random() * 100) + 1}`,
      qrData: `PARK|${sessionId}|${lot.id}|${vehicle.plateNumber}|${Date.now()}`,
    })
    setTimer(0)
    setBarrierState('entry-open')
    setTimeout(() => setBarrierState('closed'), 2000)
  }, [selectedLot, selectedVehicle])

  const processExit = useCallback(() => {
    setShowExit(true)
    setExitProcessing(true)
    setTimeout(() => {
      setExitProcessing(false)
      setExitComplete(true)
      setBarrierState('exit-open')
    }, 2500)
  }, [])

  const resetSession = () => {
    setActiveSession(null)
    setTimer(0)
    setShowExit(false)
    setExitProcessing(false)
    setExitComplete(false)
    setBarrierState('closed')
  }

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🅿️ Parking Management</h1>
        <p>QR-based automated parking with real-time tracking and fee computation</p>
      </motion.div>

      {/* Parking Lots Overview */}
      <motion.div
        className="parking-lots-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {parkingLots.map((lot, i) => {
          const occupancy = ((lot.totalSpots - lot.availableSpots) / lot.totalSpots) * 100
          return (
            <motion.div
              key={lot.id}
              className={`parking-lot-card glass-card ${selectedLot === lot.id ? 'selected' : ''}`}
              onClick={() => setSelectedLot(lot.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <div className="lot-card-header">
                <div>
                  <h4>{lot.name}</h4>
                  <p className="lot-location">{lot.location}</p>
                </div>
                <span className={`badge ${lot.status === 'active' ? 'badge-success' : lot.status === 'full' ? 'badge-danger' : 'badge-warning'}`}>
                  {lot.status}
                </span>
              </div>

              <div className="lot-occupancy">
                <div className="occupancy-bar-bg">
                  <div
                    className="occupancy-bar-fill"
                    style={{
                      width: `${occupancy}%`,
                      background: occupancy > 90 ? '#ef4444' : occupancy > 70 ? '#f59e0b' : '#10b981',
                    }}
                  ></div>
                </div>
                <div className="occupancy-labels">
                  <span>{lot.totalSpots - lot.availableSpots} / {lot.totalSpots} occupied</span>
                  <span>{occupancy.toFixed(0)}%</span>
                </div>
              </div>

              <div className="lot-card-footer">
                <span className="lot-type">{lot.type}</span>
                <span className="lot-rate">{formatCurrency(lot.ratePerHour)}/hr</span>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="parking-layout">
        {/* Entry Form or Active Session */}
        <div className="parking-left">
          {!activeSession ? (
            <motion.div
              className="parking-entry-card glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3>🚗 Vehicle Entry</h3>
              <div className="toll-form">
                <div className="input-group">
                  <label>Parking Lot</label>
                  <select
                    className="input-field"
                    value={selectedLot}
                    onChange={e => setSelectedLot(e.target.value)}
                  >
                    <option value="">Select parking lot...</option>
                    {parkingLots.filter(l => l.status === 'active').map(l => (
                      <option key={l.id} value={l.id}>{l.name} — {formatCurrency(l.ratePerHour)}/hr</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Vehicle</label>
                  <select
                    className="input-field"
                    value={selectedVehicle}
                    onChange={e => setSelectedVehicle(e.target.value)}
                  >
                    <option value="">Select vehicle...</option>
                    {vehicles.map(v => (
                      <option key={v.id} value={v.id}>{v.plateNumber} — {v.model}</option>
                    ))}
                  </select>
                </div>

                <button
                  className="btn btn-primary btn-lg"
                  onClick={startSession}
                  disabled={!selectedLot || !selectedVehicle}
                  style={{ width: '100%' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Generate Entry QR & Open Barrier
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="active-session-card glass-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="session-header">
                <h3>🟢 Active Parking Session</h3>
                <span className="badge badge-success">LIVE</span>
              </div>

              <div className="session-timer">
                <div className="timer-label">Duration</div>
                <div className="timer-value">{formatTimer(timer)}</div>
                <div className="timer-running">
                  <span className="timer-dot"></span> Timer Running
                </div>
              </div>

              <div className="session-qr">
                <QRCodeSVG
                  value={activeSession.qrData}
                  size={140}
                  bgColor="transparent"
                  fgColor="#8b5cf6"
                  level="H"
                />
              </div>

              <div className="receipt-details">
                <div className="receipt-row">
                  <span>Session ID</span>
                  <span className="mono">{activeSession.id}</span>
                </div>
                <div className="receipt-row">
                  <span>Parking Lot</span>
                  <span>{activeSession.lot.name}</span>
                </div>
                <div className="receipt-row">
                  <span>Spot Number</span>
                  <span className="mono" style={{ color: 'var(--accent-secondary)' }}>{activeSession.spotNumber}</span>
                </div>
                <div className="receipt-row">
                  <span>Vehicle</span>
                  <span>{activeSession.vehicle.plateNumber}</span>
                </div>
                <div className="receipt-row">
                  <span>Entry Time</span>
                  <span>{formatDateTime(activeSession.entryTime)}</span>
                </div>
                <div className="receipt-row">
                  <span>Rate</span>
                  <span>{formatCurrency(activeSession.lot.ratePerHour)}/hr</span>
                </div>
                <div className="receipt-row total">
                  <span>Current Fee</span>
                  <span>{formatCurrency(calculateFee(timer, activeSession.lot.ratePerHour))}</span>
                </div>
              </div>

              {!showExit ? (
                <button
                  className="btn btn-danger btn-lg"
                  onClick={processExit}
                  style={{ width: '100%' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Process Vehicle Exit
                </button>
              ) : exitProcessing ? (
                <div className="exit-processing">
                  <div className="spinner" style={{ borderTopColor: 'var(--accent-warning)' }}></div>
                  <p>Scanning exit QR & calculating fee...</p>
                </div>
              ) : exitComplete ? (
                <motion.div
                  className="exit-complete"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="exit-success-icon">✅</div>
                  <h4>Payment Successful!</h4>
                  <p className="exit-fee">Total: {formatCurrency(calculateFee(timer, activeSession.lot.ratePerHour))}</p>
                  <p className="exit-message">Exit barrier opened. Thank you for parking!</p>
                  <button className="btn btn-secondary" onClick={resetSession} style={{ width: '100%', marginTop: 12 }}>
                    Start New Session
                  </button>
                </motion.div>
              ) : null}
            </motion.div>
          )}
        </div>

        {/* Right: Sessions + Barrier Visual */}
        <div className="parking-right">
          {/* Barrier Visual */}
          <motion.div
            className="barrier-card glass-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3>🚧 Barrier Status</h3>
            <div className="parking-barrier-visual">
              <div className="p-barrier">
                <div className="p-barrier-label">ENTRY</div>
                <div className="p-barrier-pole"></div>
                <div className={`p-barrier-arm ${barrierState === 'entry-open' ? 'open' : ''}`}></div>
                <div className={`p-barrier-light ${barrierState === 'entry-open' ? 'green' : 'red'}`}></div>
              </div>
              <div className="p-road">
                <div className="p-road-line"></div>
                <div className="p-road-line"></div>
                <div className="p-road-line"></div>
              </div>
              <div className="p-barrier">
                <div className="p-barrier-label">EXIT</div>
                <div className="p-barrier-pole"></div>
                <div className={`p-barrier-arm ${barrierState === 'exit-open' ? 'open' : ''}`}></div>
                <div className={`p-barrier-light ${barrierState === 'exit-open' ? 'green' : 'red'}`}></div>
              </div>
            </div>
          </motion.div>

          {/* Recent Sessions */}
          <motion.div
            className="sessions-card glass-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <h3>Recent Parking Sessions</h3>
            <div className="tx-list">
              {parkingSessions.map(session => {
                const lot = getLotById(session.lotId)
                const vehicle = getVehicleById(session.vehicleId)
                return (
                  <div key={session.id} className="tx-item">
                    <div className="tx-icon" style={{ background: 'rgba(139, 92, 246, 0.15)' }}>🅿️</div>
                    <div className="tx-info">
                      <div className="tx-title">{lot?.name}</div>
                      <div className="tx-meta">
                        {vehicle?.plateNumber} • Spot {session.spotNumber}
                        {session.duration && ` • ${session.duration}`}
                      </div>
                    </div>
                    <div className="tx-right">
                      {session.amount && (
                        <div className="tx-amount">{formatCurrency(session.amount)}</div>
                      )}
                      <span className={`badge ${session.status === 'completed' ? 'badge-success' : 'badge-info'}`}>
                        {session.status}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
