import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { createTask, deleteTask, getTasks, updateTask } from '../services/taskService.js';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  async function loadTasks() {
    try {
      setLoading(true);
      setError('');
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function addTask(payload) {
    setSaving(true);
    try {
      const created = await createTask(payload);
      setTasks((current) => [created, ...current]);
      Swal.fire('Tarea creada', 'La tarea fue agregada correctamente.', 'success');
    } finally {
      setSaving(false);
    }
  }

  async function editTask(id, payload) {
    const updated = await updateTask(id, payload);
    setTasks((current) => current.map((task) => (task.id === id ? updated : task)));
    Swal.fire('Actualizada', 'La tarea fue actualizada correctamente.', 'success');
  }

  async function removeTask(id) {
    const result = await Swal.fire({
      title: '¿Eliminar tarea?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc2626',
    });

    if (!result.isConfirmed) return;

    await deleteTask(id);
    setTasks((current) => current.filter((task) => task.id !== id));
    Swal.fire('Eliminada', 'La tarea fue eliminada correctamente.', 'success');
  }

  const filteredTasks = useMemo(() => {
    if (filter === 'Todas') return tasks;
    return tasks.filter((task) => task.estado === filter);
  }, [tasks, filter]);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      pending: tasks.filter((task) => task.estado === 'Pendiente').length,
      progress: tasks.filter((task) => task.estado === 'En Progreso').length,
      done: tasks.filter((task) => task.estado === 'Completada').length,
    };
  }, [tasks]);

  return {
    tasks,
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
  };
}
