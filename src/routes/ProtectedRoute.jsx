import { Navigate } from 'react-router-dom';
import { getSession } from '../utils/session.js';

export default function ProtectedRoute({ children }) {
  const session = getSession();
  if (!session?.username || !session?.department) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
