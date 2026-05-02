import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Home.css'

const features = [
  {
    icon: '🛣️',
    title: 'Toll Management',
    desc: 'Generate QR-equipped digital payment receipts for seamless, contactless toll transactions. Eliminate queues and reduce processing time.',
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
  },
  {
    icon: '🅿️',
    title: 'Parking Solutions',
    desc: 'Automated QR-based parking management with real-time occupancy tracking, fee calculation, and barrier control.',
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
  },
  {
    icon: '🏘️',
    title: 'Access Control',
    desc: 'Time-bound QR passes for gated communities. Track entries, exits, and manage visitor approvals digitally.',
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    desc: 'Real-time insights into transactions, revenue, and system performance with comprehensive reporting.',
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
  },
]

const stats = [
  { value: '15,847', label: 'Total Transactions', suffix: '+' },
  { value: '99.97', label: 'System Uptime', suffix: '%' },
  { value: '1.2', label: 'Avg Processing', suffix: 's' },
  { value: '12,450', label: 'Active Users', suffix: '+' },
]

const steps = [
  {
    num: '01',
    title: 'Register & Add Vehicle',
    desc: 'Create your account and register your vehicles with license plate details.',
    icon: '👤',
  },
  {
    num: '02',
    title: 'Generate QR Receipt',
    desc: 'Select your route or destination and generate a unique QR-coded payment receipt.',
    icon: '📱',
  },
  {
    num: '03',
    title: 'Scan at Entry Point',
    desc: 'Present the QR code at the toll plaza, parking gate, or community entrance scanner.',
    icon: '📷',
  },
  {
    num: '04',
    title: 'Seamless Access',
    desc: 'The barrier opens automatically. Payment is processed digitally — no cash, no queues.',
    icon: '✅',
  },
]

