import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import {
  tollPlazas, tollRates, vehicles, users, tollTransactions,
  getUserById, getVehicleById, getPlazaById, getTollRate,
  formatCurrency, formatDateTime,
} from '../data/staticData'
import './TollManagement.css'

export default function TollManagement() {
  const [selectedPlaza, setSelectedPlaza] = useState('')
  const [selectedVehicle, setSelectedVehicle] = useState('')
  const [journeyType, setJourneyType] = useState('singleJourney')
  const [showQR, setShowQR] = useState(false)
  const [receipt, setReceipt] = useState(null)
  const [scanning, setScanning] = useState(false)
  const [scanComplete, setScanComplete] = useState(false)
  const [barrierOpen, setBarrierOpen] = useState(false)

  const currentRate = selectedPlaza && selectedVehicle
    ? getTollRate(selectedPlaza, vehicles.find(v => v.id === selectedVehicle)?.type)
    : null

  const amount = currentRate ? currentRate[journeyType] : 0

  const generateReceipt = useCallback(() => {
    if (!selectedPlaza || !selectedVehicle) return
    const vehicle = getVehicleById(selectedVehicle)
    const plaza = getPlazaById(selectedPlaza)
    const txId = `TT${Date.now().toString().slice(-6)}`

    setReceipt({
      id: txId,
      plaza: plaza.name,
      plazaLocation: plaza.location,
      vehicle: vehicle.plateNumber,
      vehicleModel: vehicle.model,
      vehicleType: vehicle.type,
      journeyType: journeyType === 'singleJourney' ? 'Single' : journeyType === 'returnJourney' ? 'Return' : 'Monthly',
      amount,
      timestamp: new Date().toISOString(),
      qrData: `SMARTTOLL|${txId}|${plaza.id}|${vehicle.plateNumber}|${amount}|${Date.now()}`,
      status: 'generated',
    })
    setShowQR(true)
    setScanComplete(false)
    setBarrierOpen(false)
    setScanning(false)
  }, [selectedPlaza, selectedVehicle, journeyType, amount])

  const simulateScan = useCallback(() => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
      setScanComplete(true)
      setTimeout(() => {
        setBarrierOpen(true)
      }, 800)
    }, 2500)
  }, [])

  const resetFlow = () => {
    setShowQR(false)
    setReceipt(null)
    setScanning(false)
    setScanComplete(false)
    setBarrierOpen(false)
  }

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🛣️ Toll Management</h1>
        <p>Generate QR-equipped digital payment receipts for seamless toll transactions</p>
      </motion.div>

      <div className="toll-layout">
        {/* Left: Form + Plaza List */}
        <div className="toll-left">
          {/* Generate Receipt Form */}
          <motion.div
            className="toll-form-card glass-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3>Generate Toll Receipt</h3>
            <div className="toll-form">
              <div className="input-group">
                <label>Select Toll Plaza</label>
                <select
                  className="input-field"
                  value={selectedPlaza}
                  onChange={e => setSelectedPlaza(e.target.value)}
                >
                  <option value="">Choose a toll plaza...</option>
                  {tollPlazas.filter(p => p.status === 'active').map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Select Vehicle</label>
                <select
                  className="input-field"
                  value={selectedVehicle}
                  onChange={e => setSelectedVehicle(e.target.value)}
                >
                  <option value="">Choose a vehicle...</option>
                  {vehicles.map(v => (
                    <option key={v.id} value={v.id}>{v.plateNumber} — {v.model} ({v.type})</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <label>Journey Type</label>
                <div className="journey-type-selector">
                  {[
                    { key: 'singleJourney', label: 'Single', icon: '→' },
                    { key: 'returnJourney', label: 'Return', icon: '⇄' },
                    { key: 'monthlyPass', label: 'Monthly', icon: '📅' },
                  ].map(jt => (
                    <button
                      key={jt.key}
                      className={`journey-btn ${journeyType === jt.key ? 'active' : ''}`}
                      onClick={() => setJourneyType(jt.key)}
                    >
                      <span>{jt.icon}</span>
                      <span>{jt.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {currentRate && (
                <motion.div
                  className="price-display"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="price-label">Total Amount</div>
                  <div className="price-value">{formatCurrency(amount)}</div>
                </motion.div>
              )}

              <button
                className="btn btn-primary btn-lg"
                onClick={generateReceipt}
                disabled={!selectedPlaza || !selectedVehicle}
                style={{ width: '100%' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7z" />
                </svg>
                Generate QR Receipt
              </button>
            </div>
          </motion.div>

          {/* Toll Plazas List */}
          <motion.div
            className="toll-plazas-card glass-card"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Toll Plazas</h3>
            <div className="plaza-list">
              {tollPlazas.map(plaza => (
                <div
                  key={plaza.id}
                  className={`plaza-item ${selectedPlaza === plaza.id ? 'selected' : ''}`}
                  onClick={() => setSelectedPlaza(plaza.id)}
                >
                  <div className="plaza-info">
                    <div className="plaza-name">{plaza.name}</div>
                    <div className="plaza-location">{plaza.location}</div>
                  </div>
                  <div className="plaza-meta">
                    <span className={`badge ${plaza.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                      {plaza.status}
                    </span>
                    <span className="plaza-lanes">{plaza.lanes} lanes</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: QR Display + Scan Simulation */}
        <div className="toll-right">
          <AnimatePresence mode="wait">
            {showQR && receipt ? (
              <motion.div
                key="qr-receipt"
                className="qr-receipt-card glass-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <div className="receipt-header">
                  <h3>Digital Toll Receipt</h3>
                  <span className={`badge ${scanComplete ? 'badge-success' : 'badge-primary'}`}>
                    {scanComplete ? 'VERIFIED' : 'GENERATED'}
                  </span>
                </div>

                <div className="receipt-qr-wrapper">
                  <div className={`receipt-qr-frame ${scanning ? 'scanning' : ''} ${scanComplete ? 'verified' : ''}`}>
                    <QRCodeSVG
                      value={receipt.qrData}
                      size={180}
                      bgColor="transparent"
                      fgColor="#06b6d4"
                      level="H"
                      includeMargin={false}
                    />
                    {scanning && <div className="scan-line-active"></div>}
                    {scanComplete && (
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
                    <span>Receipt ID</span>
                    <span className="mono">{receipt.id}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Toll Plaza</span>
                    <span>{receipt.plaza}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Location</span>
                    <span>{receipt.plazaLocation}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Vehicle</span>
                    <span>{receipt.vehicle}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Vehicle Model</span>
                    <span>{receipt.vehicleModel}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Journey Type</span>
                    <span>{receipt.journeyType}</span>
                  </div>
                  <div className="receipt-row total">
                    <span>Amount Paid</span>
                    <span>{formatCurrency(receipt.amount)}</span>
                  </div>
                  <div className="receipt-row">
                    <span>Timestamp</span>
                    <span>{formatDateTime(receipt.timestamp)}</span>
                  </div>
                </div>

                {/* Barrier Animation */}
                {barrierOpen && (
                  <motion.div
                    className="barrier-animation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="barrier-visual">
                      <div className="barrier-pole"></div>
                      <div className="barrier-arm open"></div>
                      <div className="barrier-road">
                        <div className="road-marking"></div>
                        <div className="road-marking"></div>
                        <div className="road-marking"></div>
                      </div>
                      <div className="car-emoji">🚗</div>
                    </div>
                    <p className="barrier-text">✅ Barrier Opened — Vehicle Passing Through</p>
                  </motion.div>
                )}

                <div className="receipt-actions">
                  {!scanComplete && (
                    <button
                      className="btn btn-success btn-lg"
                      onClick={simulateScan}
                      disabled={scanning}
                      style={{ width: '100%' }}
                    >
                      {scanning ? (
                        <>
                          <span className="spinner"></span>
                          Scanning QR Code...
                        </>
                      ) : (
                        <>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                            <circle cx="12" cy="13" r="4" />
                          </svg>
                          Simulate QR Scan at Toll
                        </>
                      )}
                    </button>
                  )}
                  <button className="btn btn-secondary" onClick={resetFlow} style={{ width: '100%' }}>
                    Generate New Receipt
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="recent-transactions"
                className="recent-tx-card glass-card"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
              >
                <h3>Recent Toll Transactions</h3>
                <div className="tx-list">
                  {tollTransactions.map(tx => {
                    const user = getUserById(tx.userId)
                    const vehicle = getVehicleById(tx.vehicleId)
                    const plaza = getPlazaById(tx.plazaId)
                    return (
                      <div key={tx.id} className="tx-item">
                        <div className="tx-icon">🛣️</div>
                        <div className="tx-info">
                          <div className="tx-title">{plaza?.name?.split(' - ')[0]}</div>
                          <div className="tx-meta">{vehicle?.plateNumber} • {user?.name} • {formatDateTime(tx.date)}</div>
                        </div>
                        <div className="tx-right">
                          <div className="tx-amount">{formatCurrency(tx.amount)}</div>
                          <span className={`badge ${tx.status === 'completed' ? 'badge-success' : 'badge-danger'}`}>
                            {tx.status}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
