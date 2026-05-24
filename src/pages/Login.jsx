import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { saveSession } from '../utils/session.js';

const departments = ['Desarrollo', 'Diseño', 'Marketing', 'Producto', 'Soporte'];

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('Desarrollo');

  function handleSubmit(event) {
    event.preventDefault();

    if (!username.trim()) {
      Swal.fire('Campo requerido', 'Ingresa tu nombre de usuario.', 'warning');
      return;
    }

    saveSession({ username: username.trim(), department });
    Swal.fire({
      title: 'Bienvenido',
      text: 'Sesión iniciada correctamente.',
      icon: 'success',
      timer: 1200,
      showConfirmButton: false,
    });
    navigate('/tablero', { replace: true });
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-4 py-10 text-slate-100">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[2rem] bg-white/10 shadow-2xl ring-1 ring-white/15 backdrop-blur md:grid-cols-2">
          <div className="hidden flex-col justify-between bg-indigo-600/30 p-10 md:flex">
            <div>
              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">Workspace App</span>
              <h1 className="mt-8 text-5xl font-black leading-tight">Gestiona tareas con claridad y velocidad.</h1>
              <p className="mt-5 max-w-md text-slate-200">Tablero productivo para equipos: crea, edita, filtra y completa tareas desde una SPA moderna en React.</p>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center text-sm">
              <div className="rounded-2xl bg-white/10 p-4">React</div>
              <div className="rounded-2xl bg-white/10 p-4">Vite</div>
              <div className="rounded-2xl bg-white/10 p-4">API REST</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-8 text-slate-900 md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600">Ingreso seguro</p>
            <h2 className="mt-3 text-3xl font-black">Iniciar sesión</h2>
            <p className="mt-2 text-slate-500">La sesión se guarda de forma simulada con LocalStorage.</p>

            <label className="mt-8 block text-sm font-bold text-slate-700" htmlFor="username">Nombre de usuario</label>
            <input
              id="username"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Ej: Camila Martínez"
            />

            <label className="mt-5 block text-sm font-bold text-slate-700" htmlFor="department">Departamento</label>
            <select
              id="department"
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              {departments.map((item) => <option key={item}>{item}</option>)}
            </select>

            <button className="mt-8 w-full rounded-2xl bg-indigo-600 px-5 py-3 font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700" type="submit">
              Entrar al tablero
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
