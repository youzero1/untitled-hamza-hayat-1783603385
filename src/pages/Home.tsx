import { useEffect, useMemo, useState } from 'react';
import type { Todo, Filter } from '@/types/todo';
import TodoInput from '@/components/TodoInput';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';

const STORAGE_KEY = 'todos.v1';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (t: any) =>
        typeof t?.id === 'string' &&
        typeof t?.text === 'string' &&
        typeof t?.completed === 'boolean',
    );
  } catch {
    return [];
  }
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>(() => loadTodos());
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const todo: Todo = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [todo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Tasks
          </h1>
          <p className="mt-2 text-slate-500">
            {activeCount === 0 && todos.length === 0
              ? 'A calm place to keep your day in order.'
              : activeCount === 0
                ? 'All done — nice work.'
                : `${activeCount} task${activeCount === 1 ? '' : 's'} to go.`}
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-xl shadow-indigo-100/50 border border-slate-100 overflow-hidden">
          <TodoInput onAdd={addTodo} />

          <FilterBar
            filter={filter}
            onFilterChange={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />

          <TodoList
            todos={filtered}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            filter={filter}
            totalCount={todos.length}
          />
        </div>

        <footer className="mt-6 text-center text-xs text-slate-400">
          Your tasks are saved on this device.
        </footer>
      </div>
    </div>
  );
}
