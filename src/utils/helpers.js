/**
 * helpers.js — Pure utility functions
 */

/**
 * Format a number as USD currency string.
 * @param {number} value
 * @returns {string}  e.g. "$12.99"
 */
export function formatPrice(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);
}

/**
 * Capitalise every word in a string.
 * @param {string} str
 * @returns {string}
 */
export function toTitleCase(str) {
  if (!str) return '';
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Generate an array of page numbers with ellipsis for large page counts.
 * Always shows first, last, and up to 2 neighbours of the current page.
 *
 * @param {number} current
 * @param {number} total
 * @returns {Array<number|'...'>}
 */
export function getPaginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [];
  const addPage = (n) => { if (!pages.includes(n)) pages.push(n); };
  const addEllipsis = () => pages.push('...');

  addPage(1);
  if (current > 3) addEllipsis();

  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    addPage(i);
  }

  if (current < total - 2) addEllipsis();
  addPage(total);

  return pages;
}
