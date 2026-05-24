import Button from './Button.jsx';

const statusStyles = {
  Pendiente: 'bg-amber-50 text-amber-700 ring-amber-100',
  'En Progreso': 'bg-blue-50 text-blue-700 ring-blue-100',
  Completada: 'bg-emerald-50 text-emerald-700 ring-emerald-100',
};

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`rounded-full px-3 py-1 text-xs font-black ring-1 ${statusStyles[task.estado]}`}>
            {task.estado}
          </span>
          <h3 className="mt-4 text-lg font-black text-slate-950">{task.titulo}</h3>
        </div>
        <select
          value={task.estado}
          onChange={(event) => onStatusChange(task.id, { estado: event.target.value })}
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 outline-none"
        >
          <option>Pendiente</option>
          <option>En Progreso</option>
          <option>Completada</option>
        </select>
      </div>

      <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">{task.descripcion || 'Sin descripción.'}</p>

      <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
        <span className="font-bold">Vence:</span> {task.fechaVencimiento || 'Sin fecha'}
      </div>

      <div className="mt-5 flex gap-2">
        <Button variant="secondary" onClick={() => onEdit(task)}>Editar</Button>
        <Button variant="danger" onClick={() => onDelete(task.id)}>Eliminar</Button>
      </div>
    </article>
  );
}
