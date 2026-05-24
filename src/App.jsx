import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Board from './pages/Board.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tablero" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/tablero"
        element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/tablero" replace />} />
    </Routes>
  );
}
