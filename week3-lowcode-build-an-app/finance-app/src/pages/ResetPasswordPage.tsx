// Password reset page — stub UI for Auth0 integration
// When Auth0 is added: trigger auth0.resetPassword({ email }) here
import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

type Stage = 'form' | 'sent';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stage, setStage] = useState<Stage>('form');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) { setError('Please enter your email address'); return; }

    setIsLoading(true);
    try {
      // TODO: replace with Auth0 password reset trigger
      // e.g. await auth0.resetPassword({ connection: 'Username-Password-Authentication', email })
      await new Promise(resolve => setTimeout(resolve, 800)); // simulate async
      setStage('sent');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#236CFF"/>
              <path d="M8 16L14 22L24 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>FinanceApp</span>
          </Link>
          <h1>Reset your password</h1>
          <p>
            {stage === 'form'
              ? "Enter your email and we'll send you a reset link."
              : 'Check your inbox for the reset link.'}
          </p>
        </div>

        {stage === 'form' ? (
          <>
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {error && <div className="auth-error" role="alert">{error}</div>}

              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              <button type="submit" className="btn-primary btn-full" disabled={isLoading}>
                {isLoading ? <span className="btn-spinner"></span> : 'Send reset link'}
              </button>
            </form>

            <p className="auth-footer-text">
              Remember your password?{' '}
              <Link to="/login" className="auth-link">Sign in</Link>
            </p>
          </>
        ) : (
          <>
            <div className="auth-success" role="status">
              A reset link has been sent to <strong>{email}</strong>. Please check your inbox
              (and spam folder) and follow the instructions.
            </div>
            <p className="auth-footer-text">
              <Link to="/login" className="auth-link">Back to Sign in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