export default function Home() {
  const navigate = useNavigate()
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="home">
      {/* Animated Background */}
      <div className="home-bg">
        <div className="bg-grid"></div>
        <div className="bg-glow bg-glow-1" style={{ transform: `translate(${scrollY * 0.05}px, ${scrollY * -0.02}px)` }}></div>
        <div className="bg-glow bg-glow-2" style={{ transform: `translate(${scrollY * -0.03}px, ${scrollY * 0.04}px)` }}></div>
        <div className="bg-glow bg-glow-3"></div>
      </div>

      {/* Navigation */}
      <nav className="home-nav">
        <div className="home-nav-inner">
          <div className="home-logo">
            <div className="home-logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="4" fill="url(#homeLogoGrad)" />
                <path d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" fill="white" fillOpacity="0.9" />
                <defs>
                  <linearGradient id="homeLogoGrad" x1="2" y1="2" x2="22" y2="22">
                    <stop stopColor="#06b6d4" />
                    <stop offset="1" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="home-logo-text">SmartToll QR</span>
          </div>
          <div className="home-nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#stats">Impact</a>
            <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
              Launch App
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>Next-Gen QR Access & Payment Platform</span>
          </div>

          <h1 className="hero-title">
            Smart <span className="gradient-text">QR-Based</span> Access &<br />
            Payment Management
          </h1>

          <p className="hero-subtitle">
            A unified, software-driven solution leveraging QR code technology for seamless,
            contactless, and automated access control and payment processing across toll plazas,
            parking facilities, and gated communities.
          </p>

          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/dashboard')}>
              Explore Dashboard
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/simulation')}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch Simulation
            </button>
          </div>

          {/* Hero Visual */}
          <div className="hero-visual">
            <div className="hero-card hero-card-toll">
              <div className="hero-card-icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>🛣️</div>
              <div>
                <div className="hero-card-label">Toll Payment</div>
                <div className="hero-card-value" style={{ color: '#06b6d4' }}>₹155.00</div>
              </div>
              <div className="hero-card-status badge-success badge">PAID</div>
            </div>
            <div className="hero-qr-container">
              <div className="hero-qr-frame">
                <div className="qr-placeholder">
                  <svg viewBox="0 0 100 100" width="120" height="120">
                    <rect x="5" y="5" width="25" height="25" rx="3" fill="#06b6d4" />
                    <rect x="70" y="5" width="25" height="25" rx="3" fill="#06b6d4" />
                    <rect x="5" y="70" width="25" height="25" rx="3" fill="#06b6d4" />
                    <rect x="10" y="10" width="15" height="15" rx="2" fill="#0c1120" />
                    <rect x="75" y="10" width="15" height="15" rx="2" fill="#0c1120" />
                    <rect x="10" y="75" width="15" height="15" rx="2" fill="#0c1120" />
                    <rect x="13" y="13" width="9" height="9" rx="1" fill="#06b6d4" />
                    <rect x="78" y="13" width="9" height="9" rx="1" fill="#06b6d4" />
                    <rect x="13" y="78" width="9" height="9" rx="1" fill="#06b6d4" />
                    <rect x="35" y="5" width="5" height="5" fill="#8b5cf6" />
                    <rect x="45" y="5" width="5" height="5" fill="#8b5cf6" />
                    <rect x="55" y="5" width="5" height="5" fill="#8b5cf6" />
                    <rect x="35" y="15" width="5" height="5" fill="#8b5cf6" />
                    <rect x="45" y="15" width="15" height="5" fill="#8b5cf6" />
                    <rect x="35" y="25" width="5" height="5" fill="#8b5cf6" />
                    <rect x="50" y="25" width="5" height="5" fill="#8b5cf6" />
                    <rect x="35" y="35" width="5" height="5" fill="#06b6d4" />
                    <rect x="45" y="35" width="5" height="5" fill="#06b6d4" />
                    <rect x="55" y="35" width="5" height="5" fill="#06b6d4" />
                    <rect x="65" y="35" width="5" height="5" fill="#06b6d4" />
                    <rect x="5" y="35" width="5" height="5" fill="#06b6d4" />
                    <rect x="15" y="35" width="5" height="5" fill="#06b6d4" />
                    <rect x="25" y="35" width="5" height="5" fill="#06b6d4" />
                    <rect x="5" y="45" width="5" height="5" fill="#8b5cf6" />
                    <rect x="15" y="45" width="5" height="5" fill="#8b5cf6" />
                    <rect x="35" y="45" width="5" height="5" fill="#8b5cf6" />
                    <rect x="55" y="45" width="5" height="5" fill="#8b5cf6" />
                    <rect x="75" y="45" width="5" height="5" fill="#8b5cf6" />
                    <rect x="85" y="45" width="10" height="5" fill="#8b5cf6" />
                    <rect x="5" y="55" width="5" height="5" fill="#06b6d4" />
                    <rect x="25" y="55" width="5" height="5" fill="#06b6d4" />
                    <rect x="45" y="55" width="5" height="5" fill="#06b6d4" />
                    <rect x="55" y="55" width="5" height="10" fill="#06b6d4" />
                    <rect x="65" y="55" width="5" height="5" fill="#06b6d4" />
                    <rect x="75" y="55" width="5" height="5" fill="#06b6d4" />
                    <rect x="85" y="55" width="10" height="5" fill="#06b6d4" />
                    <rect x="35" y="65" width="5" height="5" fill="#8b5cf6" />
                    <rect x="45" y="65" width="5" height="5" fill="#8b5cf6" />
                    <rect x="65" y="65" width="5" height="5" fill="#8b5cf6" />
                    <rect x="85" y="65" width="10" height="5" fill="#8b5cf6" />
                    <rect x="35" y="75" width="5" height="5" fill="#06b6d4" />
                    <rect x="55" y="75" width="5" height="5" fill="#06b6d4" />
                    <rect x="65" y="75" width="5" height="5" fill="#06b6d4" />
                    <rect x="75" y="75" width="5" height="5" fill="#06b6d4" />
                    <rect x="85" y="75" width="10" height="5" fill="#06b6d4" />
                    <rect x="35" y="85" width="5" height="10" fill="#8b5cf6" />
                    <rect x="45" y="85" width="5" height="10" fill="#8b5cf6" />
                    <rect x="55" y="85" width="5" height="10" fill="#8b5cf6" />
                    <rect x="70" y="70" width="25" height="25" rx="3" fill="none" stroke="#06b6d4" strokeWidth="2" />
                    <rect x="78" y="78" width="9" height="9" rx="1" fill="#8b5cf6" />
                  </svg>
                </div>
                <div className="scan-line"></div>
              </div>
              <p className="hero-qr-label">Scan to Pay & Access</p>
            </div>
            <div className="hero-card hero-card-access">
              <div className="hero-card-icon" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>🏘️</div>
              <div>
                <div className="hero-card-label">Gate Access</div>
                <div className="hero-card-value" style={{ color: '#10b981' }}>Verified</div>
              </div>
              <div className="hero-card-status badge-success badge">OPEN</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" id="stats">
        <div className="stats-container">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="stat-value">{stat.value}<span className="stat-suffix">{stat.suffix}</span></div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Core Modules</span>
            <h2 className="section-title">
              One Platform, <span className="gradient-text">Three Solutions</span>
            </h2>
            <p className="section-desc">
              A comprehensive ecosystem designed to modernize access and payment workflows
              across multiple real-world use cases.
            </p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="feature-card glass-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon-wrap" style={{ background: `${feature.color}15` }}>
                  <span className="feature-emoji">{feature.icon}</span>
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
                <div className="feature-link" style={{ color: feature.color }}>
                  Learn more →
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-section" id="how-it-works">
        <div className="section-container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="section-tag">Process Flow</span>
            <h2 className="section-title">
              How <span className="gradient-text-secondary">SmartToll QR</span> Works
            </h2>
            <p className="section-desc">
              From registration to seamless access — a four-step process that eliminates
              queues and manual intervention.
            </p>
          </motion.div>

          <div className="steps-grid">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="step-card"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="step-number">{step.num}</div>
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
                {i < steps.length - 1 && <div className="step-connector"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2>Ready to Experience <span className="gradient-text">Smart Access?</span></h2>
            <p>Explore the live simulation to see the complete toll, parking, and access control workflow in action.</p>
            <div className="cta-actions">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/simulation')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Launch Simulation
              </button>
              <button className="btn btn-secondary btn-lg" onClick={() => navigate('/dashboard')}>
                View Dashboard
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="home-logo-text">SmartToll QR</span>
            <p>Modernizing access & payment workflows with QR technology.</p>
          </div>
          <div className="footer-links">
            <div>
              <h4>Modules</h4>
              <a onClick={() => navigate('/toll')}>Toll Management</a>
              <a onClick={() => navigate('/parking')}>Parking Solutions</a>
              <a onClick={() => navigate('/access')}>Access Control</a>
            </div>
            <div>
              <h4>Platform</h4>
              <a onClick={() => navigate('/dashboard')}>Dashboard</a>
              <a onClick={() => navigate('/simulation')}>Simulation</a>
              <a onClick={() => navigate('/history')}>Payment History</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 SmartToll QR — Smart QR-Based Access & Payment Management System</p>
        </div>
      </footer>
    </div>
  )
}
