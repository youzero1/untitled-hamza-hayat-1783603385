import type { Todo, Filter } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

type Props = {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  filter: Filter;
  totalCount: number;
};

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  filter,
  totalCount,
}: Props) {
  if (todos.length === 0) {
    const message =
      totalCount === 0
        ? 'No tasks yet — add one above to get started.'
        : filter === 'active'
          ? 'Nothing active. Take a breath.'
          : filter === 'completed'
            ? 'Nothing completed yet.'
            : 'No tasks to show.';

    return (
      <div className="px-6 py-16 text-center text-slate-400">
        <div className="mx-auto w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 text-slate-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-sm">{message}</p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-slate-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
