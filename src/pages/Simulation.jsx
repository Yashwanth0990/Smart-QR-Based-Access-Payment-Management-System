import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { formatCurrency } from '../data/staticData'
import './Simulation.css'

const simulations = [
  {
    id: 'toll',
    title: 'Toll Plaza Simulation',
    icon: '🛣️',
    color: '#06b6d4',
    desc: 'Watch how a vehicle passes through a QR-enabled toll plaza without stopping.',
    steps: [
      { label: 'Vehicle Approaches', desc: 'A registered vehicle approaches the unmanned QR toll lane.', duration: 2000 },
      { label: 'QR Receipt Generated', desc: 'The driver\'s pre-generated QR receipt is ready on their mobile device.', duration: 2000 },
      { label: 'QR Scanned', desc: 'The QR reader at the toll lane scans and validates the receipt instantly.', duration: 2500 },
      { label: 'Payment Verified', desc: 'Payment of ₹155 is verified against the digital receipt. Transaction logged.', duration: 2000 },
      { label: 'Barrier Opens', desc: 'The toll barrier opens automatically. Vehicle passes through seamlessly.', duration: 2500 },
      { label: 'Complete!', desc: 'Total processing time: 1.2 seconds. No queue, no cash, no delay.', duration: 0 },
    ],
  },
  {
    id: 'parking',
    title: 'Parking Lot Simulation',
    icon: '🅿️',
    color: '#8b5cf6',
    desc: 'See the complete entry-to-exit parking flow with automatic fee calculation.',
    steps: [
      { label: 'Vehicle Arrives', desc: 'Vehicle reaches the parking lot entry gate.', duration: 2000 },
      { label: 'Entry QR Issued', desc: 'System generates a QR code with entry timestamp and spot assignment (A-42).', duration: 2000 },
      { label: 'Entry Barrier Opens', desc: 'Entry barrier lifts. Vehicle proceeds to assigned parking spot.', duration: 2000 },
      { label: 'Parking Duration', desc: 'Vehicle is parked for 3 hours 30 minutes. Timer runs in background.', duration: 3000 },
      { label: 'Exit QR Scanned', desc: 'At exit, the QR is scanned. System calculates fee: ₹40/hr × 4hrs = ₹160.', duration: 2500 },
      { label: 'Payment & Exit', desc: 'Payment processed automatically. Exit barrier opens. Session complete.', duration: 0 },
    ],
  },
  {
    id: 'access',
    title: 'Gate Access Simulation',
    icon: '🏘️',
    color: '#10b981',
    desc: 'Experience the visitor verification flow at a gated community entrance.',
    steps: [
      { label: 'Visitor Arrives', desc: 'A delivery person arrives at the community gate with a QR pass.', duration: 2000 },
      { label: 'Pass Presented', desc: 'The time-bound QR pass (valid for 1 hour) is shown to the gate scanner.', duration: 2000 },
      { label: 'Identity Verified', desc: 'System verifies the pass, checks validity period, and matches the unit number.', duration: 2500 },
      { label: 'Resident Notified', desc: 'Resident at Unit T5-1204 receives a push notification about the visitor.', duration: 2000 },
      { label: 'Gate Opens', desc: 'Gate opens. Entry is logged with timestamp, visitor details, and gate number.', duration: 2000 },
      { label: 'Audit Trail', desc: 'Complete digital trail: entry time, exit time, duration, and approval method logged.', duration: 0 },
    ],
  },
]

