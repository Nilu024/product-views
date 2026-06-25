import React, { useCallback } from 'react';
import './SearchBar.css';

/**
 * SearchBar
 * Controlled input — parent stores value; debounce lives in useProducts hook.
 */
export const SearchBar = React.memo(function SearchBar({ value, onChange }) {
  const handleChange = useCallback(
    (e) => onChange(e.target.value),
    [onChange]
  );

  const handleClear = useCallback(() => onChange(''), [onChange]);

  return (
    <div className="searchbar-wrapper">
      <span className="searchbar-icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="6.5" stroke="currentColor" strokeWidth="1.75" />
          <path d="M14 14l3.5 3.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </span>
      <input
        type="search"
        className="searchbar-input"
        placeholder="Search products…"
        value={value}
        onChange={handleChange}
        aria-label="Search products"
        autoComplete="off"
        spellCheck={false}
      />
      {value && (
        <button
          className="searchbar-clear"
          onClick={handleClear}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
});
