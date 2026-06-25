import React, { useCallback } from 'react';
import { SORT_OPTIONS } from '../../hooks/useProducts';
import './SortDropdown.css';

export const SortDropdown = React.memo(function SortDropdown({ value, onChange }) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);

  return (
    <div className="sort-wrapper">
      <label htmlFor="sort-select" className="sort-label">Sort by</label>
      <div className="sort-select-wrapper">
        <select
          id="sort-select"
          className="sort-select"
          value={value}
          onChange={handleChange}
          aria-label="Sort products"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="sort-chevron" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
});
