/**
 * useDarkMode.js
 * Reads system preference on first load, then persists user choice.
 */
import { useState, useEffect } from 'react';

const STORAGE_KEY = 'pe_theme';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === 'dark';
    } catch { /* ignore */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    try { localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light'); } catch { /* ignore */ }
  }, [isDark]);

  const toggle = () => setIsDark((d) => !d);

  return { isDark, toggle };
}