export default function Simulation() {
  const [activeSim, setActiveSim] = useState(null)
  const [currentStep, setCurrentStep] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [stepProgress, setStepProgress] = useState(0)

  const sim = simulations.find(s => s.id === activeSim)

  useEffect(() => {
    if (!isRunning || !sim || currentStep < 0) return

    if (currentStep >= sim.steps.length - 1) {
      setIsRunning(false)
      return
    }

    const duration = sim.steps[currentStep].duration
    if (duration === 0) {
      setIsRunning(false)
      return
    }

    // Progress animation
    setStepProgress(0)
    const progressInterval = setInterval(() => {
      setStepProgress(prev => Math.min(prev + 2, 100))
    }, duration / 50)

    const timer = setTimeout(() => {
      clearInterval(progressInterval)
      setStepProgress(100)
      setCurrentStep(prev => prev + 1)
    }, duration)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [isRunning, currentStep, sim])

  const startSimulation = useCallback((simId) => {
    setActiveSim(simId)
    setCurrentStep(0)
    setIsRunning(true)
    setStepProgress(0)
  }, [])

  const resetSimulation = () => {
    setActiveSim(null)
    setCurrentStep(-1)
    setIsRunning(false)
    setStepProgress(0)
  }

  const qrValue = sim ? `SMARTTOLL-SIM|${sim.id}|STEP-${currentStep}|${Date.now()}` : 'SMARTTOLL'

  return (
    <div className="page-container">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>▶️ Live Simulation</h1>
        <p>Interactive step-by-step demonstration of how the SmartToll QR system works</p>
      </motion.div>

      {/* Simulation Selector */}
      {!activeSim && (
        <motion.div
          className="sim-selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="sim-selector-grid">
            {simulations.map((s, i) => (
              <motion.div
                key={s.id}
                className="sim-option-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6, boxShadow: `0 12px 40px ${s.color}20` }}
                onClick={() => startSimulation(s.id)}
              >
                <div className="sim-option-icon" style={{ background: `${s.color}15` }}>
                  <span>{s.icon}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <button className="btn btn-primary" style={{ width: '100%', marginTop: 12 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Start Simulation
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Active Simulation */}
      {activeSim && sim && (
        <motion.div
          className="sim-active"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Header */}
          <div className="sim-active-header">
            <div className="sim-active-title">
              <span style={{ fontSize: '1.5rem' }}>{sim.icon}</span>
              <div>
                <h2>{sim.title}</h2>
                <p>{isRunning ? 'Simulation in progress...' : currentStep >= sim.steps.length - 1 ? 'Simulation complete!' : 'Ready to start'}</p>
              </div>
            </div>
            <button className="btn btn-secondary" onClick={resetSimulation}>
              ← Back to Selection
            </button>
          </div>

          <div className="sim-content-grid">
            {/* Steps Timeline */}
            <div className="sim-timeline glass-card">
              <h3>Process Steps</h3>
              <div className="timeline-steps">
                {sim.steps.map((step, i) => {
                  const isActive = i === currentStep
                  const isComplete = i < currentStep
                  const isPending = i > currentStep

                  return (
                    <motion.div
                      key={i}
                      className={`timeline-step ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''} ${isPending ? 'pending' : ''}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="step-indicator">
                        {isComplete ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        ) : (
                          <span>{i + 1}</span>
                        )}
                      </div>
                      <div className="step-content">
                        <div className="step-title">{step.label}</div>
                        <div className="step-desc">{step.desc}</div>
                        {isActive && step.duration > 0 && (
                          <div className="step-progress-bar">
                            <div
                              className="step-progress-fill"
                              style={{
                                width: `${stepProgress}%`,
                                background: sim.color,
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                      {i < sim.steps.length - 1 && (
                        <div className={`step-line ${isComplete ? 'complete' : ''}`}></div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Visual Display */}
            <div className="sim-visual glass-card">
              <h3>Live Preview</h3>

              {/* QR Code Display */}
              <div className="sim-qr-section">
                <div className={`sim-qr-frame ${currentStep >= 2 && currentStep < 4 ? 'scanning' : ''} ${currentStep >= 3 ? 'verified' : ''}`}>
                  <QRCodeSVG
                    value={qrValue}
                    size={150}
                    bgColor="transparent"
                    fgColor={sim.color}
                    level="H"
                  />
                  {currentStep >= 2 && currentStep < 4 && isRunning && (
                    <div className="scan-line-active" style={{ background: `linear-gradient(90deg, transparent, ${sim.color}, transparent)` }}></div>
                  )}
                  {currentStep >= 3 && (
                    <motion.div
                      className="scan-check"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Toll Barrier Visual */}
              {activeSim === 'toll' && (
                <div className="sim-barrier-section">
                  <div className="sim-scene">
                    <div className="sim-road">
                      <div className="sim-lane-marking"></div>
                      <div className="sim-lane-marking"></div>
                      <div className="sim-lane-marking"></div>
                      <div className="sim-lane-marking"></div>
                    </div>
                    <div className="sim-toll-structure">
                      <div className="sim-toll-booth">
                        <div className="sim-booth-screen">QR</div>
                      </div>
                      <div className="sim-barrier-pole"></div>
                      <div className={`sim-barrier-arm ${currentStep >= 4 ? 'open' : ''}`}></div>
                    </div>
                    <div className={`sim-vehicle ${currentStep >= 0 ? 'approaching' : ''} ${currentStep >= 4 ? 'passing' : ''}`}>
                      🚗
                    </div>
                  </div>
                </div>
              )}

              {/* Parking Visual */}
              {activeSim === 'parking' && (
                <div className="sim-parking-visual">
                  <div className="sim-parking-grid">
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className={`sim-parking-spot ${i === 3 && currentStep >= 2 ? 'occupied' : ''} ${i === 3 && currentStep >= 4 ? 'exiting' : ''}`}>
                        {i === 3 && currentStep >= 2 && currentStep < 5 ? '🚗' : ''}
                        <span className="spot-label">{String.fromCharCode(65 + Math.floor(i / 4))}-{(i % 4) + 1}</span>
                      </div>
                    ))}
                  </div>
                  {currentStep >= 3 && currentStep < 5 && (
                    <div className="sim-timer-display">
                      <span>⏱️ Duration: 3h 30m</span>
                      <span style={{ color: sim.color }}>Fee: {formatCurrency(160)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Access Visual */}
              {activeSim === 'access' && (
                <div className="sim-access-visual">
                  <div className="sim-gate-scene">
                    <div className={`sim-gate-left ${currentStep >= 4 ? 'open' : ''}`}>
                      <div className="gate-bar"></div>
                      <div className="gate-bar"></div>
                      <div className="gate-bar"></div>
                    </div>
                    <div className={`sim-gate-right ${currentStep >= 4 ? 'open' : ''}`}>
                      <div className="gate-bar"></div>
                      <div className="gate-bar"></div>
                      <div className="gate-bar"></div>
                    </div>
                  </div>
                  {currentStep >= 3 && (
                    <motion.div
                      className="sim-notification"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <span>🔔</span> Resident notified: Delivery at Gate 1
                    </motion.div>
                  )}
                </div>
              )}

              {/* Status Display */}
              <div className="sim-status-bar">
                <div className="sim-status-left">
                  <div className={`sim-status-dot ${isRunning ? 'running' : currentStep >= sim.steps.length - 1 ? 'complete' : 'idle'}`}></div>
                  <span>
                    {isRunning ? 'Processing...' : currentStep >= sim.steps.length - 1 ? 'Complete' : 'Idle'}
                  </span>
                </div>
                <div className="sim-status-right">
                  Step {Math.min(currentStep + 1, sim.steps.length)} / {sim.steps.length}
                </div>
              </div>

              {/* Replay / Reset */}
              {currentStep >= sim.steps.length - 1 && !isRunning && (
                <motion.div
                  className="sim-complete-actions"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <button className="btn btn-primary" onClick={() => startSimulation(activeSim)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                    Replay
                  </button>
                  <button className="btn btn-secondary" onClick={resetSimulation}>
                    Try Another
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
