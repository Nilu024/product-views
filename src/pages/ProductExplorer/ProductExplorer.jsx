import React, { useCallback } from 'react';
import { useProducts }      from '../../hooks/useProducts';
import { useFavorites }     from '../../hooks/useFavorites';
import { useDarkMode }      from '../../hooks/useDarkMode';

import { SearchBar }        from '../../components/SearchBar/SearchBar';
import { CategoryFilter }   from '../../components/CategoryFilter/CategoryFilter';
import { SortDropdown }     from '../../components/SortDropdown/SortDropdown';
import { ProductCard }      from '../../components/ProductCard/ProductCard';
import { Pagination }       from '../../components/Pagination/Pagination';
import { Loader }           from '../../components/Loader/Loader';
import { ErrorMessage }     from '../../components/ErrorMessage/ErrorMessage';
import { EmptyState }       from '../../components/EmptyState/EmptyState';
import { DarkModeToggle }   from '../../components/DarkModeToggle/DarkModeToggle';

import './ProductExplorer.css';

export default function ProductExplorer() {
  const { isDark, toggle: toggleDark } = useDarkMode();
  const { toggleFavorite, isFavorite } = useFavorites();

  const {
    paginatedProducts,
    totalProducts,
    totalPages,
    currentPage,
    categories,
    loading,
    error,
    searchQuery,
    selectedCategory,
    sortOption,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
    PRODUCTS_PER_PAGE,
  } = useProducts();

  /* Stable toggle-favorite callback passed to every card */
  const handleToggleFavorite = useCallback(
    (id) => toggleFavorite(id),
    [toggleFavorite]
  );

  /* Allow retrying after an error by reloading the page */
  const handleRetry = useCallback(() => window.location.reload(), []);

  return (
    <div className="explorer-root">
      {/* ====== Header ====== */}
      <header className="explorer-header">
        <div className="explorer-header-inner">
          <div className="explorer-brand">
            <span className="brand-icon" aria-hidden="true">🛍</span>
            <div>
              <h1 className="brand-title">Product Explorer</h1>
              <p className="brand-sub">Discover · Filter · Compare</p>
            </div>
          </div>
          <DarkModeToggle isDark={isDark} onToggle={toggleDark} />
        </div>
      </header>

      {/* ====== Main ====== */}
      <main className="explorer-main">
        {/* ---- Controls bar ---- */}
        <section className="controls-bar" aria-label="Search and filter controls">
          <div className="controls-top">
            <SearchBar value={searchQuery} onChange={handleSearchChange} />
            <SortDropdown value={sortOption} onChange={handleSortChange} />
          </div>

          {!loading && !error && (
            <CategoryFilter
              categories={categories}
              selected={selectedCategory}
              onChange={handleCategoryChange}
            />
          )}
        </section>

        {/* ---- Results summary ---- */}
        {!loading && !error && (
          <div className="results-summary" aria-live="polite" aria-atomic="true">
            {totalProducts > 0
              ? `${totalProducts} product${totalProducts !== 1 ? 's' : ''} found`
              : null}
          </div>
        )}

        {/* ---- Content area ---- */}
        {loading && <Loader />}

        {!loading && error && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {!loading && !error && paginatedProducts.length === 0 && (
          <EmptyState query={searchQuery} category={selectedCategory} />
        )}

        {!loading && !error && paginatedProducts.length > 0 && (
          <>
            <section className="products-grid" aria-label="Products">
              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={isFavorite(product.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </section>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalProducts={totalProducts}
              perPage={PRODUCTS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </main>

      {/* ====== Footer ====== */}
      <footer className="explorer-footer">
        <p>Data from <a href="https://dummyjson.com" target="_blank" rel="noreferrer">DummyJSON</a></p>
      </footer>
    </div>
  );
}
