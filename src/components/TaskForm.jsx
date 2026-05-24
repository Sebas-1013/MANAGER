import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Button from './Button.jsx';

const initialState = {
  titulo: '',
  descripcion: '',
  fechaVencimiento: '',
  estado: 'Pendiente',
};

export default function TaskForm({ onSubmit, selectedTask, onCancel, saving }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (selectedTask) {
      setForm({
        titulo: selectedTask.titulo,
        descripcion: selectedTask.descripcion,
        fechaVencimiento: selectedTask.fechaVencimiento,
        estado: selectedTask.estado,
      });
    } else {
      setForm(initialState);
    }
  }, [selectedTask]);

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.titulo.trim()) {
      Swal.fire('Título requerido', 'La tarea debe tener un título.', 'warning');
      return;
    }

    await onSubmit({ ...form, titulo: form.titulo.trim() });
    if (!selectedTask) setForm(initialState);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-black text-slate-950">{selectedTask ? 'Editar tarea' : 'Nueva tarea'}</h2>
        <p className="text-sm text-slate-500">Completa la información mínima solicitada por la prueba.</p>
      </div>

      <div className="grid gap-4">
        <div>
          <label className="text-sm font-bold text-slate-700">Título</label>
          <input
            value={form.titulo}
            onChange={(event) => updateField('titulo', event.target.value)}
            className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="Ej: Revisar diseño del dashboard"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-slate-700">Descripción</label>
          <textarea
            value={form.descripcion}
            onChange={(event) => updateField('descripcion', event.target.value)}
            rows="4"
            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            placeholder="Describe el pendiente..."
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-bold text-slate-700">Fecha vencimiento</label>
            <input
              type="date"
              value={form.fechaVencimiento}
              onChange={(event) => updateField('fechaVencimiento', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label className="text-sm font-bold text-slate-700">Estado</label>
            <select
              value={form.estado}
              onChange={(event) => updateField('estado', event.target.value)}
              className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            >
              <option>Pendiente</option>
              <option>En Progreso</option>
              <option>Completada</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <Button type="submit" disabled={saving}>{saving ? 'Guardando...' : selectedTask ? 'Guardar cambios' : 'Crear tarea'}</Button>
        {selectedTask && <Button type="button" variant="secondary" onClick={onCancel}>Cancelar</Button>}
      </div>
    </form>
  );
}
