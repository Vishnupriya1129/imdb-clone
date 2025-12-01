import React, { useEffect, useState } from 'react';

const STORAGE_KEY = 'notes_app_items_v1';

export default function App() {
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error('Failed to persist notes', e);
    }
  }, [notes]);

  const addNote = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newNote = {
      id: crypto?.randomUUID?.() ?? Date.now().toString(),
      text: trimmed,
      createdAt: Date.now()
    };
    setNotes((prev) => [newNote, ...prev]);
    setText('');
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'enter') addNote();
    if (!e.ctrlKey && !e.metaKey && e.key === 'Enter') addNote();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Notes</h1>
        <p className="subtitle">Persistent notes saved in localStorage</p>
      </header>

      <main className="container">
        <div className="input-row">
          <textarea
            aria-label="Write note"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write your note here…"
            rows={4}
          />
          <button className="save" onClick={addNote} aria-label="Save note">Save</button>
        </div>

        <ul className="notes-list">
          {notes.length === 0 ? (
            <p className="empty">No notes yet. Write something and press Save.</p>
          ) : (
            notes.map((note) => (
              <li key={note.id} className="note">
                <div className="content">
                  <div className="text">{note.text}</div>
                  <div className="meta">{new Date(note.createdAt).toLocaleString()}</div>
                </div>
                <button className="delete" onClick={() => deleteNote(note.id)} aria-label="Delete note">✕</button>
              </li>
            ))
          )}
        </ul>
      </main>

      <footer className="footer">
        <span><strong>{notes.length}</strong> notes</span>
      </footer>
    </div>
  );
}