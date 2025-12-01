import React from 'react';

export default function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <label className="checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          aria-checked={task.completed}
        />
        <span className="checkmark" />
      </label>

      <div className="content">
        <div className="text">{task.text}</div>
        <div className="meta">{new Date(task.createdAt).toLocaleString()}</div>
      </div>

      <button className="delete" onClick={() => onDelete(task.id)} aria-label="Delete task">✕</button>
    </div>
  );
}