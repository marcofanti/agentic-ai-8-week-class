// Landing page — adapted from templates2/HomePage.tsx
// Rebranded from "SecureBank" to "FinanceApp"
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#236CFF"/>
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="logo-text">FinanceApp</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#about">About</a>
          </div>
          <div className="nav-actions">
            <button onClick={() => navigate('/signup')} className="btn-primary btn-lg">Get Started</button>
            <button onClick={() => navigate('/login')} className="btn-secondary btn-lg">Sign in</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Trusted by 2M+ customers
            </div>
            <h1 className="hero-title">
              Banking made <span className="text-blue">simple</span>,{' '}
              <span className="text-green">secure</span>, and{' '}
              <span className="text-gradient">smart</span>
            </h1>
            <p className="hero-description">
              Experience the future of personal finance. Manage all your accounts,
              track spending, and grow your wealth — all in one place.
            </p>
            <div className="hero-buttons">
              <button onClick={() => navigate('/signup')} className="btn-primary btn-lg">
                Open Free Account
              </button>
              <button className="btn-secondary btn-lg">
                <svg className="play-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                </svg>
                Watch Demo
              </button>
            </div>
          </div>

          <div className="hero-preview">
            <div className="preview-glow"></div>
            <div className="preview-card">
              <div className="preview-balance">
                <div className="balance-header">
                  <span className="balance-label">Total Balance</span>
                  <span className="balance-change">
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    +12.5%
                  </span>
                </div>
                <div className="balance-amount">$124,589.00</div>
                <div className="balance-accounts">
                  <div className="account-mini"><span className="account-mini-label">Checking</span><span className="account-mini-value">$45,230</span></div>
                  <div className="account-mini"><span className="account-mini-label">Savings</span><span className="account-mini-value">$67,890</span></div>
                  <div className="account-mini"><span className="account-mini-label">Investment</span><span className="account-mini-value">$11,469</span></div>
                </div>
              </div>
              <div className="preview-transactions">
                {[
                  { name: 'Apple Store', amount: '-$999.00', icon: 'A' },
                  { name: 'Salary Deposit', amount: '+$5,400.00', positive: true, icon: 'S' },
                  { name: 'Netflix', amount: '-$15.99', icon: 'N' },
                ].map((tx, i) => (
                  <div key={i} className="transaction-preview">
                    <div className="transaction-icon">{tx.icon}</div>
                    <span className="transaction-name">{tx.name}</span>
                    <span className={`transaction-amount ${tx.positive ? 'positive' : ''}`}>{tx.amount}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2>Everything you need to manage your money</h2>
            <p>Powerful features designed to help you take control of your finances</p>
          </div>
          <div className="features-grid">
            {[
              { icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', title: 'Smart Analytics', description: 'Get insights into your spending habits with AI-powered analytics and personalized recommendations.' },
              { icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', title: 'Bank-Grade Security', description: 'Your data is protected with 256-bit encryption and real-time fraud detection.' },
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Instant Transfers', description: 'Send money instantly to anyone, anywhere. No waiting, no hidden fees.' },
              { icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', title: 'Smart Savings', description: 'Automated savings rules that help you reach your financial goals faster.' },
              { icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z', title: 'Virtual Cards', description: 'Create unlimited virtual cards for secure online shopping with spending limits.' },
              { icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01', title: 'Bill Management', description: 'Never miss a payment. Track and pay all your bills from one place.' },
            ].map((feature, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="security-section">
        <div className="section-container">
          <div className="security-content">
            <div className="security-text">
              <h2>Security you can trust</h2>
              <p>We use industry-leading security measures to keep your money and data safe.</p>
              <div className="security-list">
                {['256-bit AES encryption for all data', 'Two-factor authentication (2FA)', 'Biometric login support', 'Real-time fraud monitoring', 'FDIC insured up to $250,000'].map((item, i) => (
                  <div key={i} className="security-item">
                    <div className="check-icon">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="security-visual">
              <div className="shield-glow"></div>
              <div className="shield-outer"><div className="shield-middle"><div className="shield-inner">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                </svg>
              </div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="section-container">
          <h2>Ready to take control of your finances?</h2>
          <p>Join over 2 million customers who trust FinanceApp with their money.</p>
          <button onClick={() => navigate('/signup')} className="btn-primary btn-lg">
            Get Started — It's Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#236CFF"/>
                  <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="logo-text">FinanceApp</span>
              </div>
              <p>Modern banking for the digital age.</p>
            </div>
            <div className="footer-links"><h4>Product</h4><ul><li><a href="#">Features</a></li><li><a href="#">Pricing</a></li><li><a href="#">Security</a></li></ul></div>
            <div className="footer-links"><h4>Company</h4><ul><li><a href="#">About</a></li><li><a href="#">Careers</a></li><li><a href="#">Contact</a></li></ul></div>
            <div className="footer-links"><h4>Legal</h4><ul><li><a href="#">Privacy Policy</a></li><li><a href="#">Terms of Service</a></li></ul></div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} FinanceApp. All rights reserved.</p>
            <div className="footer-badges"><span>Member FDIC</span><span>Equal Housing Lender</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
