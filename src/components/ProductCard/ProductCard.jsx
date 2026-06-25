import React, { useState, useCallback } from 'react';
import { formatPrice, toTitleCase } from '../../utils/helpers';
import './ProductCard.css';

/**
 * ProductCard
 * Displays product image, name, category, price, star rating,
 * and a favourite toggle button.
 * Wrapped in React.memo to avoid re-renders when unrelated state changes.
 */
export const ProductCard = React.memo(function ProductCard({ product, isFavorite, onToggleFavorite }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleFavorite = useCallback(
    (e) => { e.stopPropagation(); onToggleFavorite(product.id); },
    [onToggleFavorite, product.id]
  );

  const handleImgError = useCallback(() => setImgError(true), []);
  const handleImgLoad  = useCallback(() => setImgLoaded(true), []);

  /* render star row */
  const renderStars = (rating) => {
    const full  = Math.floor(rating);
    const half  = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <span className="stars" aria-label={`Rating: ${rating} out of 5`}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
        {'☆'.repeat(empty)}
      </span>
    );
  };

  return (
    <article className={`product-card${isFavorite ? ' favorited' : ''}`}>
      {/* Image */}
      <div className="card-image-wrapper">
        {!imgLoaded && !imgError && <div className="card-img-placeholder" />}
        {!imgError ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className={`card-image${imgLoaded ? ' loaded' : ''}`}
            onError={handleImgError}
            onLoad={handleImgLoad}
            loading="lazy"
          />
        ) : (
          <div className="card-img-fallback" aria-hidden="true">📦</div>
        )}

        {/* Favourite button */}
        <button
          className={`fav-btn${isFavorite ? ' active' : ''}`}
          onClick={handleFavorite}
          aria-label={isFavorite ? `Remove ${product.title} from favourites` : `Add ${product.title} to favourites`}
          type="button"
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      </div>

      {/* Body */}
      <div className="card-body">
        <span className="card-category">{toTitleCase(product.category)}</span>
        <h3 className="card-title" title={product.title}>{product.title}</h3>

        <div className="card-meta">
          <div className="card-rating">
            {renderStars(product.rating)}
            <span className="rating-value">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="card-footer">
          <span className="card-price">{formatPrice(product.price)}</span>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="card-stock-warning">Only {product.stock} left</span>
          )}
          {product.stock === 0 && (
            <span className="card-out-of-stock">Out of stock</span>
          )}
        </div>
      </div>
    </article>
  );
});
