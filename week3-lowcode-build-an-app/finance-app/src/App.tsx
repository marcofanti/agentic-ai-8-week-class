// App entry — sets up routing with protected/public route guards
// AuthProvider wraps the whole app so all pages can access auth state
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/Dashboard';
import NotFoundPage from './pages/NotFoundPage';

function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes — redirect to dashboard if already signed in */}
      <Route path="/"               element={user ? <Navigate to="/dashboard" replace /> : <HomePage />} />
      <Route path="/login"          element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/signup"         element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} />
      <Route path="/reset-password" element={user ? <Navigate to="/dashboard" replace /> : <ResetPasswordPage />} />

      {/* Protected route — redirect to login if not signed in */}
      <Route path="/dashboard"      element={user ? <Dashboard /> : <Navigate to="/login" replace />} />

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
