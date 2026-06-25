import React from 'react';
import './ErrorMessage.css';

export const ErrorMessage = React.memo(function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-wrapper" role="alert">
      <div className="error-icon" aria-hidden="true">⚠</div>
      <h2 className="error-title">Something went wrong</h2>
      <p className="error-body">{message || 'Unable to load products. Please try again.'}</p>
      {onRetry && (
        <button className="error-retry-btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
});
