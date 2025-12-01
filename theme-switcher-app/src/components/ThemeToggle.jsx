import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="toggle-btn">
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}