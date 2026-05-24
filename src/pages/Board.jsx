import { useState } from 'react';
import Header from '../components/Header.jsx';
import Spinner from '../components/Spinner.jsx';
import StatsCard from '../components/StatsCard.jsx';
import TaskFilters from '../components/TaskFilters.jsx';
import TaskForm from '../components/TaskForm.jsx';
import TaskList from '../components/TaskList.jsx';
import Button from '../components/Button.jsx';
import { useTasks } from '../hooks/useTasks.js';
import { getSession } from '../utils/session.js';

export default function Board() {
  const session = getSession();
  const [selectedTask, setSelectedTask] = useState(null);
  const {
    filteredTasks,
    stats,
    filter,
    setFilter,
    loading,
    saving,
    error,
    loadTasks,
    addTask,
    editTask,
    removeTask,
  } = useTasks();

  async function handleSubmit(payload) {
    if (selectedTask) {
      await editTask(selectedTask.id, payload);
      setSelectedTask(null);
      return;
    }
    await addTask(payload);
  }

  async function handleStatusChange(id, payload) {
    await editTask(id, payload);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Header session={session} />

      <section className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="mb-8 rounded-[2rem] bg-gradient-to-r from-indigo-600 to-slate-900 p-6 text-white shadow-xl md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-100">Panel principal</p>
              <h2 className="mt-2 text-3xl font-black md:text-4xl">Hola, {session.username}</h2>
              <p className="mt-2 max-w-2xl text-indigo-100">Organiza el trabajo de tu equipo, cambia estados y mantén el tablero actualizado con una API REST.</p>
            </div>
            <Button variant="secondary" onClick={loadTasks}>Actualizar datos</Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard label="Total" value={stats.total} description="Tareas registradas" />
          <StatsCard label="Pendientes" value={stats.pending} description="Por iniciar" />
          <StatsCard label="En progreso" value={stats.progress} description="En ejecución" />
          <StatsCard label="Completadas" value={stats.done} description="Finalizadas" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[390px_1fr]">
          <TaskForm
            onSubmit={handleSubmit}
            selectedTask={selectedTask}
            onCancel={() => setSelectedTask(null)}
            saving={saving}
          />

          <section className="space-y-5">
            <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950">Tablero de tareas</h2>
                <p className="text-sm text-slate-500">Filtra en cliente por estado sin recargar la API.</p>
              </div>
              <TaskFilters activeFilter={filter} onChange={setFilter} />
            </div>

            {error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                {error}. Verifica que JSON Server esté activo con npm run api.
              </div>
            )}

            {loading ? (
              <Spinner />
            ) : (
              <TaskList
                tasks={filteredTasks}
                onEdit={setSelectedTask}
                onDelete={removeTask}
                onStatusChange={handleStatusChange}
              />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
