import React from 'react';
import './DarkModeToggle.css';

export const DarkModeToggle = React.memo(function DarkModeToggle({ isDark, onToggle }) {
  return (
    <button
      className={`dark-toggle${isDark ? ' dark' : ''}`}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      type="button"
    >
      <span className="dark-toggle-thumb" aria-hidden="true">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
});
