import React from 'react';
import './Loader.css';

/**
 * Full-page loading indicator with animated shimmer grid.
 */
export const Loader = React.memo(function Loader() {
  return (
    <div className="loader-container" role="status" aria-label="Loading products">
      <div className="loader-grid">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton-image" />
            <div className="skeleton-body">
              <div className="skeleton skeleton-tag" />
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-title short" />
              <div className="skeleton-footer">
                <div className="skeleton skeleton-price" />
                <div className="skeleton skeleton-rating" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
