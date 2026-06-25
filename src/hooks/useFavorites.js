/**
 * useFavorites.js
 * Manages a Set of favourite product IDs, persisted to localStorage.
 */
import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pe_favorites';

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveToStorage(set) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // storage unavailable — silently continue
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFromStorage);

  const toggleFavorite = useCallback((id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      saveToStorage(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id) => favorites.has(id), [favorites]);

  return { favorites, toggleFavorite, isFavorite };
}
