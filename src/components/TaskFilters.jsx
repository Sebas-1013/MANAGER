const filters = ['Todas', 'Pendiente', 'En Progreso', 'Completada'];

export default function TaskFilters({ activeFilter, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            activeFilter === filter
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
              : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
