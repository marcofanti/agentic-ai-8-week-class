// 404 Not Found page
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="error-page">
      <div className="error-code">404</div>
      <h2>Page not found</h2>
      <p>The page you're looking for doesn't exist or has been moved.</p>
      <button className="btn-primary btn-lg" onClick={() => navigate('/')}>
        Go back home
      </button>
    </div>
  );
}
