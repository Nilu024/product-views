import React, { useCallback } from 'react';
import { toTitleCase } from '../../utils/helpers';
import './CategoryFilter.css';

/**
 * Horizontal scrollable pill-based category selector.
 * Categories are derived dynamically from the API response.
 */
export const CategoryFilter = React.memo(function CategoryFilter({
  categories,
  selected,
  onChange,
}) {
  const handleClick = useCallback((cat) => () => onChange(cat), [onChange]);

  return (
    <nav className="category-filter" aria-label="Filter by category">
      <ul className="category-list" role="list">
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`category-pill${selected === cat ? ' active' : ''}`}
              onClick={handleClick(cat)}
              aria-pressed={selected === cat}
              type="button"
            >
              {toTitleCase(cat)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
});
