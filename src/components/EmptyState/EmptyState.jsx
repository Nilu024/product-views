import React from 'react';
import './EmptyState.css';

export const EmptyState = React.memo(function EmptyState({ query, category }) {
  const context = query
    ? `"${query}"`
    : category && category !== 'All'
    ? `in ${category}`
    : null;

  return (
    <div className="empty-wrapper" role="status">
      <div className="empty-icon" aria-hidden="true">🔍</div>
      <h2 className="empty-title">No Products Found</h2>
      <p className="empty-body">
        {context
          ? `We couldn't find any products matching ${context}.`
          : "No products match the current filters."}
        <br />
        Try adjusting your search or clearing the filters.
      </p>
    </div>
  );
});
