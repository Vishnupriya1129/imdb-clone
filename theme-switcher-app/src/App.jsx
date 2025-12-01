import React from 'react';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';

export default function App() {
  const { theme } = useTheme();

  return (
    <div className="app">
      <h1>Theme Switcher App</h1>
      <p>Current theme: {theme}</p>
      <ThemeToggle />
    </div>
  );
}