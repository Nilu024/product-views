/**
 * useProducts.js
 * Master data hook — owns fetch, filter, sort, paginate logic.
 * Components consume this; they never touch the service layer directly.
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchAllProducts } from '../services/productService';
import { useDebounce } from './useDebounce';

const PRODUCTS_PER_PAGE = 10;

export const SORT_OPTIONS = [
  { value: 'default',        label: 'Default' },
  { value: 'price_asc',      label: 'Price: Low → High' },
  { value: 'price_desc',     label: 'Price: High → Low' },
  { value: 'rating_desc',    label: 'Rating: High → Low' },
];

export function useProducts() {
  /* ---- raw state ---- */
  const [allProducts, setAllProducts]   = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  /* ---- filter / sort / pagination state ---- */
  const [searchQuery, setSearchQuery]       = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption]         = useState('default');
  const [currentPage, setCurrentPage]       = useState(1);

  /* ---- debounced search (500 ms) ---- */
  const debouncedSearch = useDebounce(searchQuery, 500);

  /* ---- fetch once on mount ---- */
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchAllProducts()
      .then(({ products }) => {
        if (!cancelled) {
          setAllProducts(products);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message || 'Unable to load products. Please try again.');
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  /* ---- derive unique categories ---- */
  const categories = useMemo(() => {
    const cats = [...new Set(allProducts.map((p) => p.category))].sort();
    return ['All', ...cats];
  }, [allProducts]);

  /* ---- filtered + sorted products ---- */
  const processedProducts = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search filter (case-insensitive, debounced)
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.trim().toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    // Sorting
    switch (sortOption) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating_desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break; // keep API order
    }

    return result;
  }, [allProducts, selectedCategory, debouncedSearch, sortOption]);

  /* ---- pagination ---- */
  const totalPages = Math.max(1, Math.ceil(processedProducts.length / PRODUCTS_PER_PAGE));

  // Reset to page 1 whenever filters / search change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedCategory, sortOption]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return processedProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [processedProducts, currentPage]);

  /* ---- stable callbacks ---- */
  const handleSearchChange   = useCallback((val) => setSearchQuery(val), []);
  const handleCategoryChange = useCallback((cat) => setSelectedCategory(cat), []);
  const handleSortChange     = useCallback((opt) => setSortOption(opt), []);
  const handlePageChange     = useCallback((page) => setCurrentPage(page), []);

  return {
    /* data */
    paginatedProducts,
    totalProducts: processedProducts.length,
    totalPages,
    currentPage,
    categories,
    loading,
    error,
    /* filter state */
    searchQuery,
    selectedCategory,
    sortOption,
    /* handlers */
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
    /* constants */
    PRODUCTS_PER_PAGE,
  };
}
