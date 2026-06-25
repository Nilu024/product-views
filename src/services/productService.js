/**
 * productService.js
 * Centralised API layer for DummyJSON products endpoint.
 * All network concerns are isolated here so components stay pure.
 */

const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch ALL products (up to 194 items) in a single request.
 * DummyJSON caps at 100 by default; we request 200 to get everything.
 * @returns {Promise<{ products: Product[], total: number }>}
 */
export async function fetchAllProducts() {
  const response = await fetch(`${BASE_URL}/products?limit=200&select=id,title,category,price,rating,thumbnail,stock,brand,description`);

  if (!response.ok) {
    const msg = `API error ${response.status}: ${response.statusText}`;
    throw new Error(msg);
  }

  const data = await response.json();
  return data; // { products: [...], total, skip, limit }
}

/**
 * Search products by name via DummyJSON's dedicated search endpoint.
 * Used when we want server-side search (optional — we also do client-side).
 * @param {string} query
 * @returns {Promise<{ products: Product[], total: number }>}
 */
export async function searchProducts(query) {
  if (!query || !query.trim()) return fetchAllProducts();

  const response = await fetch(
    `${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=200`
  );

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
