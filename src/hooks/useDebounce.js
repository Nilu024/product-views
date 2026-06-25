/**
 * useDebounce — delays updating the returned value until the user
 * stops changing the input for `delay` milliseconds.
 *
 * @param {*}      value  The value to debounce
 * @param {number} delay  Delay in ms (default 500)
 * @returns {*}           Debounced value
 */
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler); // cleanup on value / delay change
  }, [value, delay]);

  return debouncedValue;
}
