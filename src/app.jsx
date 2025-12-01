import React, { useEffect, useMemo, useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

const STORAGE_KEY = 'persistent_todo_app_tasks_v1';

export default function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [filter, setFilter] = useState('all'); // all | pending | completed

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error('Failed to save tasks', e);
    }
  }, [tasks]);

  const addTask = (text) => {
    const trimmed = text?.trim();
    if (!trimmed) return;
    const newTask = {
      id: crypto?.randomUUID?.() ?? Date.now().toString(),
      text: trimmed,
      completed: false,
      createdAt: Date.now()
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  const filtered = useMemo(() => {
    return tasks.filter((t) =>
      filter === 'all' ? true : filter === 'completed' ? t.completed : !t.completed
    );
  }, [tasks, filter]);

  return (
    <div className="app">
      <header className="header">
        <h1>To‑Do</h1>
        <p className="subtitle">Persistent tasks saved in localStorage</p>
      </header>

      <main className="container">
        <TodoInput onAdd={addTask} />

        <div className="filter-bar">
          <div className="filters">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
              All
            </button>
            <button
              className={filter === 'pending' ? 'active' : ''}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={filter === 'completed' ? 'active' : ''}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          <div className="actions">
            <button onClick={clearCompleted}>Clear completed</button>
          </div>
        </div>

        <TodoList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
      </main>

      <footer className="footer">
        <span>
          <strong>{tasks.length}</strong> total
        </span>
        <span>
          <strong>{tasks.filter((t) => t.completed).length}</strong> completed
        </span>
      </footer>
    </div>
  );
}