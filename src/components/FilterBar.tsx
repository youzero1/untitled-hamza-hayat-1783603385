import type { Filter } from '@/types/todo';

type Props = {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-slate-50/60 border-b border-slate-100 text-sm">
      <span className="text-slate-500">
        {activeCount} left
      </span>

      <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-slate-200">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`px-3 py-1 rounded-md font-medium transition ${
              filter === f.value
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 ? (
        <button
          onClick={onClearCompleted}
          className="text-slate-500 hover:text-rose-600 font-medium transition"
        >
          Clear completed
        </button>
      ) : (
        <span className="w-[110px]" aria-hidden />
      )}
    </div>
  );
}
