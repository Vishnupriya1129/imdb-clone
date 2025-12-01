import React, { useState } from 'react';

export default function TodoInput({ onAdd }) {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setValue('');
  };

  return (
    <form className="todo-input" onSubmit={submit}>
      <input
        aria-label="Add todo"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a new task and press Enter"
        autoFocus
      />
      <button type="submit" aria-label="Add task">Add</button>
    </form>
  );
}