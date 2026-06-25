import React, { useCallback } from 'react';
import { getPaginationRange } from '../../utils/helpers';
import './Pagination.css';

/**
 * Pagination — Previous / Next buttons + page number pills with ellipsis.
 */
export const Pagination = React.memo(function Pagination({
  currentPage,
  totalPages,
  totalProducts,
  perPage,
  onPageChange,
}) {
  const range = getPaginationRange(currentPage, totalPages);

  const goTo = useCallback((page) => () => onPageChange(page), [onPageChange]);
  const goToPrev = useCallback(() => onPageChange(currentPage - 1), [onPageChange, currentPage]);
  const goToNext = useCallback(() => onPageChange(currentPage + 1), [onPageChange, currentPage]);

  const start = (currentPage - 1) * perPage + 1;
  const end   = Math.min(currentPage * perPage, totalProducts);

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <span className="pagination-info">
        {start}–{end} of {totalProducts}
      </span>

      <div className="pagination-controls">
        <button
          className="page-btn nav-btn"
          onClick={goToPrev}
          disabled={currentPage === 1}
          aria-label="Previous page"
          type="button"
        >
          ← Prev
        </button>

        {range.map((item, idx) =>
          item === '...' ? (
            <span key={`ellipsis-${idx}`} className="page-ellipsis">…</span>
          ) : (
            <button
              key={item}
              className={`page-btn num-btn${currentPage === item ? ' active' : ''}`}
              onClick={goTo(item)}
              aria-label={`Page ${item}`}
              aria-current={currentPage === item ? 'page' : undefined}
              type="button"
            >
              {item}
            </button>
          )
        )}

        <button
          className="page-btn nav-btn"
          onClick={goToNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          type="button"
        >
          Next →
        </button>
      </div>
    </nav>
  );
});
