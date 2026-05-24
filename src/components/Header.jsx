import { useNavigate } from 'react-router-dom';
import { clearSession } from '../utils/session.js';
import Button from './Button.jsx';

export default function Header({ session }) {
  const navigate = useNavigate();

  function handleLogout() {
    clearSession();
    navigate('/login', { replace: true });
  }

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">Workspace</p>
          <h1 className="text-2xl font-black text-slate-950">Gestor de tareas</h1>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-700">
            <strong>{session.username}</strong> · {session.department}
          </div>
          <Button variant="secondary" onClick={handleLogout}>Cerrar sesión</Button>
        </div>
      </div>
    </header>
  );
}
